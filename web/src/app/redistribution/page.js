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
exports.default = RedistributionPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
// Hardcoded scenario data based on PRD requirements
const PHARMACY_BRANCHES = [
    {
        id: 'store_123',
        name: 'PharmaDash Main - Makati',
        location: 'Makati City',
        manager: 'Maria Santos',
        address: 'Unit 101, Ayala Triangle, Makati City',
        phone: '+63 2 8123 4567',
        current_capacity: 85, // percentage
        specialties: ['General Medicine', 'OTC', 'Prescription Drugs']
    },
    {
        id: 'store_124',
        name: 'PharmaDash North - Quezon City',
        location: 'Quezon City',
        manager: 'Jose Rivera',
        address: 'SM North EDSA, Quezon City',
        phone: '+63 2 8234 5678',
        current_capacity: 45, // low capacity - good for receiving
        specialties: ['Pediatric Medicine', 'Vitamins', 'OTC']
    },
    {
        id: 'store_125',
        name: 'PharmaDash South - Las Piñas',
        location: 'Las Piñas',
        manager: 'Ana Garcia',
        address: 'Festival Mall, Las Piñas City',
        phone: '+63 2 8345 6789',
        current_capacity: 70,
        specialties: ['Senior Care', 'Chronic Disease Management', 'OTC']
    },
    {
        id: 'store_126',
        name: 'PharmaDash East - Pasig',
        location: 'Pasig City',
        manager: 'Carlos Dela Cruz',
        address: 'Eastwood City, Pasig',
        phone: '+63 2 8456 7890',
        current_capacity: 90, // high capacity - not ideal for receiving
        specialties: ['Business District', 'Executive Health', 'Prescription']
    }
];
const EXPIRING_MEDICINES = [
    {
        id: 'store_123:paracetamol_500_tab_10s',
        product_id: 'store_123:paracetamol_500_tab_10s',
        batch_id: 'store_123:PARA500T10:LOT2025A',
        store_id: 'store_123',
        brand: 'Biogesic',
        generic: 'Paracetamol',
        form: 'tablet',
        strength: '500mg',
        pack_size: 10,
        lot_no: 'LOT2025A',
        expiry: '2026-03-31',
        qty_on_hand: 420,
        unit_cost: 17.0, // More realistic Philippine pricing
        srp: 25.0,
        days_to_expiry: 85,
        expiry_bucket: '90d',
        estimated_value: 7140.00, // 420 * 17.0
        reason: ['slow_mover', 'overstocked'],
        supplier: 'Unilab Philippines'
    },
    {
        id: 'store_123:amoxicillin_500_cap_21s',
        product_id: 'store_123:amoxicillin_500_cap_21s',
        batch_id: 'store_123:AMOXI500C21:LOT2025B',
        store_id: 'store_123',
        brand: 'Amoxil',
        generic: 'Amoxicillin',
        form: 'capsule',
        strength: '500mg',
        pack_size: 21,
        lot_no: 'LOT2025B',
        expiry: '2026-02-15',
        qty_on_hand: 180,
        unit_cost: 125.0, // Prescription medicine - higher cost
        srp: 187.50,
        days_to_expiry: 41,
        expiry_bucket: '60d',
        estimated_value: 22500.00,
        reason: ['approaching_expiry', 'high_value'],
        supplier: 'Pfizer Philippines'
    },
    {
        id: 'store_124:cetirizine_10_tab_10s',
        product_id: 'store_124:cetirizine_10_tab_10s',
        batch_id: 'store_124:CETI10T10:LOT2025C',
        store_id: 'store_124',
        brand: 'Zyrtec',
        generic: 'Cetirizine',
        form: 'tablet',
        strength: '10mg',
        pack_size: 10,
        lot_no: 'LOT2025C',
        expiry: '2026-04-20',
        qty_on_hand: 95,
        unit_cost: 80.0, // Antihistamine
        srp: 120.0,
        days_to_expiry: 112,
        expiry_bucket: '90d',
        estimated_value: 7600.00,
        reason: ['branch_oversupply', 'seasonal_demand_drop'],
        supplier: 'Johnson & Johnson Philippines'
    },
    {
        id: 'store_125:loperamide_2_cap_10s',
        product_id: 'store_125:loperamide_2_cap_10s',
        batch_id: 'store_125:LOPER2C10:LOT2025D',
        store_id: 'store_125',
        brand: 'Imodium',
        generic: 'Loperamide HCl',
        form: 'capsule',
        strength: '2mg',
        pack_size: 10,
        lot_no: 'LOT2025D',
        expiry: '2025-12-31',
        qty_on_hand: 240,
        unit_cost: 45.0,
        srp: 67.50,
        days_to_expiry: 22, // Very urgent
        expiry_bucket: '30d',
        estimated_value: 10800.00,
        reason: ['critical_expiry', 'overstocked', 'slow_mover'],
        supplier: 'Johnson & Johnson Philippines'
    },
    {
        id: 'store_126:metformin_500_tab_30s',
        product_id: 'store_126:metformin_500_tab_30s',
        batch_id: 'store_126:METF500T30:LOT2025E',
        store_id: 'store_126',
        brand: 'Glucophage',
        generic: 'Metformin HCl',
        form: 'tablet',
        strength: '500mg',
        pack_size: 30,
        lot_no: 'LOT2025E',
        expiry: '2026-01-15',
        qty_on_hand: 150,
        unit_cost: 220.0, // Diabetes medication - chronic care
        srp: 330.0,
        days_to_expiry: 47,
        expiry_bucket: '60d',
        estimated_value: 33000.00, // High value item
        reason: ['approaching_expiry', 'chronic_medication', 'high_demand_other_branches'],
        supplier: 'Merck Philippines'
    },
    {
        id: 'store_123:ascorbic_acid_500_tab_100s',
        product_id: 'store_123:ascorbic_acid_500_tab_100s',
        batch_id: 'store_123:ASC500T100:LOT2025F',
        store_id: 'store_123',
        brand: 'Conzace',
        generic: 'Ascorbic Acid',
        form: 'tablet',
        strength: '500mg',
        pack_size: 100,
        lot_no: 'LOT2025F',
        expiry: '2026-06-30',
        qty_on_hand: 300,
        unit_cost: 35.0, // Vitamin - lower cost
        srp: 52.50,
        days_to_expiry: 273,
        expiry_bucket: '90d', // Still good time but overstocked
        estimated_value: 10500.00,
        reason: ['overstocked', 'seasonal_oversupply', 'vitamin_category'],
        supplier: 'Unilab Philippines'
    }
];
const REDISTRIBUTION_REQUESTS = [
    {
        id: 'REQ_001',
        requesting_store: 'store_124',
        requesting_store_name: 'PharmaDash North - Quezon City',
        product_id: 'store_124:paracetamol_500_tab_10s',
        brand: 'Biogesic',
        generic: 'Paracetamol',
        form: 'tablet',
        strength: '500mg',
        qty_needed: 200,
        urgency: 'High',
        reason: 'Stockout - High demand due to flu season in QC area',
        status: 'PENDING',
        created_at: '2025-09-28T14:30:00Z',
        current_stock: 15, // Very low stock
        weekly_demand: 180,
        requesting_manager: 'Jose Rivera'
    },
    {
        id: 'REQ_002',
        requesting_store: 'store_125',
        requesting_store_name: 'PharmaDash South - Las Piñas',
        product_id: 'store_125:amoxicillin_500_cap_21s',
        brand: 'Amoxil',
        generic: 'Amoxicillin',
        form: 'capsule',
        strength: '500mg',
        qty_needed: 100,
        urgency: 'Medium',
        reason: 'Low stock - Prescription demand increase due to respiratory infections',
        status: 'PENDING',
        created_at: '2025-09-29T09:15:00Z',
        current_stock: 45,
        weekly_demand: 85,
        requesting_manager: 'Ana Garcia'
    },
    {
        id: 'REQ_003',
        requesting_store: 'store_124',
        requesting_store_name: 'PharmaDash North - Quezon City',
        product_id: 'store_124:metformin_500_tab_30s',
        brand: 'Glucophage',
        generic: 'Metformin HCl',
        form: 'tablet',
        strength: '500mg',
        qty_needed: 75,
        urgency: 'High',
        reason: 'Critical - Diabetic patients need continuous supply, supplier delayed',
        status: 'PENDING',
        created_at: '2025-09-29T11:45:00Z',
        current_stock: 8, // Critical low
        weekly_demand: 65,
        requesting_manager: 'Jose Rivera'
    }
];
const REDISTRIBUTION_PROPOSALS = [
    {
        id: 'PROP_001',
        source_store: 'store_123',
        source_store_name: 'PharmaDash Main - Makati',
        target_store: 'store_124',
        target_store_name: 'PharmaDash North - Quezon City',
        product_id: 'store_123:paracetamol_500_tab_10s',
        brand: 'Biogesic',
        generic: 'Paracetamol',
        batch_id: 'store_123:PARA500T10:LOT2025A',
        qty_proposed: 200,
        days_to_expiry: 85,
        estimated_savings: 3400.00, // (200 * 17.0) potential loss avoided
        transport_cost: 150.00, // Realistic Metro Manila transport
        net_benefit: 3250.00,
        compatibility_score: 95, // High compatibility - same brand, good demand
        status: 'PROPOSED',
        ai_reasoning: ['High demand match', 'Same supplier preference', 'Adequate shelf life', 'Geographic proximity']
    },
    {
        id: 'PROP_002',
        source_store: 'store_126',
        source_store_name: 'PharmaDash East - Pasig',
        target_store: 'store_124',
        target_store_name: 'PharmaDash North - Quezon City',
        product_id: 'store_126:metformin_500_tab_30s',
        brand: 'Glucophage',
        generic: 'Metformin HCl',
        batch_id: 'store_126:METF500T30:LOT2025E',
        qty_proposed: 75,
        days_to_expiry: 47,
        estimated_savings: 16500.00, // (75 * 220.0) high-value medicine
        transport_cost: 200.00,
        net_benefit: 16300.00,
        compatibility_score: 98, // Very high - critical medicine match
        status: 'PROPOSED',
        ai_reasoning: ['Critical patient need', 'High-value preservation', 'Chronic medication continuity', 'Perfect demand match']
    },
    {
        id: 'PROP_003',
        source_store: 'store_125',
        source_store_name: 'PharmaDash South - Las Piñas',
        target_store: 'store_126',
        target_store_name: 'PharmaDash East - Pasig',
        product_id: 'store_125:loperamide_2_cap_10s',
        brand: 'Imodium',
        generic: 'Loperamide HCl',
        batch_id: 'store_125:LOPER2C10:LOT2025D',
        qty_proposed: 120, // Half of the expiring stock
        days_to_expiry: 22,
        estimated_savings: 5400.00, // (120 * 45.0) urgent transfer needed
        transport_cost: 180.00,
        net_benefit: 5220.00,
        compatibility_score: 78, // Medium-high - urgent but business district has different profile
        status: 'PROPOSED',
        ai_reasoning: ['Critical expiry urgency', 'Business district demand', 'Prevent total loss', 'Some compatibility concerns']
    }
];
function RedistributionPage() {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('expiring');
    const [selectedMedicine, setSelectedMedicine] = (0, react_1.useState)(null);
    const [redistributionActions, setRedistributionActions] = (0, react_1.useState)([
        // Sample completed actions to show history
        {
            id: 'HIST_001',
            store_id: 'store_123',
            batch_id: 'store_123:IBUPROFEN400T20:LOT2024Z',
            action: 'REDISTRIBUTE',
            target: {
                store_id: 'store_125',
                store_name: 'PharmaDash South - Las Piñas'
            },
            qty: 150,
            decision_basis: ['approaching_expiry', 'high_demand_match'],
            estimated_cost_savings: 4500.00,
            status: 'COMPLETED',
            ts: '2025-09-25T10:30:00Z'
        },
        {
            id: 'HIST_002',
            store_id: 'store_124',
            batch_id: 'store_124:VITAMINS_MULT:LOT2024Y',
            action: 'DONATE',
            target: {
                partner_id: 'lgu_quezon',
                partner_name: 'Quezon City Health Department'
            },
            qty: 200,
            decision_basis: ['slow_mover', 'community_benefit', 'tax_advantage'],
            estimated_cost_savings: 800.00,
            status: 'COMPLETED',
            ts: '2025-09-26T14:15:00Z'
        }
    ]);
    const [showActionModal, setShowActionModal] = (0, react_1.useState)(false);
    // Calculate total value at risk
    const totalValueAtRisk = EXPIRING_MEDICINES.reduce((sum, med) => sum + med.estimated_value, 0);
    const totalPacks = EXPIRING_MEDICINES.reduce((sum, med) => sum + med.qty_on_hand, 0);
    const handleRedistributeAction = (medicine, targetStore, qty) => {
        const action = {
            id: `REDIST_${Date.now()}`,
            store_id: medicine.store_id,
            batch_id: medicine.batch_id,
            action: 'REDISTRIBUTE',
            target: {
                store_id: targetStore,
                store_name: PHARMACY_BRANCHES.find(b => b.id === targetStore)?.name || 'Unknown Store'
            },
            qty: qty,
            decision_basis: medicine.reason,
            estimated_cost_savings: qty * medicine.unit_cost * 0.85, // Assume 85% value recovery
            status: 'PROPOSED',
            ts: new Date().toISOString()
        };
        setRedistributionActions([...redistributionActions, action]);
        setShowActionModal(false);
    };
    const handleDonateAction = (medicine, partner, qty) => {
        const action = {
            id: `DONATE_${Date.now()}`,
            store_id: medicine.store_id,
            batch_id: medicine.batch_id,
            action: 'DONATE',
            target: {
                partner_id: partner,
                partner_name: partner === 'lgu_makati' ? 'Makati Health Center' :
                    partner === 'ngp_redcross' ? 'Philippine Red Cross' : 'Community Health Clinic'
            },
            qty: qty,
            decision_basis: [...medicine.reason, 'community_benefit'],
            estimated_cost_savings: qty * medicine.unit_cost * 0.15, // Tax benefit estimate
            status: 'PROPOSED',
            ts: new Date().toISOString()
        };
        setRedistributionActions([...redistributionActions, action]);
        setShowActionModal(false);
    };
    const ExpiringMedicinesTab = () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-red-800", children: "Total Value at Risk" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-red-900", children: ["\u20B1", totalValueAtRisk.toLocaleString()] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-red-600", children: [totalPacks, " packs expiring soon"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-orange-50 border border-orange-200 rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-orange-800", children: "\u226430 Days" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-orange-900", children: EXPIRING_MEDICINES.filter(m => m.days_to_expiry <= 30).length }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-orange-600", children: "Critical priority" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-yellow-800", children: "\u226460 Days" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-yellow-900", children: EXPIRING_MEDICINES.filter(m => m.days_to_expiry <= 60 && m.days_to_expiry > 30).length }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-yellow-600", children: "High priority" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-blue-800", children: "\u226490 Days" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-blue-900", children: EXPIRING_MEDICINES.filter(m => m.days_to_expiry <= 90 && m.days_to_expiry > 60).length }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-blue-600", children: "Medium priority" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-b", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: "Medicines Requiring Action" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Prioritized by expiry date and value at risk" })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Medicine" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Store" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Batch/Expiry" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Stock & Value" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Days Left" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Reason" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-gray-200", children: EXPIRING_MEDICINES.map((medicine) => ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: medicine.brand }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-500", children: [medicine.generic, " ", medicine.strength] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-400", children: [medicine.form, " \u2022 Pack of ", medicine.pack_size] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-900", children: PHARMACY_BRANCHES.find(b => b.id === medicine.store_id)?.name || 'Unknown' }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-900", children: ["Lot: ", medicine.lot_no] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: medicine.expiry })] }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-medium text-gray-900", children: [medicine.qty_on_hand, " packs"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-500", children: ["\u20B1", medicine.estimated_value.toLocaleString()] })] }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${medicine.days_to_expiry <= 30 ? 'bg-red-100 text-red-800' :
                                                        medicine.days_to_expiry <= 60 ? 'bg-orange-100 text-orange-800' :
                                                            'bg-yellow-100 text-yellow-800'}`, children: [medicine.days_to_expiry, " days"] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: medicine.reason.map((r, idx) => ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded", children: r.replace('_', ' ') }, idx))) }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                        setSelectedMedicine(medicine);
                                                        setShowActionModal(true);
                                                    }, className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "Take Action" }) })] }, medicine.id))) })] }) })] })] }));
    const RequestsTab = () => ((0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-b", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: "Redistribution Requests from Other Branches" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Other pharmacy branches requesting medicines" })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Requesting Store" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Medicine Needed" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Quantity" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Urgency" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Reason" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-gray-200", children: REDISTRIBUTION_REQUESTS.map((request) => ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-gray-900", children: request.requesting_store_name }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: new Date(request.created_at).toLocaleDateString() })] }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-900", children: request.brand }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-500", children: [request.generic, " ", request.strength] })] }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-medium text-gray-900", children: [request.qty_needed, " packs needed"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["Current: ", request.current_stock, " packs"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["Weekly demand: ", request.weekly_demand] })] }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${request.urgency === 'High' ? 'bg-red-100 text-red-800' :
                                                    request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'}`, children: request.urgency }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-700", children: request.reason }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800", children: request.status }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { className: "text-green-600 hover:text-green-800 text-sm font-medium", children: "Approve" }), (0, jsx_runtime_1.jsx)("button", { className: "text-gray-600 hover:text-gray-800 text-sm font-medium", children: "Counter" })] }) })] }, request.id))) })] }) })] }) }));
    const ProposalsTab = () => ((0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-b", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: "AI-Generated Redistribution Proposals" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Smart matching of expiring inventory with branch needs" })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Transfer Route" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Medicine" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Quantity" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Days Left" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Financial Impact" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Compatibility" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-gray-200", children: REDISTRIBUTION_PROPOSALS.map((proposal) => ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium text-gray-900", children: ["From: ", proposal.source_store_name] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-gray-500", children: ["To: ", proposal.target_store_name] })] }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-6 py-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-900", children: proposal.brand }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: proposal.generic })] }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-medium text-gray-900", children: [proposal.qty_proposed, " packs"] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800", children: [proposal.days_to_expiry, " days"] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium text-green-600", children: ["+\u20B1", proposal.net_benefit.toFixed(2)] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["Save \u20B1", proposal.estimated_savings.toFixed(2), " - Cost \u20B1", proposal.transport_cost.toFixed(2)] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2 mr-2", children: (0, jsx_runtime_1.jsx)("div", { className: `h-2 rounded-full ${proposal.compatibility_score >= 90 ? 'bg-green-500' :
                                                                        proposal.compatibility_score >= 80 ? 'bg-yellow-500' : 'bg-orange-500'}`, style: { width: `${proposal.compatibility_score}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: [proposal.compatibility_score, "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["AI Factors: ", proposal.ai_reasoning?.slice(0, 2).join(', '), proposal.ai_reasoning && proposal.ai_reasoning.length > 2 && '...'] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { className: "text-green-600 hover:text-green-800 text-sm font-medium", children: "Approve" }), (0, jsx_runtime_1.jsx)("button", { className: "text-gray-600 hover:text-gray-800 text-sm font-medium", children: "Modify" })] }) })] }, proposal.id))) })] }) })] }) }));
    // Action Modal Component
    const ActionModal = () => {
        if (!showActionModal || !selectedMedicine)
            return null;
        return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-b", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold", children: ["Take Action - ", selectedMedicine.brand] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: [selectedMedicine.qty_on_hand, " packs \u2022 Expires in ", selectedMedicine.days_to_expiry, " days \u2022 Value: \u20B1", selectedMedicine.estimated_value.toLocaleString()] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-green-800 mb-3", children: "\uD83D\uDD04 Redistribute to Another Branch" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: "Transfer to a branch that needs this medicine" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: PHARMACY_BRANCHES.filter(b => b.id !== selectedMedicine.store_id).map(branch => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: branch.name }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600", children: [branch.location, " \u2022 Manager: ", branch.manager] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleRedistributeAction(selectedMedicine, branch.id, Math.min(selectedMedicine.qty_on_hand, 200)), className: "px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700", children: "Transfer" })] }, branch.id))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-blue-800 mb-3", children: "\u2764\uFE0F Donate to Community Partners" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: "Donate to health centers, NGOs, or community clinics" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: [
                                            { id: 'lgu_makati', name: 'Makati Health Center', type: 'Local Government Unit' },
                                            { id: 'ngp_redcross', name: 'Philippine Red Cross', type: 'NGO' },
                                            { id: 'clinic_community', name: 'Community Health Clinic', type: 'Private Partnership' }
                                        ].map(partner => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: partner.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: partner.type })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDonateAction(selectedMedicine, partner.id, Math.min(selectedMedicine.qty_on_hand, 100)), className: "px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700", children: "Donate" })] }, partner.id))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-orange-800 mb-3", children: "\uD83D\uDCE6 Return to Supplier" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: "Return unused medicines to the original supplier" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: "Original Supplier Return" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "Check return policy and generate return documents" })] }), (0, jsx_runtime_1.jsx)("button", { className: "px-4 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700", children: "Process Return" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-6 py-4 border-t bg-gray-50 flex justify-end", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => setShowActionModal(false), className: "px-4 py-2 text-gray-600 hover:text-gray-800", children: "Cancel" }) })] }) }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white border-b", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsx)("div", { className: "py-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4 mb-2", children: [(0, jsx_runtime_1.jsx)("a", { href: "/dashboard", className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "\u2190 Back to Dashboard" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-300", children: "|" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: "PharmaDash Multi-Branch Network" })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Medicine Redistribution Center" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Manage expiring inventory through redistribution, donation, and returns" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "Current Store" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: "PharmaDash Main - Makati" }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: "Manager: Maria Santos" })] })] }) }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-gray-200", children: (0, jsx_runtime_1.jsx)("nav", { className: "-mb-px flex space-x-8", children: [
                                { id: 'expiring', label: 'Expiring Medicines', count: EXPIRING_MEDICINES.length },
                                { id: 'requests', label: 'Redistribution Requests', count: REDISTRIBUTION_REQUESTS.length },
                                { id: 'proposals', label: 'AI Proposals', count: REDISTRIBUTION_PROPOSALS.length },
                                { id: 'history', label: 'Action History', count: redistributionActions.length }
                            ].map((tab) => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSelectedTab(tab.id), className: `py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [tab.label, tab.count > 0 && ((0, jsx_runtime_1.jsx)("span", { className: `ml-2 py-0.5 px-2 rounded-full text-xs ${selectedTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`, children: tab.count }))] }, tab.id))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "py-6", children: [selectedTab === 'expiring' && (0, jsx_runtime_1.jsx)(ExpiringMedicinesTab, {}), selectedTab === 'requests' && (0, jsx_runtime_1.jsx)(RequestsTab, {}), selectedTab === 'proposals' && (0, jsx_runtime_1.jsx)(ProposalsTab, {}), selectedTab === 'history' && ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Action History" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: redistributionActions.length === 0
                                            ? "No redistribution actions taken yet"
                                            : `${redistributionActions.length} actions recorded` }), redistributionActions.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "mt-6 space-y-4", children: redistributionActions.map((action) => ((0, jsx_runtime_1.jsx)("div", { className: "bg-white p-4 rounded-lg border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h4", { className: "font-medium", children: [action.action, " - ", action.qty, " packs"] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: ["To: ", action.target.store_name || action.target.partner_name] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: ["Estimated savings: \u20B1", action.estimated_cost_savings.toFixed(2)] })] }), (0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800", children: action.status })] }) }, action.id))) }))] }))] })] }), (0, jsx_runtime_1.jsx)(ActionModal, {})] }));
}
//# sourceMappingURL=page.js.map