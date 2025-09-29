"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Types for forecast system
interface ExternalSignal {
  id: string;
  type: 'weather' | 'holiday' | 'seasonal' | 'epidemic' | 'economic' | 'school_calendar';
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  intensity: 'low' | 'medium' | 'high' | 'extreme';
  confidence: number; // 0-100%
  historical_impact: number; // % change in sales
  affected_categories: string[];
  source: string;
}

interface ForecastPeriod {
  period: string; // YYYY-Wxx format
  start_date: string;
  end_date: string;
  base_forecast: ProductForecast[];
  adjusted_forecast: ProductForecast[];
  external_signals: ExternalSignal[];
  total_impact: number; // % change from base
  confidence_score: number;
}

interface ProductForecast {
  product_id: string;
  brand: string;
  generic: string;
  category: string;
  base_demand: number;
  adjusted_demand: number;
  impact_factors: ImpactFactor[];
  recommended_stock: number;
  current_stock: number;
  reorder_suggestion: 'urgent' | 'normal' | 'reduce' | 'hold';
  gross_margin_impact: number;
}

interface ImpactFactor {
  signal_id: string;
  signal_name: string;
  impact_percentage: number;
  reason: string;
}

// Hardcoded external signals data for Philippine pharmacy context
const EXTERNAL_SIGNALS: ExternalSignal[] = [
  {
    id: "SIGNAL_001",
    type: "weather",
    name: "Typhoon Season Peak",
    description: "Peak typhoon season in Philippines (September-November). Increased respiratory infections and emergency medicine demand.",
    start_date: "2025-09-15",
    end_date: "2025-11-30",
    intensity: "high",
    confidence: 85,
    historical_impact: 35, // 35% increase in related medicines
    affected_categories: ["respiratory", "antibiotics", "pain_relief", "vitamins"],
    source: "PAGASA Weather Bureau"
  },
  {
    id: "SIGNAL_002", 
    type: "holiday",
    name: "Christmas Holiday Season",
    description: "Christmas and New Year holidays. Increased travel, gatherings, and stress-related conditions.",
    start_date: "2025-12-15",
    end_date: "2026-01-10", 
    intensity: "high",
    confidence: 95,
    historical_impact: 25,
    affected_categories: ["vitamins", "digestive", "pain_relief", "travel_health"],
    source: "Historical Sales Data"
  },
  {
    id: "SIGNAL_003",
    type: "seasonal",
    name: "Allergy Season",
    description: "Peak allergy season due to flowering plants and air quality changes during dry season transition.",
    start_date: "2025-10-01",
    end_date: "2025-12-15",
    intensity: "medium",
    confidence: 78,
    historical_impact: 40,
    affected_categories: ["antihistamines", "nasal_sprays", "eye_drops"],
    source: "Department of Health Allergy Reports"
  },
  {
    id: "SIGNAL_004",
    type: "school_calendar",
    name: "Back to School Season",
    description: "School opening increases spread of communicable diseases and vitamin supplementation needs.",
    start_date: "2025-08-15",
    end_date: "2025-10-15",
    intensity: "medium",
    confidence: 88,
    historical_impact: 20,
    affected_categories: ["vitamins", "antibiotics", "cough_cold", "immune_boosters"],
    source: "Department of Education Calendar"
  },
  {
    id: "SIGNAL_005",
    type: "epidemic",
    name: "Dengue Season Alert",
    description: "Increased dengue cases during rainy season. Higher demand for fever management and prevention.",
    start_date: "2025-09-01",
    end_date: "2025-12-31",
    intensity: "high",
    confidence: 70,
    historical_impact: 60, // Significant impact on fever medicines
    affected_categories: ["fever_reducers", "pain_relief", "electrolytes", "insect_repellent"],
    source: "DOH Epidemiology Bureau"
  },
  {
    id: "SIGNAL_006",
    type: "economic",
    name: "Inflation Impact on Healthcare",
    description: "Rising inflation affecting healthcare spending patterns. Shift towards generic medicines.",
    start_date: "2025-09-01",
    end_date: "2026-03-31",
    intensity: "medium",
    confidence: 65,
    historical_impact: -15, // Decrease in premium brands
    affected_categories: ["all_categories"],
    source: "Bangko Sentral ng Pilipinas"
  },
  {
    id: "SIGNAL_007",
    type: "weather",
    name: "La Niña Weather Pattern",
    description: "La Niña bringing more rainfall and cooler temperatures. Increased respiratory infections.",
    start_date: "2025-10-01", 
    end_date: "2026-02-28",
    intensity: "medium",
    confidence: 75,
    historical_impact: 28,
    affected_categories: ["respiratory", "cough_cold", "vitamins", "antibiotics"],
    source: "PAGASA Climate Monitoring"
  }
];

const FORECAST_PERIODS: ForecastPeriod[] = [
  {
    period: "2025W40", // Week 40, 2025
    start_date: "2025-09-29",
    end_date: "2025-10-05", 
    base_forecast: [], // Will be populated
    adjusted_forecast: [], // Will be populated
    external_signals: ["SIGNAL_001", "SIGNAL_003", "SIGNAL_004", "SIGNAL_005"],
    total_impact: 32, // 32% increase expected
    confidence_score: 82
  },
  {
    period: "2025W41",
    start_date: "2025-10-06", 
    end_date: "2025-10-12",
    base_forecast: [],
    adjusted_forecast: [],
    external_signals: ["SIGNAL_001", "SIGNAL_003", "SIGNAL_005", "SIGNAL_007"],
    total_impact: 35,
    confidence_score: 85
  },
  {
    period: "2025W42",
    start_date: "2025-10-13",
    end_date: "2025-10-19",
    base_forecast: [],
    adjusted_forecast: [], 
    external_signals: ["SIGNAL_001", "SIGNAL_003", "SIGNAL_005", "SIGNAL_007"],
    total_impact: 28,
    confidence_score: 80
  }
];

const PRODUCT_FORECASTS: ProductForecast[] = [
  {
    product_id: "store_123:paracetamol_500_tab_10s",
    brand: "Biogesic",
    generic: "Paracetamol", 
    category: "fever_reducers",
    base_demand: 180, // Base weekly demand
    adjusted_demand: 270, // 50% increase due to signals
    impact_factors: [
      { signal_id: "SIGNAL_001", signal_name: "Typhoon Season", impact_percentage: 25, reason: "Increased fever from respiratory infections" },
      { signal_id: "SIGNAL_005", signal_name: "Dengue Season", impact_percentage: 35, reason: "Primary fever reducer for dengue management" },
      { signal_id: "SIGNAL_007", signal_name: "La Niña Pattern", impact_percentage: 15, reason: "More cold weather related illness" }
    ],
    recommended_stock: 600, // 2.2 weeks coverage with safety stock
    current_stock: 420,
    reorder_suggestion: "urgent",
    gross_margin_impact: 8.5 // Expected margin improvement due to higher sales
  },
  {
    product_id: "store_123:cetirizine_10_tab_10s",
    brand: "Zyrtec", 
    generic: "Cetirizine",
    category: "antihistamines",
    base_demand: 75,
    adjusted_demand: 135, // 80% increase
    impact_factors: [
      { signal_id: "SIGNAL_003", signal_name: "Allergy Season", impact_percentage: 65, reason: "Peak allergy season for respiratory allergies" },
      { signal_id: "SIGNAL_001", signal_name: "Typhoon Season", impact_percentage: 20, reason: "Mold and dust allergies from flooding" }
    ],
    recommended_stock: 300,
    current_stock: 95,
    reorder_suggestion: "urgent",
    gross_margin_impact: 12.3
  },
  {
    product_id: "store_123:amoxicillin_500_cap_21s", 
    brand: "Amoxil",
    generic: "Amoxicillin",
    category: "antibiotics",
    base_demand: 120,
    adjusted_demand: 168, // 40% increase
    impact_factors: [
      { signal_id: "SIGNAL_001", signal_name: "Typhoon Season", impact_percentage: 30, reason: "Bacterial respiratory infections increase" },
      { signal_id: "SIGNAL_004", signal_name: "Back to School", impact_percentage: 15, reason: "School-related infections" },
      { signal_id: "SIGNAL_007", signal_name: "La Niña Pattern", impact_percentage: 10, reason: "Weather-related infections" }
    ],
    recommended_stock: 400,
    current_stock: 180,
    reorder_suggestion: "normal",
    gross_margin_impact: 6.8
  },
  {
    product_id: "store_123:ascorbic_acid_500_tab_100s",
    brand: "Conzace",
    generic: "Vitamin C", 
    category: "vitamins",
    base_demand: 100,
    adjusted_demand: 145, // 45% increase
    impact_factors: [
      { signal_id: "SIGNAL_001", signal_name: "Typhoon Season", impact_percentage: 25, reason: "Immune system support during illness season" },
      { signal_id: "SIGNAL_004", signal_name: "Back to School", impact_percentage: 20, reason: "Parents buying immune boosters for children" },
      { signal_id: "SIGNAL_007", signal_name: "La Niña Pattern", impact_percentage: 12, reason: "Cold weather immune support" }
    ],
    recommended_stock: 350,
    current_stock: 300, 
    reorder_suggestion: "normal",
    gross_margin_impact: 4.2
  },
  {
    product_id: "store_123:loperamide_2_cap_10s",
    brand: "Imodium",
    generic: "Loperamide", 
    category: "digestive",
    base_demand: 40,
    adjusted_demand: 30, // 25% decrease
    impact_factors: [
      { signal_id: "SIGNAL_006", signal_name: "Economic Inflation", impact_percentage: -25, reason: "Non-essential medicine, delayed purchases due to budget constraints" }
    ],
    recommended_stock: 60,
    current_stock: 240,
    reorder_suggestion: "hold", 
    gross_margin_impact: -2.1
  },
  {
    product_id: "store_123:multivitamins_adult_tab_30s",
    brand: "Centrum",
    generic: "Multivitamins",
    category: "vitamins", 
    base_demand: 90,
    adjusted_demand: 135, // 50% increase
    impact_factors: [
      { signal_id: "SIGNAL_004", signal_name: "Back to School", impact_percentage: 30, reason: "Parents and students preparing for school season" },
      { signal_id: "SIGNAL_001", signal_name: "Typhoon Season", impact_percentage: 20, reason: "General health maintenance during illness season" },
      { signal_id: "SIGNAL_002", signal_name: "Christmas Season", impact_percentage: 15, reason: "Holiday stress and travel preparation" }
    ],
    recommended_stock: 280,
    current_stock: 45,
    reorder_suggestion: "urgent",
    gross_margin_impact: 7.8
  }
];

export default function ForecastPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'signals' | 'forecasts' | 'planning'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState(FORECAST_PERIODS[0].period);
  const [selectedSignalType, setSelectedSignalType] = useState<'all' | 'weather' | 'holiday' | 'seasonal' | 'epidemic' | 'economic' | 'school_calendar'>('all');

  const currentPeriod = FORECAST_PERIODS.find(p => p.period === selectedPeriod) || FORECAST_PERIODS[0];
  
  const filteredSignals = EXTERNAL_SIGNALS.filter(signal => {
    const typeMatch = selectedSignalType === 'all' || signal.type === selectedSignalType;
    const dateMatch = currentPeriod.external_signals.includes(signal.id);
    return typeMatch && dateMatch;
  });

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Forecast Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Demand Increase</p>
              <p className="text-2xl font-bold text-green-600">+{currentPeriod.total_impact}%</p>
              <p className="text-xs text-gray-500">vs. baseline forecast</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Signals</p>
              <p className="text-2xl font-bold text-blue-600">{currentPeriod.external_signals.length}</p>
              <p className="text-xs text-gray-500">affecting demand</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <span className="text-2xl">🌡️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confidence Score</p>
              <p className="text-2xl font-bold text-purple-600">{currentPeriod.confidence_score}%</p>
              <p className="text-xs text-gray-500">forecast accuracy</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Reorders</p>
              <p className="text-2xl font-bold text-orange-600">
                {PRODUCT_FORECASTS.filter(p => p.reorder_suggestion === 'urgent').length}
              </p>
              <p className="text-xs text-gray-500">products need attention</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* External Signals Timeline */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Active External Signals - {currentPeriod.period}</h3>
        <div className="space-y-4">
          {filteredSignals.map(signal => (
            <div key={signal.id} className={`border-l-4 pl-4 ${
              signal.intensity === 'extreme' ? 'border-red-500' :
              signal.intensity === 'high' ? 'border-orange-500' :
              signal.intensity === 'medium' ? 'border-yellow-500' : 'border-blue-500'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{signal.name}</h4>
                  <p className="text-sm text-gray-600">{signal.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    signal.historical_impact >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {signal.historical_impact >= 0 ? '+' : ''}{signal.historical_impact}%
                  </div>
                  <div className="text-xs text-gray-500">{signal.confidence}% confidence</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  signal.type === 'weather' ? 'bg-blue-100 text-blue-800' :
                  signal.type === 'holiday' ? 'bg-purple-100 text-purple-800' :
                  signal.type === 'seasonal' ? 'bg-green-100 text-green-800' :
                  signal.type === 'epidemic' ? 'bg-red-100 text-red-800' :
                  signal.type === 'economic' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {signal.type.replace('_', ' ')}
                </span>
                <span className="text-gray-500">Source: {signal.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Impact Products */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Products with Highest Forecast Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCT_FORECASTS
            .sort((a, b) => Math.abs(b.adjusted_demand - b.base_demand) - Math.abs(a.adjusted_demand - a.base_demand))
            .slice(0, 6)
            .map(product => {
              const impactPercent = ((product.adjusted_demand - product.base_demand) / product.base_demand * 100);
              return (
                <div key={product.product_id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium text-sm">{product.brand}</h5>
                      <p className="text-xs text-gray-600">{product.generic}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      product.reorder_suggestion === 'urgent' ? 'bg-red-100 text-red-800' :
                      product.reorder_suggestion === 'normal' ? 'bg-blue-100 text-blue-800' :
                      product.reorder_suggestion === 'reduce' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.reorder_suggestion}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Demand:</span>
                      <span>{product.base_demand}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Adjusted:</span>
                      <span className={impactPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.adjusted_demand} ({impactPercent >= 0 ? '+' : ''}{impactPercent.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current Stock:</span>
                      <span className={product.current_stock < product.recommended_stock ? 'text-orange-600' : 'text-green-600'}>
                        {product.current_stock}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Recommend:</span>
                      <span>{product.recommended_stock}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  const SignalsTab = () => (
    <div className="space-y-6">
      {/* Signal Type Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Filter External Signals</h3>
        <div className="flex flex-wrap gap-2">
          {['all', 'weather', 'holiday', 'seasonal', 'epidemic', 'economic', 'school_calendar'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedSignalType(type as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedSignalType === type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Signal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {EXTERNAL_SIGNALS.filter(signal => 
          selectedSignalType === 'all' || signal.type === selectedSignalType
        ).map(signal => (
          <div key={signal.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{signal.name}</h4>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${
                  signal.type === 'weather' ? 'bg-blue-100 text-blue-800' :
                  signal.type === 'holiday' ? 'bg-purple-100 text-purple-800' :
                  signal.type === 'seasonal' ? 'bg-green-100 text-green-800' :
                  signal.type === 'epidemic' ? 'bg-red-100 text-red-800' :
                  signal.type === 'economic' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {signal.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${
                  signal.historical_impact >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {signal.historical_impact >= 0 ? '+' : ''}{signal.historical_impact}%
                </div>
                <div className="text-sm text-gray-500">Historical Impact</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{signal.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Intensity:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  signal.intensity === 'extreme' ? 'bg-red-100 text-red-800' :
                  signal.intensity === 'high' ? 'bg-orange-100 text-orange-800' :
                  signal.intensity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {signal.intensity.toUpperCase()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Confidence:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${signal.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{signal.confidence}%</span>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">Duration:</span>
                <p className="text-sm text-gray-600">
                  {new Date(signal.start_date).toLocaleDateString()} - {new Date(signal.end_date).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">Affected Categories:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {signal.affected_categories.map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {category.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">Source:</span>
                <p className="text-sm text-gray-600">{signal.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ForecastsTab = () => (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Select Forecast Period</h3>
        <div className="flex space-x-4">
          {FORECAST_PERIODS.map(period => (
            <button
              key={period.period}
              onClick={() => setSelectedPeriod(period.period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedPeriod === period.period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week {period.period.slice(-2)} ({new Date(period.start_date).toLocaleDateString()})
            </button>
          ))}
        </div>
      </div>

      {/* Product Forecasts Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Product Demand Forecasts - {currentPeriod.period}</h3>
          <p className="text-sm text-gray-600">
            Base vs. Signal-Adjusted Forecasts • Confidence: {currentPeriod.confidence_score}%
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Forecast</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adjusted Forecast</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impact Factors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {PRODUCT_FORECASTS.map(product => {
                const impactPercent = ((product.adjusted_demand - product.base_demand) / product.base_demand * 100);
                const stockCoverage = product.current_stock / product.adjusted_demand;
                
                return (
                  <tr key={product.product_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.brand}</div>
                        <div className="text-sm text-gray-500">{product.generic}</div>
                        <div className="text-xs text-gray-400 capitalize">{product.category.replace('_', ' ')}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{product.base_demand}</div>
                      <div className="text-xs text-gray-500">packs/week</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${
                        impactPercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.adjusted_demand}
                      </div>
                      <div className={`text-xs ${
                        impactPercent >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {impactPercent >= 0 ? '+' : ''}{impactPercent.toFixed(0)}% change
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {product.impact_factors.slice(0, 2).map((factor, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium">{factor.signal_name}:</span>
                            <span className={factor.impact_percentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {factor.impact_percentage >= 0 ? '+' : ''}{factor.impact_percentage}%
                            </span>
                          </div>
                        ))}
                        {product.impact_factors.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{product.impact_factors.length - 2} more factors
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium">{product.current_stock} packs</div>
                        <div className={`text-xs ${
                          stockCoverage < 1 ? 'text-red-600' :
                          stockCoverage < 1.5 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {stockCoverage.toFixed(1)} weeks coverage
                        </div>
                        <div className="text-xs text-gray-500">
                          Need: {product.recommended_stock}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        product.reorder_suggestion === 'urgent' ? 'bg-red-100 text-red-800' :
                        product.reorder_suggestion === 'normal' ? 'bg-blue-100 text-blue-800' :
                        product.reorder_suggestion === 'reduce' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.reorder_suggestion.toUpperCase()}
                      </span>
                      {product.gross_margin_impact !== 0 && (
                        <div className={`text-xs mt-1 ${
                          product.gross_margin_impact >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.gross_margin_impact >= 0 ? '+' : ''}{product.gross_margin_impact.toFixed(1)}% margin
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PlanningTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Seasonal Planning Calendar</h3>
        <p className="text-gray-600 mb-6">
          Plan ahead for external events and seasonal patterns affecting Philippine pharmacies
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              month: "October 2025",
              events: ["Typhoon Season Peak", "Allergy Season Start", "Dengue Season"],
              preparation: ["Stock fever reducers", "Increase antihistamines", "Prepare emergency kits"],
              impact: "+35% demand"
            },
            {
              month: "November 2025", 
              events: ["Allergy Season Peak", "Pre-Holiday Rush", "Cool Weather Transition"],
              preparation: ["Maximize allergy medicines", "Stock vitamins", "Prepare for respiratory season"],
              impact: "+28% demand"
            },
            {
              month: "December 2025",
              events: ["Christmas Holidays", "Travel Season", "Year-end Stockpiling"],
              preparation: ["Travel health kits", "Digestive medicines", "Gift vitamins"],
              impact: "+25% demand"
            },
            {
              month: "January 2026",
              events: ["Post-Holiday Recovery", "New Year Health Resolutions", "School Reopening"],
              preparation: ["Detox supplements", "Weight management", "Back-to-school health"],
              impact: "+15% demand"
            },
            {
              month: "February 2026",
              events: ["Dry Season Start", "Valentine's Health", "Chinese New Year"],
              preparation: ["Skin care products", "Wellness supplements", "Energy boosters"],
              impact: "+10% demand"
            },
            {
              month: "March 2026",
              events: ["Hot Season Beginning", "Summer Prep", "Graduation Season"],
              preparation: ["Sun protection", "Hydration products", "Stress management"],
              impact: "+8% demand"
            }
          ].map((plan, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{plan.month}</h4>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Key Events:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {plan.events.map((event, idx) => (
                      <li key={idx}>• {event}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Preparation:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {plan.preparation.map((prep, idx) => (
                      <li key={idx}>• {prep}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-2 border-t">
                  <div className={`text-sm font-medium ${
                    parseInt(plan.impact) >= 20 ? 'text-green-600' :
                    parseInt(plan.impact) >= 10 ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    Expected Impact: {plan.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <a href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    ← Back to Dashboard
                  </a>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">External Signals Forecasting</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Demand Forecasting with External Signals</h1>
                <p className="text-gray-600">Weather, holidays, epidemics, and economic factors affecting pharmacy demand</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Forecast Period</div>
                <div className="font-medium text-gray-900">{currentPeriod.period}</div>
                <div className="text-xs text-gray-500">{new Date(currentPeriod.start_date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'signals', label: 'External Signals', icon: '🌡️' },
              { id: 'forecasts', label: 'Product Forecasts', icon: '📈' },
              { id: 'planning', label: 'Seasonal Planning', icon: '📅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {selectedTab === 'overview' && <OverviewTab />}
          {selectedTab === 'signals' && <SignalsTab />}
          {selectedTab === 'forecasts' && <ForecastsTab />}
          {selectedTab === 'planning' && <PlanningTab />}
        </div>
      </div>
    </div>
  );
}