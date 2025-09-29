"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

interface LiveMetrics {
  totalSales: number;
  inventoryValue: number;
  lowStockItems: number;
  expiringItems: number;
  customerCount: number;
  avgTransactionValue: number;
  redistributionSavings: number;
  forecastAccuracy: number;
}

export default function DashboardPage() {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    totalSales: 145250,
    inventoryValue: 2850000,
    lowStockItems: 12,
    expiringItems: 8,
    customerCount: 89,
    avgTransactionValue: 485,
    redistributionSavings: 15400,
    forecastAccuracy: 87
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        totalSales: prev.totalSales + Math.floor(Math.random() * 500),
        customerCount: prev.customerCount + (Math.random() > 0.7 ? 1 : 0),
        avgTransactionValue: 450 + Math.floor(Math.random() * 200)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PharmaDash Management System</h1>
                <p className="text-gray-600">Philippine Pharmacy Operations Dashboard</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">PharmaDash Main - Makati</div>
                <div className="font-medium text-gray-900">Manager: Maria Santos</div>
                <div className="text-xs text-gray-500">{new Date().toLocaleDateString('en-PH', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Metrics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Live Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                  <p className="text-2xl font-bold text-green-600">₱{liveMetrics.totalSales.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{liveMetrics.customerCount} customers</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-blue-600">₱{(liveMetrics.inventoryValue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500">5,247 unique products</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Stock Alerts</p>
                  <p className="text-2xl font-bold text-orange-600">{liveMetrics.lowStockItems + liveMetrics.expiringItems}</p>
                  <p className="text-xs text-gray-500">{liveMetrics.lowStockItems} low stock, {liveMetrics.expiringItems} expiring</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-full">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
                  <p className="text-2xl font-bold text-purple-600">₱{liveMetrics.avgTransactionValue}</p>
                  <p className="text-xs text-gray-500">+12% vs yesterday</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <span className="text-2xl">🛒</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🏥 Pharmacy Management Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/pos" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-50 rounded-full mr-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Point of Sale</h3>
                    <p className="text-sm text-gray-600">Process sales & prescriptions</p>
                    <p className="text-xs text-green-600 font-medium mt-1">Real-time inventory updates</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/inventory" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-full mr-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Smart Inventory</h3>
                    <p className="text-sm text-gray-600">ABC analysis & insights</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">Fast/slow moving analytics</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/redistribution" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-50 rounded-full mr-4">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Redistribution</h3>
                    <p className="text-sm text-gray-600">Inter-branch transfers</p>
                    <p className="text-xs text-purple-600 font-medium mt-1">AI-powered proposals</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/forecast" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-50 rounded-full mr-4">
                    <span className="text-2xl">🌡️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Demand Forecasting</h3>
                    <p className="text-sm text-gray-600">External signals & predictions</p>
                    <p className="text-xs text-orange-600 font-medium mt-1">Weather, holidays, epidemics</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Performance Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Redistribution Savings</p>
                  <p className="text-2xl font-bold text-green-600">₱{liveMetrics.redistributionSavings.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <span className="text-xl">💚</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                  <p className="text-2xl font-bold text-blue-600">{liveMetrics.forecastAccuracy}%</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <span className="text-xl">🎯</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">FEFO Compliance</p>
                  <p className="text-2xl font-bold text-purple-600">98.5%</p>
                  <p className="text-xs text-gray-500">Expiry management</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <span className="text-xl">📋</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">DOH Compliance</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-xs text-gray-500">Prescription tracking</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Sales */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Recent Sales Activity</h3>
            <div className="space-y-3">
              {[
                { time: "2:34 PM", customer: "Maria C.", amount: 850, items: ["Paracetamol", "Vitamin C"], type: "OTC" },
                { time: "2:28 PM", customer: "Jose R.", amount: 1250, items: ["Amoxicillin", "Cough Syrup"], type: "Rx" },
                { time: "2:15 PM", customer: "Ana S.", amount: 450, items: ["Antacid", "Band-aids"], type: "OTC" },
                { time: "1:58 PM", customer: "Carlos D.", amount: 2100, items: ["Insulin", "Test Strips"], type: "Rx" },
                { time: "1:45 PM", customer: "Lisa M.", amount: 650, items: ["Multivitamins", "Omega-3"], type: "OTC" }
              ].map((sale, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${sale.type === 'Rx' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div>
                      <div className="font-medium text-sm">{sale.customer} - {sale.time}</div>
                      <div className="text-xs text-gray-500">{sale.items.join(", ")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">₱{sale.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{sale.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Inventory Alerts</h3>
            <div className="space-y-3">
              {[
                { product: "Paracetamol 500mg", stock: 15, reorder: 50, status: "Low Stock", urgency: "medium" },
                { product: "Amoxicillin 500mg", stock: 8, reorder: 30, status: "Critical", urgency: "high" },
                { product: "Ibuprofen 400mg", stock: 22, reorder: 40, status: "Low Stock", urgency: "low" },
                { product: "Cetirizine 10mg", stock: 5, reorder: 25, status: "Critical", urgency: "high" },
                { product: "Loperamide 2mg", stock: 45, reorder: 0, status: "Expiring Soon", urgency: "medium" }
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${alert.urgency === 'high' ? 'bg-red-500' :
                      alert.urgency === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-sm">{alert.product}</div>
                      <div className="text-xs text-gray-500">{alert.stock} units remaining</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${alert.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      alert.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>PharmaDash Management System • Philippine Pharmacy Operations • Compliant with DOH Regulations</p>
        </div>
      </div>
    </div>
  );
}


