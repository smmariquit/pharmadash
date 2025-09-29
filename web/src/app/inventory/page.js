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
exports.default = InventoryPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
// Hardcoded smart inventory data based on PRD requirements
const INVENTORY_ANALYTICS = [
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
const INVENTORY_INSIGHTS = [
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
function InventoryPage() {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('overview');
    const [selectedClassification, setSelectedClassification] = (0, react_1.useState)('all');
    const [selectedVelocity, setSelectedVelocity] = (0, react_1.useState)('all');
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
    const OverviewTab = () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Total Inventory Value" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-gray-900", children: ["\u20B1", totalInventoryValue.toLocaleString()] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-green-600", children: "+5.2% from last month" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-blue-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCB0" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Fast Movers" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-green-600", children: fastMovers }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "High velocity products" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-green-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDE80" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Slow/Dead Stock" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-orange-600", children: slowMovers + deadStock }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "Need attention" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-orange-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\u26A0\uFE0F" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg shadow-sm border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Risk Items" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-red-600", children: expiryRisk + stockOutRisk }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "Expiry + Stock out" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-red-50 rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDEA8" }) })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "ABC Classification Overview" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ['A', 'B', 'C'].map(category => {
                            const categoryProducts = INVENTORY_ANALYTICS.filter(p => p.abc_classification === category);
                            const categoryValue = categoryProducts.reduce((sum, p) => sum + p.inventory_value, 0);
                            const percentage = (categoryValue / totalInventoryValue * 100).toFixed(1);
                            return ((0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white ${category === 'A' ? 'bg-green-500' :
                                            category === 'B' ? 'bg-yellow-500' : 'bg-red-500'}`, children: category }), (0, jsx_runtime_1.jsxs)("h4", { className: "font-semibold mt-3", children: ["Class ", category] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: [categoryProducts.length, " products \u2022 ", percentage, "% value"] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-bold", children: ["\u20B1", categoryValue.toLocaleString()] })] }, category));
                        }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Inventory Velocity Analysis" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
                            { category: 'fast', label: 'Fast Movers', color: 'green', icon: '🚀' },
                            { category: 'medium', label: 'Medium Movers', color: 'blue', icon: '📈' },
                            { category: 'slow', label: 'Slow Movers', color: 'yellow', icon: '🐌' },
                            { category: 'dead', label: 'Dead Stock', color: 'red', icon: '💀' }
                        ].map(vel => {
                            const count = INVENTORY_ANALYTICS.filter(p => p.velocity_category === vel.category).length;
                            const value = INVENTORY_ANALYTICS
                                .filter(p => p.velocity_category === vel.category)
                                .reduce((sum, p) => sum + p.inventory_value, 0);
                            return ((0, jsx_runtime_1.jsxs)("div", { className: `border-l-4 border-${vel.color}-500 pl-4`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", children: vel.icon }), (0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: vel.label })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: count }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: ["\u20B1", value.toLocaleString()] })] }, vel.category));
                        }) })] })] }));
    const AnalyticsTab = () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Filter Products" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "ABC Classification" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedClassification, onChange: (e) => setSelectedClassification(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "All Classes" }), (0, jsx_runtime_1.jsx)("option", { value: "A", children: "Class A (High Value)" }), (0, jsx_runtime_1.jsx)("option", { value: "B", children: "Class B (Medium Value)" }), (0, jsx_runtime_1.jsx)("option", { value: "C", children: "Class C (Low Value)" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Velocity Category" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedVelocity, onChange: (e) => setSelectedVelocity(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "All Velocities" }), (0, jsx_runtime_1.jsx)("option", { value: "fast", children: "Fast Movers" }), (0, jsx_runtime_1.jsx)("option", { value: "medium", children: "Medium Movers" }), (0, jsx_runtime_1.jsx)("option", { value: "slow", children: "Slow Movers" }), (0, jsx_runtime_1.jsx)("option", { value: "dead", children: "Dead Stock" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-b", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: "Product Performance Analytics" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: ["Showing ", filteredProducts.length, " products"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Product" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Classification" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Velocity" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Stock Status" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Value & Margin" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Risk Factors" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Trend" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-gray-200", children: filteredProducts.map((product) => ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: product.brand }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-500", children: [product.generic, " ", product.strength] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.abc_classification === 'A' ? 'bg-green-100 text-green-800' :
                                                        product.abc_classification === 'B' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}`, children: ["Class ", product.abc_classification] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.velocity_category === 'fast' ? 'bg-green-100 text-green-800' :
                                                        product.velocity_category === 'medium' ? 'bg-blue-100 text-blue-800' :
                                                            product.velocity_category === 'slow' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`, children: product.velocity_category.charAt(0).toUpperCase() + product.velocity_category.slice(1) }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium", children: [product.current_stock, " packs"] }), (0, jsx_runtime_1.jsxs)("div", { className: `text-xs ${product.days_on_hand <= 14 ? 'text-red-600' :
                                                                product.days_on_hand <= 30 ? 'text-orange-600' : 'text-green-600'}`, children: [product.days_on_hand, " days supply"] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium", children: ["\u20B1", product.inventory_value.toLocaleString()] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-green-600", children: [product.gross_margin, "% margin"] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [product.days_on_hand <= 30 && ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex px-2 py-1 text-xs bg-red-100 text-red-700 rounded", children: "Stock Risk" })), ['high', 'critical'].includes(product.expiry_risk) && ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded", children: "Expiry Risk" }))] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [product.monthly_sales_trend.length >= 2 && ((0, jsx_runtime_1.jsx)("span", { className: `${product.monthly_sales_trend[product.monthly_sales_trend.length - 1] >
                                                                product.monthly_sales_trend[product.monthly_sales_trend.length - 2] ?
                                                                'text-green-600' : 'text-red-600'}`, children: product.monthly_sales_trend[product.monthly_sales_trend.length - 1] >
                                                                product.monthly_sales_trend[product.monthly_sales_trend.length - 2] ? '↗️' : '↘️' })), (0, jsx_runtime_1.jsxs)("span", { className: `ml-2 px-2 py-1 text-xs rounded ${product.seasonal_pattern === 'high' ? 'bg-green-100 text-green-700' :
                                                                product.seasonal_pattern === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-gray-100 text-gray-700'}`, children: [product.seasonal_pattern, " season"] })] }) })] }, product.id))) })] }) })] })] }));
    const InsightsTab = () => ((0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: INVENTORY_INSIGHTS.map((insight) => ((0, jsx_runtime_1.jsxs)("div", { className: `border-l-4 rounded-lg p-6 bg-white shadow-sm ${insight.priority === 'critical' ? 'border-red-500' :
                insight.priority === 'high' ? 'border-orange-500' :
                    insight.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-2", children: [(0, jsx_runtime_1.jsx)("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${insight.type === 'alert' ? 'bg-red-100 text-red-800' :
                                                insight.type === 'opportunity' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'}`, children: insight.type.toUpperCase() }), (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${insight.priority === 'critical' ? 'bg-red-100 text-red-800' :
                                                insight.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: insight.priority.toUpperCase() })] }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900", children: insight.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mt-2", children: insight.description })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: `text-lg font-bold ${insight.potential_impact >= 0 ? 'text-green-600' : 'text-red-600'}`, children: [insight.potential_impact >= 0 ? '+' : '', "\u20B1", Math.abs(insight.potential_impact).toLocaleString()] }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: insight.potential_impact >= 0 ? 'Potential gain' : 'Potential loss' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-gray-900 mb-2", children: "Recommended Actions:" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: insight.recommended_actions.map((action, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-blue-500 mt-1", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-700", children: action })] }, index))) })] })] }, insight.id))) }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white border-b", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsx)("div", { className: "py-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4 mb-2", children: [(0, jsx_runtime_1.jsx)("a", { href: "/dashboard", className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "\u2190 Back to Dashboard" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-300", children: "|" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: "Smart Inventory Analytics" })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Smart Inventory Management" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Fast vs. slow moving analysis with expiry-driven insights" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "Last Updated" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: new Date().toLocaleString() })] })] }) }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-gray-200", children: (0, jsx_runtime_1.jsx)("nav", { className: "-mb-px flex space-x-8", children: [
                                { id: 'overview', label: 'Overview', count: null },
                                { id: 'analytics', label: 'Product Analytics', count: INVENTORY_ANALYTICS.length },
                                { id: 'insights', label: 'Smart Insights', count: INVENTORY_INSIGHTS.length },
                                { id: 'recommendations', label: 'Recommendations', count: null }
                            ].map((tab) => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSelectedTab(tab.id), className: `py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [tab.label, tab.count !== null && ((0, jsx_runtime_1.jsx)("span", { className: `ml-2 py-0.5 px-2 rounded-full text-xs ${selectedTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`, children: tab.count }))] }, tab.id))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "py-6", children: [selectedTab === 'overview' && (0, jsx_runtime_1.jsx)(OverviewTab, {}), selectedTab === 'analytics' && (0, jsx_runtime_1.jsx)(AnalyticsTab, {}), selectedTab === 'insights' && (0, jsx_runtime_1.jsx)(InsightsTab, {}), selectedTab === 'recommendations' && ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "AI-Powered Recommendations" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Advanced ML recommendations coming soon..." })] }))] })] })] }));
}
//# sourceMappingURL=page.js.map