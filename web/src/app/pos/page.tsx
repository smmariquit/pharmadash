"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Types based on PRD data model
interface Product {
  id: string;
  store_id: string;
  sku: string;
  barcode: string;
  brand: string;
  generic: string;
  form: string;
  strength: string;
  pack_size: number;
  rx_flag: boolean;
  pricing: {
    srp: number;
    cost: number;
    markup_pct: number;
    tax_code: string;
  };
  stock_cache: {
    current_on_hand: number;
    last_updated: string;
  };
  substitutes?: string[];
}

interface Batch {
  id: string;
  store_id: string;
  product_id: string;
  lot_no: string;
  expiry: string;
  unit_cost: number;
  qty_on_hand: number;
  received_at: number;
  po_id: string;
}

interface SaleLineItem {
  product_id: string;
  batch_id: string;
  product_name: string;
  qty: number;
  unit_price: number;
  discount: number;
  subtotal: number;
  is_prescription: boolean;
  expiry_warning?: boolean;
}

interface Customer {
  phone?: string;
  name?: string;
  is_senior: boolean;
  is_pwd: boolean;
  discount_id?: string;
}

// Hardcoded inventory data based on PRD requirements
const PRODUCTS: Product[] = [
  {
    id: "store_123:paracetamol_500_tab_10s",
    store_id: "store_123",
    sku: "PARA500T10",
    barcode: "4801234567890",
    brand: "Biogesic",
    generic: "Paracetamol",
    form: "tablet",
    strength: "500mg",
    pack_size: 10,
    rx_flag: false,
    pricing: { srp: 25.0, cost: 17.0, markup_pct: 47.1, tax_code: "VAT12" },
    stock_cache: { current_on_hand: 420, last_updated: "2025-09-29T10:00:00Z" },
    substitutes: ["store_123:acetaminophen_500_tab_10s"]
  },
  {
    id: "store_123:amoxicillin_500_cap_21s",
    store_id: "store_123",
    sku: "AMOXI500C21",
    barcode: "4801234567891",
    brand: "Amoxil",
    generic: "Amoxicillin",
    form: "capsule",
    strength: "500mg",
    pack_size: 21,
    rx_flag: true,
    pricing: { srp: 187.50, cost: 125.0, markup_pct: 50.0, tax_code: "VAT12" },
    stock_cache: { current_on_hand: 180, last_updated: "2025-09-29T10:00:00Z" }
  },
  {
    id: "store_123:cetirizine_10_tab_10s",
    store_id: "store_123",
    sku: "CETI10T10",
    barcode: "4801234567892",
    brand: "Zyrtec",
    generic: "Cetirizine",
    form: "tablet",
    strength: "10mg",
    pack_size: 10,
    rx_flag: false,
    pricing: { srp: 120.0, cost: 80.0, markup_pct: 50.0, tax_code: "VAT12" },
    stock_cache: { current_on_hand: 95, last_updated: "2025-09-29T10:00:00Z" }
  },
  {
    id: "store_123:loperamide_2_cap_10s",
    store_id: "store_123",
    sku: "LOPER2C10",
    barcode: "4801234567893",
    brand: "Imodium",
    generic: "Loperamide HCl",
    form: "capsule",
    strength: "2mg",
    pack_size: 10,
    rx_flag: false,
    pricing: { srp: 67.50, cost: 45.0, markup_pct: 50.0, tax_code: "VAT12" },
    stock_cache: { current_on_hand: 240, last_updated: "2025-09-29T10:00:00Z" }
  },
  {
    id: "store_123:metformin_500_tab_30s",
    store_id: "store_123",
    sku: "METF500T30",
    barcode: "4801234567894",
    brand: "Glucophage",
    generic: "Metformin HCl",
    form: "tablet",
    strength: "500mg",
    pack_size: 30,
    rx_flag: true,
    pricing: { srp: 330.0, cost: 220.0, markup_pct: 50.0, tax_code: "VAT12" },
    stock_cache: { current_on_hand: 150, last_updated: "2025-09-29T10:00:00Z" }
  },
  {
    id: "store_123:ascorbic_acid_500_tab_100s",
    store_id: "store_123",
    sku: "ASC500T100",
    barcode: "4801234567895",
    brand: "Conzace",
    generic: "Ascorbic Acid",
    form: "tablet",
    strength: "500mg",
    pack_size: 100,
    rx_flag: false,
    pricing: { srp: 52.50, cost: 35.0, markup_pct: 50.0, tax_code: "VAT12" },
    stock_cache: { current_on_hand: 300, last_updated: "2025-09-29T10:00:00Z" }
  }
];

const BATCHES: Batch[] = [
  {
    id: "store_123:PARA500T10:LOT2025A",
    store_id: "store_123",
    product_id: "store_123:paracetamol_500_tab_10s",
    lot_no: "LOT2025A",
    expiry: "2026-03-31",
    unit_cost: 17.0,
    qty_on_hand: 420,
    received_at: 1733000000,
    po_id: "store_123:PO00087"
  },
  {
    id: "store_123:AMOXI500C21:LOT2025B",
    store_id: "store_123",
    product_id: "store_123:amoxicillin_500_cap_21s",
    lot_no: "LOT2025B",
    expiry: "2026-02-15",
    unit_cost: 125.0,
    qty_on_hand: 180,
    received_at: 1733000000,
    po_id: "store_123:PO00087"
  },
  {
    id: "store_123:CETI10T10:LOT2025C",
    store_id: "store_123",
    product_id: "store_123:cetirizine_10_tab_10s",
    lot_no: "LOT2025C",
    expiry: "2026-04-20",
    unit_cost: 80.0,
    qty_on_hand: 95,
    received_at: 1733000000,
    po_id: "store_123:PO00088"
  },
  {
    id: "store_123:LOPER2C10:LOT2025D",
    store_id: "store_123",
    product_id: "store_123:loperamide_2_cap_10s",
    lot_no: "LOT2025D",
    expiry: "2025-12-31",
    unit_cost: 45.0,
    qty_on_hand: 240,
    received_at: 1733000000,
    po_id: "store_123:PO00089"
  },
  {
    id: "store_123:METF500T30:LOT2025E",
    store_id: "store_123",
    product_id: "store_123:metformin_500_tab_30s",
    lot_no: "LOT2025E",
    expiry: "2026-01-15",
    unit_cost: 220.0,
    qty_on_hand: 150,
    received_at: 1733000000,
    po_id: "store_123:PO00090"
  },
  {
    id: "store_123:ASC500T100:LOT2025F",
    store_id: "store_123",
    product_id: "store_123:ascorbic_acid_500_tab_100s",
    lot_no: "LOT2025F",
    expiry: "2026-06-30",
    unit_cost: 35.0,
    qty_on_hand: 300,
    received_at: 1733000000,
    po_id: "store_123:PO00091"
  }
];

export default function POSPage() {
  // State management
  const [cart, setCart] = useState<SaleLineItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer>({ is_senior: false, is_pwd: false });
  const [currentProducts, setCurrentProducts] = useState<Product[]>(PRODUCTS);
  const [currentBatches, setCurrentBatches] = useState<Batch[]>(BATCHES);
  const [saleInProgress, setSaleInProgress] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [queuedSales, setQueuedSales] = useState<any[]>([]);

  // Calculate days to expiry helper
  const daysToExpiry = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // FEFO (First-Expire-First-Out) batch selection
  const getBatchForProduct = (productId: string): Batch | null => {
    const productBatches = currentBatches
      .filter(batch => batch.product_id === productId && batch.qty_on_hand > 0)
      .sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());
    
    return productBatches.length > 0 ? productBatches[0] : null;
  };

  // Product search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = currentProducts.filter(product => 
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.generic.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase()) ||
        product.barcode.includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Add item to cart with FEFO logic
  const addToCart = (product: Product, quantity: number = 1) => {
    const batch = getBatchForProduct(product.id);
    
    if (!batch) {
      alert(`No stock available for ${product.brand}`);
      return;
    }

    if (batch.qty_on_hand < quantity) {
      alert(`Insufficient stock. Available: ${batch.qty_on_hand} packs`);
      return;
    }

    // Check expiry warning (≤30 days)
    const daysLeft = daysToExpiry(batch.expiry);
    const hasExpiryWarning = daysLeft <= 30;

    if (hasExpiryWarning) {
      const confirmed = confirm(
        `Warning: This medicine expires in ${daysLeft} days (${batch.expiry}). Continue with sale?`
      );
      if (!confirmed) return;
    }

    // Check if item already in cart
    const existingItemIndex = cart.findIndex(item => item.product_id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += quantity;
      updatedCart[existingItemIndex].subtotal = 
        updatedCart[existingItemIndex].qty * updatedCart[existingItemIndex].unit_price;
      setCart(updatedCart);
    } else {
      // Add new item
      const newItem: SaleLineItem = {
        product_id: product.id,
        batch_id: batch.id,
        product_name: `${product.brand} ${product.generic} ${product.strength}`,
        qty: quantity,
        unit_price: product.pricing.srp,
        discount: 0,
        subtotal: quantity * product.pricing.srp,
        is_prescription: product.rx_flag,
        expiry_warning: hasExpiryWarning
      };
      setCart([...cart, newItem]);
    }

    // Clear search
    setSearchQuery('');
    setSearchResults([]);
  };

  // Remove item from cart
  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Update item quantity
  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }

    const product = currentProducts.find(p => p.id === cart[index].product_id);
    const batch = getBatchForProduct(cart[index].product_id);
    
    if (!batch || batch.qty_on_hand < newQuantity) {
      alert(`Insufficient stock. Available: ${batch?.qty_on_hand || 0} packs`);
      return;
    }

    const updatedCart = [...cart];
    updatedCart[index].qty = newQuantity;
    updatedCart[index].subtotal = newQuantity * updatedCart[index].unit_price;
    setCart(updatedCart);
  };

  // Apply discounts (Senior/PWD)
  const applyDiscounts = (lineItems: SaleLineItem[]) => {
    return lineItems.map(item => {
      let discountAmount = 0;
      
      // Philippine senior citizen and PWD discount (20% on medicines)
      if ((customer.is_senior || customer.is_pwd) && !item.is_prescription) {
        discountAmount = item.unit_price * 0.20; // 20% discount
      }
      
      return {
        ...item,
        discount: discountAmount,
        subtotal: item.qty * (item.unit_price - discountAmount)
      };
    });
  };

  // Calculate totals
  const calculateTotals = () => {
    const discountedItems = applyDiscounts(cart);
    const gross = discountedItems.reduce((sum, item) => sum + (item.qty * item.unit_price), 0);
    const totalDiscount = discountedItems.reduce((sum, item) => sum + (item.qty * item.discount), 0);
    const subtotal = gross - totalDiscount;
    const vat = subtotal * 0.12; // VAT 12%
    const net = subtotal;

    return { gross, totalDiscount, subtotal, vat, net, discountedItems };
  };

  // Process sale and update inventory
  const processSale = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    setSaleInProgress(true);

    try {
      const totals = calculateTotals();
      
      // Create sale event (PRD data model)
      const saleEvent = {
        id: `store_123:SALE_${new Date().toISOString()}_${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        store_id: "store_123",
        ts: new Date().toISOString(),
        lines: totals.discountedItems.map(item => ({
          product_id: item.product_id,
          batch_id: item.batch_id,
          qty: item.qty,
          unit_price: item.unit_price,
          discount: item.discount
        })),
        tenders: [{ method: "cash", amount: totals.net }],
        totals: {
          gross: totals.gross,
          discount: totals.totalDiscount,
          vat: totals.vat,
          net: totals.net
        },
        customer: customer.phone ? {
          phone: customer.phone,
          name: customer.name,
          is_senior: customer.is_senior,
          is_pwd: customer.is_pwd
        } : null,
        pos_id: "POS01",
        offline: offlineMode
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (offlineMode) {
        // Queue sale for later sync
        setQueuedSales([...queuedSales, saleEvent]);
        alert('Sale queued for sync when online');
      } else {
        // Update inventory in real-time (FEFO decrements)
        const updatedBatches = [...currentBatches];
        const updatedProducts = [...currentProducts];

        totals.discountedItems.forEach(item => {
          // Find and update batch
          const batchIndex = updatedBatches.findIndex(b => b.id === item.batch_id);
          if (batchIndex >= 0) {
            updatedBatches[batchIndex].qty_on_hand -= item.qty;
          }

          // Update product stock cache
          const productIndex = updatedProducts.findIndex(p => p.id === item.product_id);
          if (productIndex >= 0) {
            updatedProducts[productIndex].stock_cache.current_on_hand -= item.qty;
            updatedProducts[productIndex].stock_cache.last_updated = new Date().toISOString();
          }
        });

        setCurrentBatches(updatedBatches);
        setCurrentProducts(updatedProducts);
      }

      // Set receipt data
      setReceiptData({
        saleEvent,
        totals,
        timestamp: new Date().toISOString()
      });

      // Clear cart
      setCart([]);
      setCustomer({ is_senior: false, is_pwd: false });

      alert('Sale completed successfully!');

    } catch (error) {
      console.error('Sale processing error:', error);
      alert('Error processing sale. Please try again.');
    } finally {
      setSaleInProgress(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  ← Back to Dashboard
                </a>
                <span className="text-gray-300">|</span>
                <h1 className="text-2xl font-bold text-gray-900">POS Terminal</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Offline Mode:</span>
                  <button
                    onClick={() => setOfflineMode(!offlineMode)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      offlineMode ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {offlineMode ? 'OFFLINE' : 'ONLINE'}
                  </button>
                </div>
                {queuedSales.length > 0 && (
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    {queuedSales.length} queued sales
                  </span>
                )}
                <div className="text-right text-sm">
                  <div className="font-medium">Store: Makati Main</div>
                  <div className="text-gray-600">POS-01 • Cashier: Maria Santos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Product Search & Selection */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Search Products</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by brand, generic name, SKU, or scan barcode..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-3 top-3">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 max-h-96 overflow-y-auto">
                  {searchResults.map(product => {
                    const batch = getBatchForProduct(product.id);
                    const daysLeft = batch ? daysToExpiry(batch.expiry) : 0;
                    
                    return (
                      <div
                        key={product.id}
                        onClick={() => addToCart(product)}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer mb-2"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{product.brand}</h4>
                            {product.rx_flag && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Rx</span>
                            )}
                            {daysLeft <= 30 && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                                Expires {daysLeft}d
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{product.generic} {product.strength}</div>
                          <div className="text-xs text-gray-500">
                            SKU: {product.sku} • Stock: {product.stock_cache.current_on_hand} packs
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">₱{product.pricing.srp.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">per pack of {product.pack_size}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Select Popular Items */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentProducts.slice(0, 6).map(product => {
                  const batch = getBatchForProduct(product.id);
                  const daysLeft = batch ? daysToExpiry(batch.expiry) : 0;
                  
                  return (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      disabled={!batch || batch.qty_on_hand === 0}
                      className="p-4 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div className="flex items-center space-x-1 mb-2">
                        <h5 className="font-medium text-sm">{product.brand}</h5>
                        {product.rx_flag && <span className="text-xs text-red-600">Rx</span>}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">{product.generic}</div>
                      <div className="text-sm font-bold">₱{product.pricing.srp.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        Stock: {product.stock_cache.current_on_hand}
                        {daysLeft <= 30 && <span className="text-orange-600"> • {daysLeft}d left</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Cart & Checkout */}
          <div className="space-y-6">
            
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={customer.phone || ''}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  placeholder="Phone number (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={customer.name || ''}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                  placeholder="Customer name (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customer.is_senior}
                      onChange={(e) => setCustomer({...customer, is_senior: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">Senior Citizen (20% off)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customer.is_pwd}
                      onChange={(e) => setCustomer({...customer, is_pwd: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">PWD (20% off)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Cart */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Current Sale ({cart.length} items)</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Cart is empty. Add items to start a sale.
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="p-4 border-b last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{item.product_name}</h5>
                          <div className="flex items-center space-x-2 mt-1">
                            {item.is_prescription && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Rx</span>
                            )}
                            {item.expiry_warning && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                                Expiry Warning
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(index, item.qty - 1)}
                            className="w-8 h-8 bg-gray-100 rounded text-center hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-12 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(index, item.qty + 1)}
                            className="w-8 h-8 bg-gray-100 rounded text-center hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₱{item.subtotal.toFixed(2)}</div>
                          {item.discount > 0 && (
                            <div className="text-xs text-green-600">
                              -₱{(item.qty * item.discount).toFixed(2)} discount
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              {cart.length > 0 && (
                <div className="px-6 py-4 border-t bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Gross Amount:</span>
                      <span>₱{totals.gross.toFixed(2)}</span>
                    </div>
                    {totals.totalDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Senior/PWD Discount:</span>
                        <span>-₱{totals.totalDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>VAT (12%):</span>
                      <span>₱{totals.vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>₱{totals.net.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={processSale}
                    disabled={saleInProgress || cart.length === 0}
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saleInProgress ? 'Processing...' : 'Complete Sale'}
                  </button>
                </div>
              )}
            </div>

            {/* Recent Receipt */}
            {receiptData && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Last Receipt</h3>
                <div className="text-sm space-y-1">
                  <div>Receipt #: {receiptData.saleEvent.id.split(':').pop()}</div>
                  <div>Items: {receiptData.saleEvent.lines.length}</div>
                  <div>Total: ₱{receiptData.totals.net.toFixed(2)}</div>
                  <div>Time: {new Date(receiptData.timestamp).toLocaleTimeString()}</div>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Print Receipt
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}