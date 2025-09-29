"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Types for inventory analytics
interface ProductAnalytics {
  id: string;
  store_id: string;
  brand: string;
  generic: string;
  form: string;
  strength: string;
  current_stock: number;
  reorder_point: number;
  reorder_quantity: number;
  abc_classification: 'A' | 'B' | 'C';
  velocity_category: 'fast' | 'medium' | 'slow' | 'dead';
  days_on_hand: number;
  monthly_sales_trend: number[];
  gross_margin: number;
  inventory_value: number;
  last_sale_date: string;
  expiry_risk: 'none' | 'low' | 'medium' | 'high' | 'critical';
  earliest_expiry: string;
  recommended_action: string[];
  seasonal_pattern: 'high' | 'medium' | 'low';
}

interface InventoryInsight {
  id: string;
  type: 'alert' | 'opportunity' | 'optimization';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affected_products: string[];
  potential_impact: number; // in pesos
  recommended_actions: string[];
  created_at: string;
}

// Hardcoded smart inventory data based on PRD requirements
const INVENTORY_ANALYTICS: ProductAnalytics[] = [
  {
    id: "store_123:paracetamol_500_tab_10s",
    store_id: "store_123",
    brand: "Biogesic",
    generic: "Paracetamol",
    form: "tablet",
    strength: "500mg",
    current_stock: 420,
    reorder_point: 150,
    reorder_quantity: 300,
    abc_classification: 'A', // High revenue
    velocity_category: 'fast',
    days_on_hand: 28,
    monthly_sales_trend: [180, 195, 210, 225, 240, 220], // Last 6 months
    gross_margin: 47.1,
    inventory_value: 7140,
    last_sale_date: "2025-09-29T14:30:00Z",
    expiry_risk: 'low',
    earliest_expiry: "2026-03-31",
    recommended_action: ['maintain_stock', 'monitor_demand'],
    seasonal_pattern: 'high' // Flu season coming
  },
  {
    id: "store_123:amoxicillin_500_cap_21s",
    store_id: "store_123",
    brand: "Amoxil",
    generic: "Amoxicillin",
    form: "capsule",
    strength: "500mg",
    current_stock: 180,
    reorder_point: 100,
    reorder_quantity: 200,
    abc_classification: 'A',
    velocity_category: 'medium',
    days_on_hand: 45,
    monthly_sales_trend: [120, 115, 125, 130, 128, 135],
    gross_margin: 50.0,
    inventory_value: 22500,
    last_sale_date: "2025-09-29T11:45:00Z",
    expiry_risk: 'medium',
    earliest_expiry: "2026-02-15",
    recommended_action: ['reduce_order_quantity', 'promote_sales'],
    seasonal_pattern: 'medium'
  },
  {
    id: "store_123:cetirizine_10_tab_10s",
    store_id: "store_123",
    brand: "Zyrtec",
    generic: "Cetirizine",
    form: "tablet",
    strength: "10mg",
    current_stock: 95,
    reorder_point: 50,
    reorder_quantity: 100,
    abc_classification: 'B',
    velocity_category: 'medium',
    days_on_hand: 38,
    monthly_sales_trend: [75, 80, 85, 70, 65, 90], // Seasonal allergy pattern
    gross_margin: 50.0,
    inventory_value: 7600,
    last_sale_date: "2025-09-29T09:15:00Z",
    expiry_risk: 'low',
    earliest_expiry: "2026-04-20",
    recommended_action: ['seasonal_stock_up', 'allergy_season_prep'],
    seasonal_pattern: 'high' // Allergy season approaching
  },
  {
    id: "store_123:loperamide_2_cap_10s",
    store_id: "store_123",
    brand: "Imodium",
    generic: "Loperamide HCl",
    form: "capsule",
    strength: "2mg",
    current_stock: 240,
    reorder_point: 30,
    reorder_quantity: 60,
    abc_classification: 'C',
    velocity_category: 'slow',
    days_on_hand: 180, // Very slow moving
    monthly_sales_trend: [40, 35, 30, 32, 28, 25], // Declining trend
    gross_margin: 50.0,
    inventory_value: 10800,
    last_sale_date: "2025-09-27T16:20:00Z",
    expiry_risk: 'critical',
    earliest_expiry: "2025-12-31",
    recommended_action: ['immediate_redistribution', 'markdown_pricing', 'supplier_return'],
    seasonal_pattern: 'low'
  },
  {
    id: "store_123:metformin_500_tab_30s",
    store_id: "store_123",
    brand: "Glucophage",
    generic: "Metformin HCl",
    form: "tablet",
    strength: "500mg",
    current_stock: 150,
    reorder_point: 80,
    reorder_quantity: 120,
    abc_classification: 'A',
    velocity_category: 'fast',
    days_on_hand: 25, // Running low
    monthly_sales_trend: [180, 185, 175, 190, 195, 200], // Steady growth
    gross_margin: 50.0,
    inventory_value: 33000,
    last_sale_date: "2025-09-29T15:10:00Z",
    expiry_risk: 'medium',
    earliest_expiry: "2026-01-15",
    recommended_action: ['urgent_reorder', 'increase_safety_stock'],
    seasonal_pattern: 'medium'
  },
  {
    id: "store_123:ascorbic_acid_500_tab_100s",
    store_id: "store_123",
    brand: "Conzace",
    generic: "Ascorbic Acid",
    form: "tablet",
    strength: "500mg",
    current_stock: 300,
    reorder_point: 100,
    reorder_quantity: 200,
    abc_classification: 'B',
    velocity_category: 'slow',
    days_on_hand: 90,
    monthly_sales_trend: [100, 85, 70, 60, 95, 110], // Seasonal vitamin demand
    gross_margin: 50.0,
    inventory_value: 10500,
    last_sale_date: "2025-09-28T13:45:00Z",
    expiry_risk: 'low',
    earliest_expiry: "2026-06-30",
    recommended_action: ['reduce_reorder_qty', 'seasonal_promotion'],
    seasonal_pattern: 'medium' // Rainy season vitamin boost
  },
  {
    id: "store_123:multivitamins_adult_tab_30s",
    store_id: "store_123",
    brand: "Centrum",
    generic: "Multivitamins",
    form: "tablet",
    strength: "Adult",
    current_stock: 45,
    reorder_point: 60,
    reorder_quantity: 120,
    abc_classification: 'B',
    velocity_category: 'medium',
    days_on_hand: 15, // Stock out risk
    monthly_sales_trend: [90, 95, 100, 85, 110, 120], // Growing demand
    gross_margin: 45.0,
    inventory_value: 6750,
    last_sale_date: "2025-09-29T16:00:00Z",
    expiry_risk: 'none',
    earliest_expiry: "2027-01-31",
    recommended_action: ['immediate_reorder', 'increase_reorder_point'],
    seasonal_pattern: 'high' // Back-to-school/work season
  },
  {
    id: "store_123:cough_syrup_100ml",
    store_id: "store_123",
    brand: "Robitussin",
    generic: "Dextromethorphan",
    form: "syrup",
    strength: "100ml",
    current_stock: 85,
    reorder_point: 40,
    reorder_quantity: 80,
    abc_classification: 'C',
    velocity_category: 'dead',
    days_on_hand: 200, // Dead stock
    monthly_sales_trend: [12, 8, 5, 3, 2, 1], // Rapidly declining
    gross_margin: 40.0,
    inventory_value: 4250,
    last_sale_date: "2025-09-15T10:30:00Z",
    expiry_risk: 'high',
    earliest_expiry: "2026-01-31",
    recommended_action: ['discontinue_product', 'clearance_sale', 'donate_excess'],
    seasonal_pattern: 'low'
  }
];

const INVENTORY_INSIGHTS: InventoryInsight[] = [
  {
    id: "INS_001",
    type: "alert",
    priority: "critical",
    title: "Critical Stock Out Risk - Metformin",
    description: "Glucophage Metformin will stock out in 25 days. This is a chronic medication with consistent demand.",
    affected_products: ["store_123:metformin_500_tab_30s"],
    potential_impact: 15000, // Lost sales
    recommended_actions: [
      "Place urgent reorder for 240 packs (2x normal quantity)",
      "Contact supplier for expedited delivery",
      "Consider substitute product sourcing",
      "Increase reorder point to 120 packs"
    ],
    created_at: "2025-09-29T10:00:00Z"
  },
  {
    id: "INS_002",
    type: "opportunity",
    priority: "high",
    title: "Seasonal Demand Surge - Allergy Medicines",
    description: "Allergy season approaching. Cetirizine and similar antihistamines show 40% demand increase in October-November.",
    affected_products: ["store_123:cetirizine_10_tab_10s"],
    potential_impact: 8500, // Additional revenue opportunity
    recommended_actions: [
      "Increase Zyrtec order by 50% for next 2 months",
      "Stock complementary allergy products (nasal sprays, eye drops)",
      "Create allergy relief product bundles",
      "Prepare promotional materials for allergy season"
    ],
    created_at: "2025-09-29T09:30:00Z"
  },
  {
    id: "INS_003",
    type: "alert",
    priority: "high",
    title: "Expiring Inventory - Imodium",
    description: "Loperamide (Imodium) has 240 packs expiring in 93 days with very slow sales velocity.",
    affected_products: ["store_123:loperamide_2_cap_10s"],
    potential_impact: -10800, // Potential loss
    recommended_actions: [
      "Redistribute 120 packs to other branches immediately",
      "Offer 15% markdown to accelerate sales",
      "Contact supplier about return policy",
      "Consider donation to community health centers"
    ],
    created_at: "2025-09-29T08:45:00Z"
  },
  {
    id: "INS_004",
    type: "optimization",
    priority: "medium",
    title: "Dead Stock Alert - Cough Syrup",
    description: "Robitussin cough syrup shows dead stock pattern with declining sales trend. Last sale 14 days ago.",
    affected_products: ["store_123:cough_syrup_100ml"],
    potential_impact: -4250, // Tied up capital
    recommended_actions: [
      "Discontinue automatic reordering",
      "Start clearance promotion (25% off)",
      "Evaluate customer preference for tablet alternatives",
      "Consider product category optimization"
    ],
    created_at: "2025-09-29T07:15:00Z"
  },
  {
    id: "INS_005",
    type: "opportunity",
    priority: "medium",
    title: "High Margin Fast Mover - Paracetamol",
    description: "Biogesic Paracetamol shows consistent fast movement with healthy margins. Optimize stock levels.",
    affected_products: ["store_123:paracetamol_500_tab_10s"],
    potential_impact: 3500, // Margin optimization
    recommended_actions: [
      "Increase safety stock for flu season preparation",
      "Negotiate better supplier terms for volume discount",
      "Consider bulk purchase for 3-month supply",
      "Monitor competitor pricing for margin opportunities"
    ],
    created_at: "2025-09-29T06:30:00Z"
  }
];

export default function InventoryPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'analytics' | 'insights' | 'recommendations'>('overview');
  const [selectedClassification, setSelectedClassification] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [selectedVelocity, setSelectedVelocity] = useState<'all' | 'fast' | 'medium' | 'slow' | 'dead'>('all');

  // Filter products based on selections
  const filteredProducts = INVENTORY_ANALYTICS.filter(product => {
    const classMatch = selectedClassification === 'all' || product.abc_classification === selectedClassification;
    const velocityMatch = selectedVelocity === 'all' || product.velocity_category === selectedVelocity;
    return classMatch && velocityMatch;
  });

  // Calculate summary metrics
  const totalInventoryValue = INVENTORY_ANALYTICS.reduce((sum, product) => sum + product.inventory_value, 0);
  const fastMovers = INVENTORY_ANALYTICS.filter(p => p.velocity_category === 'fast').length;
  const slowMovers = INVENTORY_ANALYTICS.filter(p => p.velocity_category === 'slow').length;
  const deadStock = INVENTORY_ANALYTICS.filter(p => p.velocity_category === 'dead').length;
  const expiryRisk = INVENTORY_ANALYTICS.filter(p => ['high', 'critical'].includes(p.expiry_risk)).length;
  const stockOutRisk = INVENTORY_ANALYTICS.filter(p => p.days_on_hand <= 30).length;

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">₱{totalInventoryValue.toLocaleString()}</p>
              <p className="text-xs text-green-600">+5.2% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fast Movers</p>
              <p className="text-2xl font-bold text-green-600">{fastMovers}</p>
              <p className="text-xs text-gray-500">High velocity products</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Slow/Dead Stock</p>
              <p className="text-2xl font-bold text-orange-600">{slowMovers + deadStock}</p>
              <p className="text-xs text-gray-500">Need attention</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Items</p>
              <p className="text-2xl font-bold text-red-600">{expiryRisk + stockOutRisk}</p>
              <p className="text-xs text-gray-500">Expiry + Stock out</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <span className="text-2xl">🚨</span>
            </div>
          </div>
        </div>
      </div>

      {/* ABC Analysis Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">ABC Classification Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['A', 'B', 'C'].map(category => {
            const categoryProducts = INVENTORY_ANALYTICS.filter(p => p.abc_classification === category);
            const categoryValue = categoryProducts.reduce((sum, p) => sum + p.inventory_value, 0);
            const percentage = (categoryValue / totalInventoryValue * 100).toFixed(1);
            
            return (
              <div key={category} className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                  category === 'A' ? 'bg-green-500' : 
                  category === 'B' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {category}
                </div>
                <h4 className="font-semibold mt-3">Class {category}</h4>
                <p className="text-sm text-gray-600">
                  {categoryProducts.length} products • {percentage}% value
                </p>
                <p className="text-lg font-bold">₱{categoryValue.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Velocity Analysis */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Inventory Velocity Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { category: 'fast', label: 'Fast Movers', color: 'green', icon: '🚀' },
            { category: 'medium', label: 'Medium Movers', color: 'blue', icon: '📈' },
            { category: 'slow', label: 'Slow Movers', color: 'yellow', icon: '🐌' },
            { category: 'dead', label: 'Dead Stock', color: 'red', icon: '💀' }
          ].map(vel => {
            const count = INVENTORY_ANALYTICS.filter(p => p.velocity_category === vel.category).length;
            const value = INVENTORY_ANALYTICS
              .filter(p => p.velocity_category === vel.category)
              .reduce((sum, p) => sum + p.inventory_value, 0);
            
            return (
              <div key={vel.category} className={`border-l-4 border-${vel.color}-500 pl-4`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">{vel.icon}</span>
                  <h4 className="font-semibold">{vel.label}</h4>
                </div>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-gray-600">₱{value.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ABC Classification</label>
            <select
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="A">Class A (High Value)</option>
              <option value="B">Class B (Medium Value)</option>
              <option value="C">Class C (Low Value)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Category</label>
            <select
              value={selectedVelocity}
              onChange={(e) => setSelectedVelocity(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Velocities</option>
              <option value="fast">Fast Movers</option>
              <option value="medium">Medium Movers</option>
              <option value="slow">Slow Movers</option>
              <option value="dead">Dead Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Analytics Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Product Performance Analytics</h3>
          <p className="text-sm text-gray-600">Showing {filteredProducts.length} products</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Velocity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value & Margin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Factors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{product.brand}</div>
                      <div className="text-sm text-gray-500">{product.generic} {product.strength}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.abc_classification === 'A' ? 'bg-green-100 text-green-800' :
                      product.abc_classification === 'B' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Class {product.abc_classification}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.velocity_category === 'fast' ? 'bg-green-100 text-green-800' :
                      product.velocity_category === 'medium' ? 'bg-blue-100 text-blue-800' :
                      product.velocity_category === 'slow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.velocity_category.charAt(0).toUpperCase() + product.velocity_category.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">{product.current_stock} packs</div>
                      <div className={`text-xs ${
                        product.days_on_hand <= 14 ? 'text-red-600' :
                        product.days_on_hand <= 30 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {product.days_on_hand} days supply
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">₱{product.inventory_value.toLocaleString()}</div>
                      <div className="text-green-600">{product.gross_margin}% margin</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {product.days_on_hand <= 30 && (
                        <span className="inline-flex px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                          Stock Risk
                        </span>
                      )}
                      {['high', 'critical'].includes(product.expiry_risk) && (
                        <span className="inline-flex px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">
                          Expiry Risk
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {product.monthly_sales_trend.length >= 2 && (
                        <span className={`${
                          product.monthly_sales_trend[product.monthly_sales_trend.length - 1] > 
                          product.monthly_sales_trend[product.monthly_sales_trend.length - 2] ? 
                          'text-green-600' : 'text-red-600'
                        }`}>
                          {product.monthly_sales_trend[product.monthly_sales_trend.length - 1] > 
                           product.monthly_sales_trend[product.monthly_sales_trend.length - 2] ? '↗️' : '↘️'}
                        </span>
                      )}
                      <span className={`ml-2 px-2 py-1 text-xs rounded ${
                        product.seasonal_pattern === 'high' ? 'bg-green-100 text-green-700' :
                        product.seasonal_pattern === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {product.seasonal_pattern} season
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const InsightsTab = () => (
    <div className="space-y-6">
      {INVENTORY_INSIGHTS.map((insight) => (
        <div key={insight.id} className={`border-l-4 rounded-lg p-6 bg-white shadow-sm ${
          insight.priority === 'critical' ? 'border-red-500' :
          insight.priority === 'high' ? 'border-orange-500' :
          insight.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  insight.type === 'alert' ? 'bg-red-100 text-red-800' :
                  insight.type === 'opportunity' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {insight.type.toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  insight.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  insight.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {insight.priority.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
              <p className="text-gray-600 mt-2">{insight.description}</p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${
                insight.potential_impact >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {insight.potential_impact >= 0 ? '+' : ''}₱{Math.abs(insight.potential_impact).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {insight.potential_impact >= 0 ? 'Potential gain' : 'Potential loss'}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Recommended Actions:</h4>
            <ul className="space-y-1">
              {insight.recommended_actions.map((action, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-sm text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
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
                  <span className="text-sm text-gray-600">Smart Inventory Analytics</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Inventory Management</h1>
                <p className="text-gray-600">Fast vs. slow moving analysis with expiry-driven insights</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Last Updated</div>
                <div className="font-medium text-gray-900">{new Date().toLocaleString()}</div>
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
              { id: 'overview', label: 'Overview', count: null },
              { id: 'analytics', label: 'Product Analytics', count: INVENTORY_ANALYTICS.length },
              { id: 'insights', label: 'Smart Insights', count: INVENTORY_INSIGHTS.length },
              { id: 'recommendations', label: 'Recommendations', count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    selectedTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {selectedTab === 'overview' && <OverviewTab />}
          {selectedTab === 'analytics' && <AnalyticsTab />}
          {selectedTab === 'insights' && <InsightsTab />}
          {selectedTab === 'recommendations' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Advanced ML recommendations coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}