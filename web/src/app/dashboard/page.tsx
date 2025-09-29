"use client";

import { useState } from "react";

export default function Page() {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to make API calls
  const handleApiCall = async (endpoint: string, method: string = 'GET', body?: any) => {
    console.log(`🚀 [Dashboard] Starting ${method} request to ${endpoint}`);
    
    setLoading(true);
    setError(null);
    
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
        console.log('📤 [Dashboard] Request body:', JSON.stringify(body, null, 2));
      }

      console.log('🔄 [Dashboard] Making fetch request...');
      const response = await fetch(endpoint, options);
      
      console.log(`📡 [Dashboard] Response status: ${response.status} ${response.statusText}`);
      console.log(`📡 [Dashboard] Response headers:`, Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error(`❌ [Dashboard] HTTP error! status: ${response.status}`);
        const errorText = await response.text();
        console.error(`❌ [Dashboard] Error response body:`, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      console.log('📥 [Dashboard] Parsing JSON response...');
      const data = await response.json();
      console.log('📦 [Dashboard] Response data:', data);
      
      setResponseData(data);
      console.log('✅ [Dashboard] API call completed successfully');
      
    } catch (err) {
      console.error('❌ [Dashboard] Error in API call:');
      console.error('Error details:', err);
      console.error('Error name:', err instanceof Error ? err.name : 'Unknown');
      console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
      
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error(`❌ [Dashboard] Setting error state: ${errorMessage}`);
      
    } finally {
      setLoading(false);
      console.log('🏁 [Dashboard] API call finished (loading set to false)');
    }
  };

  // Sample data for POST requests
  const sampleProductData = {
    sku: "PARA500T10",
    barcode: "4801234567890",
    brand: "Biogesic",
    generic: "Paracetamol",
    form: "tablet",
    strength: "500mg",
    pack_size: 10,
    rx_flag: false,
    pricing: { srp: 2.5, cost: 1.7, markup_pct: 47.1, tax_code: "VAT12" },
    replenishment: { rop: 50, roq: 200, min: 50, max: 800 },
    supplier_refs: [{ supplier_id: "sup_unilab", lead_days: 3, moq: 100 }]
  };

  const sampleStockReceiveData = {
    po_id: "store_123:PO00087",
    supplier_id: "sup_unilab",
    lines: [{
      product_id: "store_123:paracetamol_500_tab_10s",
      lot_no: "LOT2025A",
      expiry: "2026-03-31",
      qty_received: 500,
      unit_cost: 1.7
    }],
    received_by: "user_pharmacy"
  };

  const sampleStockAdjustData = {
    product_id: "store_123:paracetamol_500_tab_10s",
    batch_id: "store_123:PARA500T10:LOT2025A",
    adjustment_type: "DAMAGE",
    quantity_change: -10,
    reason: "Damaged during transport",
    adjusted_by: "user_pharmacy"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">PharmaDash API Dashboard</h1>
        
        {/* Products API Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products API</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Products CRUD Operations */}
            <button
              onClick={() => handleApiCall('/api/products')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              GET Products
            </button>
            <button
              onClick={() => handleApiCall('/api/products', 'POST', sampleProductData)}
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              POST Product
            </button>
            <button
              onClick={() => handleApiCall('/api/products/store_123:paracetamol_500_tab_10s')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              GET Product by ID
            </button>
            <button
              onClick={() => handleApiCall('/api/products/store_123:paracetamol_500_tab_10s', 'PUT', sampleProductData)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              PUT Product
            </button>
            
            {/* Products Search & Barcodes */}
            <button
              onClick={() => handleApiCall('/api/products/search?q=paracetamol')}
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              Search Products
            </button>
            <button
              onClick={() => handleApiCall('/api/products/store_123:paracetamol_500_tab_10s/barcodes')}
              className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              GET Product Barcodes
            </button>
          </div>
        </div>

        {/* Stock API Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stock Operations API</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Stock Operations */}
            <button
              onClick={() => handleApiCall('/api/stock/receive', 'POST', sampleStockReceiveData)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              POST Stock Receive
            </button>
            <button
              onClick={() => handleApiCall('/api/stock/adjust', 'POST', sampleStockAdjustData)}
              className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              POST Stock Adjust
            </button>
            <button
              onClick={() => handleApiCall('/api/stock/return-to-supplier', 'POST', {
                supplier_id: "sup_unilab",
                return_type: "EXPIRED",
                lines: [{
                  batch_id: "store_123:PARA500T10:LOT2025A",
                  product_id: "store_123:paracetamol_500_tab_10s",
                  quantity: 50,
                  reason: "Approaching expiry date"
                }],
                requested_by: "user_pharmacy"
              })}
              className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              POST Return to Supplier
            </button>
            <button
              onClick={() => handleApiCall('/api/stock/customer-return', 'POST', {
                return_type: "DEFECTIVE",
                lines: [{
                  product_id: "store_123:paracetamol_500_tab_10s",
                  quantity: 1,
                  unit_price: 2.5,
                  reason: "Broken tablets"
                }],
                action: "REFUND"
              })}
              className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              POST Customer Return
            </button>
            <button
              onClick={() => handleApiCall('/api/stock/cycle-count', 'POST', {
                count_date: "2025-09-29",
                counted_by: "user_pharmacy",
                count_type: "PARTIAL",
                items: [{
                  product_id: "store_123:paracetamol_500_tab_10s",
                  system_qty: 420,
                  counted_qty: 415,
                  variance: -5
                }]
              })}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              POST Cycle Count
            </button>
            <button
              onClick={() => handleApiCall('/api/stock/movements')}
              className="bg-slate-500 hover:bg-slate-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              GET Stock Movements
            </button>
            <button
              onClick={() => handleApiCall('/api/stock/movements?product_id=store_123:paracetamol_500_tab_10s&limit=10')}
              className="bg-stone-500 hover:bg-stone-600 text-white p-4 rounded-lg shadow transition-colors"
            >
              GET Filtered Movements
            </button>
          </div>
        </div>

        {/* Response Display Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">API Response</h3>
            {responseData && (
              <button
                onClick={() => setResponseData(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">Error:</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {responseData && !loading && (
            <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
          
          {!loading && !error && !responseData && (
            <div className="text-center text-gray-500 py-8">
              Click any button above to test an API endpoint
            </div>
          )}
        </div>

        {/* API Documentation Links */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">API Documentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Products API Endpoints:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <code>GET /api/products</code> - List all products</li>
                <li>• <code>POST /api/products</code> - Create new product</li>
                <li>• <code>GET /api/products/[id]</code> - Get product by ID</li>
                <li>• <code>PUT /api/products/[id]</code> - Update product</li>
                <li>• <code>GET /api/products/search</code> - Search products</li>
                <li>• <code>GET /api/products/[id]/barcodes</code> - Get barcodes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Stock Operations API Endpoints:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <code>POST /api/stock/receive</code> - Receive goods against PO</li>
                <li>• <code>POST /api/stock/adjust</code> - Stock adjustments</li>
                <li>• <code>POST /api/stock/return-to-supplier</code> - Return to supplier</li>
                <li>• <code>POST /api/stock/customer-return</code> - Customer returns</li>
                <li>• <code>POST /api/stock/cycle-count</code> - Cycle count results</li>
                <li>• <code>GET /api/stock/movements</code> - Stock movement history</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
