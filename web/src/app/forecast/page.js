"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForecastPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
// Hardcoded external signals data for Philippine pharmacy context
const EXTERNAL_SIGNALS = [
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
const FORECAST_PERIODS = [
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
const PRODUCT_FORECASTS = [
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
function ForecastPage() {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('overview');
    const [selectedPeriod, setSelectedPeriod] = (0, react_1.useState)(FORECAST_PERIODS[0].period);
    const [selectedSignalType, setSelectedSignalType] = (0, react_1.useState)('all');
    const currentPeriod = FORECAST_PERIODS.find(p => p.period === selectedPeriod) || FORECAST_PERIODS[0];
    const filteredSignals = EXTERNAL_SIGNALS.filter(signal => {
        const typeMatch = selectedSignalType === 'all' || signal.type === selectedSignalType;
        const dateMatch = currentPeriod.external_signals.includes(signal.id);
        return typeMatch && dateMatch;
    });
    const OverviewTab = () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Demand Increase" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-green-600", children: ["+", currentPeriod.total_impact, "%"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "vs. baseline forecast" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-green-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCC8" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Active Signals" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-blue-600", children: currentPeriod.external_signals.length }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "affecting demand" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-blue-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83C\uDF21\uFE0F" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Confidence Score" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-purple-600", children: [currentPeriod.confidence_score, "%"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "forecast accuracy" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-purple-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83C\uDFAF" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Urgent Reorders" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-orange-600", children: PRODUCT_FORECASTS.filter(p => p.reorder_suggestion === 'urgent').length }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "products need attention" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-orange-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\u26A1" }) })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold mb-4", children: ["Active External Signals - ", currentPeriod.period] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: filteredSignals.map(signal => ((0, jsx_runtime_1.jsxs)("div", { className: `border-l-4 pl-4 ${signal.intensity === 'extreme' ? 'border-red-500' :
                                signal.intensity === 'high' ? 'border-orange-500' :
                                    signal.intensity === 'medium' ? 'border-yellow-500' : 'border-blue-500'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-gray-900", children: signal.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: signal.description })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: `text-lg font-bold ${signal.historical_impact >= 0 ? 'text-green-600' : 'text-red-600'}`, children: [signal.historical_impact >= 0 ? '+' : '', signal.historical_impact, "%"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: [signal.confidence, "% confidence"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4 text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: `px-2 py-1 rounded text-xs font-medium ${signal.type === 'weather' ? 'bg-blue-100 text-blue-800' :
                                                signal.type === 'holiday' ? 'bg-purple-100 text-purple-800' :
                                                    signal.type === 'seasonal' ? 'bg-green-100 text-green-800' :
                                                        signal.type === 'epidemic' ? 'bg-red-100 text-red-800' :
                                                            signal.type === 'economic' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}`, children: signal.type.replace('_', ' ') }), (0, jsx_runtime_1.jsxs)("span", { className: "text-gray-500", children: ["Source: ", signal.source] })] })] }, signal.id))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Products with Highest Forecast Impact" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: PRODUCT_FORECASTS
                            .sort((a, b) => Math.abs(b.adjusted_demand - b.base_demand) - Math.abs(a.adjusted_demand - a.base_demand))
                            .slice(0, 6)
                            .map(product => {
                            const impactPercent = ((product.adjusted_demand - product.base_demand) / product.base_demand * 100);
                            return ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-sm", children: product.brand }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600", children: product.generic })] }), (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-1 text-xs font-semibold rounded ${product.reorder_suggestion === 'urgent' ? 'bg-red-100 text-red-800' :
                                                    product.reorder_suggestion === 'normal' ? 'bg-blue-100 text-blue-800' :
                                                        product.reorder_suggestion === 'reduce' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'}`, children: product.reorder_suggestion })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Base Demand:" }), (0, jsx_runtime_1.jsx)("span", { children: product.base_demand })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Adjusted:" }), (0, jsx_runtime_1.jsxs)("span", { className: impactPercent >= 0 ? 'text-green-600' : 'text-red-600', children: [product.adjusted_demand, " (", impactPercent >= 0 ? '+' : '', impactPercent.toFixed(0), "%)"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Current Stock:" }), (0, jsx_runtime_1.jsx)("span", { className: product.current_stock < product.recommended_stock ? 'text-orange-600' : 'text-green-600', children: product.current_stock })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm font-medium", children: [(0, jsx_runtime_1.jsx)("span", { children: "Recommend:" }), (0, jsx_runtime_1.jsx)("span", { children: product.recommended_stock })] })] })] }, product.product_id));
                        }) })] })] }));
    const SignalsTab = () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Filter External Signals" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: ['all', 'weather', 'holiday', 'seasonal', 'epidemic', 'economic', 'school_calendar'].map(type => ((0, jsx_runtime_1.jsx)("button", { onClick: () => setSelectedSignalType(type), className: `px-4 py-2 rounded-lg text-sm font-medium ${selectedSignalType === type
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: type.replace('_', ' ').toUpperCase() }, type))) })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: EXTERNAL_SIGNALS.filter(signal => selectedSignalType === 'all' || signal.type === selectedSignalType).map(signal => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-semibold text-gray-900", children: signal.name }), (0, jsx_runtime_1.jsx)("span", { className: `inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${signal.type === 'weather' ? 'bg-blue-100 text-blue-800' :
                                                signal.type === 'holiday' ? 'bg-purple-100 text-purple-800' :
                                                    signal.type === 'seasonal' ? 'bg-green-100 text-green-800' :
                                                        signal.type === 'epidemic' ? 'bg-red-100 text-red-800' :
                                                            signal.type === 'economic' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}`, children: signal.type.replace('_', ' ').toUpperCase() })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: `text-xl font-bold ${signal.historical_impact >= 0 ? 'text-green-600' : 'text-red-600'}`, children: [signal.historical_impact >= 0 ? '+' : '', signal.historical_impact, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: "Historical Impact" })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-4", children: signal.description }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-700", children: "Intensity:" }), (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-1 text-xs font-semibold rounded ${signal.intensity === 'extreme' ? 'bg-red-100 text-red-800' :
                                                signal.intensity === 'high' ? 'bg-orange-100 text-orange-800' :
                                                    signal.intensity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-blue-100 text-blue-800'}`, children: signal.intensity.toUpperCase() })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-700", children: "Confidence:" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-20 bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${signal.confidence}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: [signal.confidence, "%"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-700", children: "Duration:" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: [new Date(signal.start_date).toLocaleDateString(), " - ", new Date(signal.end_date).toLocaleDateString()] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-700", children: "Affected Categories:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1 mt-1", children: signal.affected_categories.map((category, index) => ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded", children: category.replace('_', ' ') }, index))) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-700", children: "Source:" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: signal.source })] })] })] }, signal.id))) })] }));
    const ForecastsTab = () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Select Forecast Period" }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-4", children: FORECAST_PERIODS.map(period => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSelectedPeriod(period.period), className: `px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === period.period
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: ["Week ", period.period.slice(-2), " (", new Date(period.start_date).toLocaleDateString(), ")"] }, period.period))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-b", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold", children: ["Product Demand Forecasts - ", currentPeriod.period] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: ["Base vs. Signal-Adjusted Forecasts \u2022 Confidence: ", currentPeriod.confidence_score, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Product" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Base Forecast" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Adjusted Forecast" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Impact Factors" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Stock Position" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Recommendation" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-gray-200", children: PRODUCT_FORECASTS.map(product => {
                                        const impactPercent = ((product.adjusted_demand - product.base_demand) / product.base_demand * 100);
                                        const stockCoverage = product.current_stock / product.adjusted_demand;
                                        return ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: product.brand }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: product.generic }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-400 capitalize", children: product.category.replace('_', ' ') })] }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-gray-900", children: product.base_demand }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: "packs/week" })] }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsx)("div", { className: `text-sm font-medium ${impactPercent >= 0 ? 'text-green-600' : 'text-red-600'}`, children: product.adjusted_demand }), (0, jsx_runtime_1.jsxs)("div", { className: `text-xs ${impactPercent >= 0 ? 'text-green-500' : 'text-red-500'}`, children: [impactPercent >= 0 ? '+' : '', impactPercent.toFixed(0), "% change"] })] }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [product.impact_factors.slice(0, 2).map((factor, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "text-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-medium", children: [factor.signal_name, ":"] }), (0, jsx_runtime_1.jsxs)("span", { className: factor.impact_percentage >= 0 ? 'text-green-600' : 'text-red-600', children: [factor.impact_percentage >= 0 ? '+' : '', factor.impact_percentage, "%"] })] }, index))), product.impact_factors.length > 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["+", product.impact_factors.length - 2, " more factors"] }))] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium", children: [product.current_stock, " packs"] }), (0, jsx_runtime_1.jsxs)("div", { className: `text-xs ${stockCoverage < 1 ? 'text-red-600' :
                                                                    stockCoverage < 1.5 ? 'text-orange-600' : 'text-green-600'}`, children: [stockCoverage.toFixed(1), " weeks coverage"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["Need: ", product.recommended_stock] })] }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsx)("span", { className: `inline-flex px-3 py-1 text-xs font-semibold rounded-full ${product.reorder_suggestion === 'urgent' ? 'bg-red-100 text-red-800' :
                                                                product.reorder_suggestion === 'normal' ? 'bg-blue-100 text-blue-800' :
                                                                    product.reorder_suggestion === 'reduce' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-gray-100 text-gray-800'}`, children: product.reorder_suggestion.toUpperCase() }), product.gross_margin_impact !== 0 && ((0, jsx_runtime_1.jsxs)("div", { className: `text-xs mt-1 ${product.gross_margin_impact >= 0 ? 'text-green-600' : 'text-red-600'}`, children: [product.gross_margin_impact >= 0 ? '+' : '', product.gross_margin_impact.toFixed(1), "% margin"] }))] })] }, product.product_id));
                                    }) })] }) })] })] }));
    const PlanningTab = () => ((0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Seasonal Planning Calendar" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-6", children: "Plan ahead for external events and seasonal patterns affecting Philippine pharmacies" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
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
                    ].map((plan, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold text-gray-900 mb-2", children: plan.month }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "text-sm font-medium text-gray-700 mb-1", children: "Key Events:" }), (0, jsx_runtime_1.jsx)("ul", { className: "text-xs text-gray-600 space-y-1", children: plan.events.map((event, idx) => ((0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", event] }, idx))) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "text-sm font-medium text-gray-700 mb-1", children: "Preparation:" }), (0, jsx_runtime_1.jsx)("ul", { className: "text-xs text-gray-600 space-y-1", children: plan.preparation.map((prep, idx) => ((0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", prep] }, idx))) })] }), (0, jsx_runtime_1.jsx)("div", { className: "pt-2 border-t", children: (0, jsx_runtime_1.jsxs)("div", { className: `text-sm font-medium ${parseInt(plan.impact) >= 20 ? 'text-green-600' :
                                                parseInt(plan.impact) >= 10 ? 'text-blue-600' : 'text-gray-600'}`, children: ["Expected Impact: ", plan.impact] }) })] })] }, index))) })] }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white border-b", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsx)("div", { className: "py-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4 mb-2", children: [(0, jsx_runtime_1.jsx)("a", { href: "/dashboard", className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "\u2190 Back to Dashboard" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-300", children: "|" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: "External Signals Forecasting" })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Demand Forecasting with External Signals" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Weather, holidays, epidemics, and economic factors affecting pharmacy demand" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "Forecast Period" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: currentPeriod.period }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: new Date(currentPeriod.start_date).toLocaleDateString() })] })] }) }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-gray-200", children: (0, jsx_runtime_1.jsx)("nav", { className: "-mb-px flex space-x-8", children: [
                                { id: 'overview', label: 'Overview', icon: '📊' },
                                { id: 'signals', label: 'External Signals', icon: '🌡️' },
                                { id: 'forecasts', label: 'Product Forecasts', icon: '📈' },
                                { id: 'planning', label: 'Seasonal Planning', icon: '📅' }
                            ].map((tab) => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSelectedTab(tab.id), className: `py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${selectedTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [(0, jsx_runtime_1.jsx)("span", { children: tab.icon }), (0, jsx_runtime_1.jsx)("span", { children: tab.label })] }, tab.id))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "py-6", children: [selectedTab === 'overview' && (0, jsx_runtime_1.jsx)(OverviewTab, {}), selectedTab === 'signals' && (0, jsx_runtime_1.jsx)(SignalsTab, {}), selectedTab === 'forecasts' && (0, jsx_runtime_1.jsx)(ForecastsTab, {}), selectedTab === 'planning' && (0, jsx_runtime_1.jsx)(PlanningTab, {})] })] })] }));
}
//# sourceMappingURL=page.js.map