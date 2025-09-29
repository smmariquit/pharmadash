"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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

interface RedistributionAction {
  id: string;
  store_id: string;
  batch_id: string;
  action: 'REDISTRIBUTE' | 'DONATE' | 'RETURN';
  target: {
    store_id?: string;
    store_name?: string;
    partner_id?: string;
    partner_name?: string;
    supplier_id?: string;
  };
  qty: number;
  decision_basis: string[];
  estimated_cost_savings: number;
  status: 'PROPOSED' | 'APPROVED' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
  ts: string;
}

export default function RedistributionPage() {
  const [selectedTab, setSelectedTab] = useState<'expiring' | 'requests' | 'proposals' | 'history'>('expiring');
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [redistributionActions, setRedistributionActions] = useState<RedistributionAction[]>([
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
  const [showActionModal, setShowActionModal] = useState(false);

  // Calculate total value at risk
  const totalValueAtRisk = EXPIRING_MEDICINES.reduce((sum, med) => sum + med.estimated_value, 0);
  const totalPacks = EXPIRING_MEDICINES.reduce((sum, med) => sum + med.qty_on_hand, 0);

  const handleRedistributeAction = (medicine: any, targetStore: string, qty: number) => {
    const action: RedistributionAction = {
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

  const handleDonateAction = (medicine: any, partner: string, qty: number) => {
    const action: RedistributionAction = {
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

  const ExpiringMedicinesTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800">Total Value at Risk</h3>
          <p className="text-2xl font-bold text-red-900">₱{totalValueAtRisk.toLocaleString()}</p>
          <p className="text-xs text-red-600">{totalPacks} packs expiring soon</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-orange-800">≤30 Days</h3>
          <p className="text-2xl font-bold text-orange-900">
            {EXPIRING_MEDICINES.filter(m => m.days_to_expiry <= 30).length}
          </p>
          <p className="text-xs text-orange-600">Critical priority</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800">≤60 Days</h3>
          <p className="text-2xl font-bold text-yellow-900">
            {EXPIRING_MEDICINES.filter(m => m.days_to_expiry <= 60 && m.days_to_expiry > 30).length}
          </p>
          <p className="text-xs text-yellow-600">High priority</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800">≤90 Days</h3>
          <p className="text-2xl font-bold text-blue-900">
            {EXPIRING_MEDICINES.filter(m => m.days_to_expiry <= 90 && m.days_to_expiry > 60).length}
          </p>
          <p className="text-xs text-blue-600">Medium priority</p>
        </div>
      </div>

      {/* Expiring Medicines Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Medicines Requiring Action</h2>
          <p className="text-sm text-gray-600">Prioritized by expiry date and value at risk</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch/Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock & Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Left</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {EXPIRING_MEDICINES.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{medicine.brand}</div>
                      <div className="text-sm text-gray-500">{medicine.generic} {medicine.strength}</div>
                      <div className="text-xs text-gray-400">{medicine.form} • Pack of {medicine.pack_size}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {PHARMACY_BRANCHES.find(b => b.id === medicine.store_id)?.name || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Lot: {medicine.lot_no}</div>
                    <div className="text-sm text-gray-500">{medicine.expiry}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{medicine.qty_on_hand} packs</div>
                    <div className="text-sm text-gray-500">₱{medicine.estimated_value.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      medicine.days_to_expiry <= 30 ? 'bg-red-100 text-red-800' :
                      medicine.days_to_expiry <= 60 ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {medicine.days_to_expiry} days
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {medicine.reason.map((r, idx) => (
                        <span key={idx} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {r.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedMedicine(medicine);
                        setShowActionModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Take Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const RequestsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Redistribution Requests from Other Branches</h2>
          <p className="text-sm text-gray-600">Other pharmacy branches requesting medicines</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requesting Store</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine Needed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {REDISTRIBUTION_REQUESTS.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{request.requesting_store_name}</div>
                    <div className="text-xs text-gray-500">{new Date(request.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{request.brand}</div>
                    <div className="text-sm text-gray-500">{request.generic} {request.strength}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{request.qty_needed} packs needed</div>
                    <div className="text-xs text-gray-500">Current: {request.current_stock} packs</div>
                    <div className="text-xs text-gray-500">Weekly demand: {request.weekly_demand}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      request.urgency === 'High' ? 'bg-red-100 text-red-800' :
                      request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{request.reason}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Approve
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Counter
                      </button>
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

  const ProposalsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">AI-Generated Redistribution Proposals</h2>
          <p className="text-sm text-gray-600">Smart matching of expiring inventory with branch needs</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transfer Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Left</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Financial Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compatibility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {REDISTRIBUTION_PROPOSALS.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">From: {proposal.source_store_name}</div>
                      <div className="text-gray-500">To: {proposal.target_store_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{proposal.brand}</div>
                    <div className="text-sm text-gray-500">{proposal.generic}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{proposal.qty_proposed} packs</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {proposal.days_to_expiry} days
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-green-600">+₱{proposal.net_benefit.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        Save ₱{proposal.estimated_savings.toFixed(2)} - Cost ₱{proposal.transport_cost.toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              proposal.compatibility_score >= 90 ? 'bg-green-500' :
                              proposal.compatibility_score >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${proposal.compatibility_score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{proposal.compatibility_score}%</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        AI Factors: {proposal.ai_reasoning?.slice(0, 2).join(', ')}
                        {proposal.ai_reasoning && proposal.ai_reasoning.length > 2 && '...'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Approve
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Modify
                      </button>
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

  // Action Modal Component
  const ActionModal = () => {
    if (!showActionModal || !selectedMedicine) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Take Action - {selectedMedicine.brand}</h3>
            <p className="text-sm text-gray-600">
              {selectedMedicine.qty_on_hand} packs • Expires in {selectedMedicine.days_to_expiry} days • 
              Value: ₱{selectedMedicine.estimated_value.toLocaleString()}
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Redistribute Option */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-3">🔄 Redistribute to Another Branch</h4>
              <p className="text-sm text-gray-600 mb-4">Transfer to a branch that needs this medicine</p>
              
              <div className="space-y-3">
                {PHARMACY_BRANCHES.filter(b => b.id !== selectedMedicine.store_id).map(branch => (
                  <div key={branch.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-gray-600">{branch.location} • Manager: {branch.manager}</div>
                    </div>
                    <button
                      onClick={() => handleRedistributeAction(selectedMedicine, branch.id, Math.min(selectedMedicine.qty_on_hand, 200))}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Transfer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Donate Option */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">❤️ Donate to Community Partners</h4>
              <p className="text-sm text-gray-600 mb-4">Donate to health centers, NGOs, or community clinics</p>
              
              <div className="space-y-3">
                {[
                  { id: 'lgu_makati', name: 'Makati Health Center', type: 'Local Government Unit' },
                  { id: 'ngp_redcross', name: 'Philippine Red Cross', type: 'NGO' },
                  { id: 'clinic_community', name: 'Community Health Clinic', type: 'Private Partnership' }
                ].map(partner => (
                  <div key={partner.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-gray-600">{partner.type}</div>
                    </div>
                    <button
                      onClick={() => handleDonateAction(selectedMedicine, partner.id, Math.min(selectedMedicine.qty_on_hand, 100))}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Donate
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Return to Supplier Option */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-orange-800 mb-3">📦 Return to Supplier</h4>
              <p className="text-sm text-gray-600 mb-4">Return unused medicines to the original supplier</p>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Original Supplier Return</div>
                  <div className="text-sm text-gray-600">Check return policy and generate return documents</div>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                  Process Return
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
            <button
              onClick={() => setShowActionModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

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
                  <span className="text-sm text-gray-600">PharmaDash Multi-Branch Network</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Medicine Redistribution Center</h1>
                <p className="text-gray-600">Manage expiring inventory through redistribution, donation, and returns</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Store</div>
                <div className="font-medium text-gray-900">PharmaDash Main - Makati</div>
                <div className="text-xs text-gray-500">Manager: Maria Santos</div>
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
              { id: 'expiring', label: 'Expiring Medicines', count: EXPIRING_MEDICINES.length },
              { id: 'requests', label: 'Redistribution Requests', count: REDISTRIBUTION_REQUESTS.length },
              { id: 'proposals', label: 'AI Proposals', count: REDISTRIBUTION_PROPOSALS.length },
              { id: 'history', label: 'Action History', count: redistributionActions.length }
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
                {tab.count > 0 && (
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
          {selectedTab === 'expiring' && <ExpiringMedicinesTab />}
          {selectedTab === 'requests' && <RequestsTab />}
          {selectedTab === 'proposals' && <ProposalsTab />}
          {selectedTab === 'history' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Action History</h3>
              <p className="text-gray-600">
                {redistributionActions.length === 0 
                  ? "No redistribution actions taken yet" 
                  : `${redistributionActions.length} actions recorded`
                }
              </p>
              {redistributionActions.length > 0 && (
                <div className="mt-6 space-y-4">
                  {redistributionActions.map((action) => (
                    <div key={action.id} className="bg-white p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{action.action} - {action.qty} packs</h4>
                          <p className="text-sm text-gray-600">
                            To: {action.target.store_name || action.target.partner_name}
                          </p>
                          <p className="text-sm text-gray-500">Estimated savings: ₱{action.estimated_cost_savings.toFixed(2)}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {action.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal />
    </div>
  );
}