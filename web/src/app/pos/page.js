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
exports.default = POSPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
// Hardcoded inventory data based on PRD requirements
const PRODUCTS = [
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
const BATCHES = [
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
function POSPage() {
    // State management
    const [cart, setCart] = (0, react_1.useState)([]);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [searchResults, setSearchResults] = (0, react_1.useState)([]);
    const [customer, setCustomer] = (0, react_1.useState)({ is_senior: false, is_pwd: false });
    const [currentProducts, setCurrentProducts] = (0, react_1.useState)(PRODUCTS);
    const [currentBatches, setCurrentBatches] = (0, react_1.useState)(BATCHES);
    const [saleInProgress, setSaleInProgress] = (0, react_1.useState)(false);
    const [receiptData, setReceiptData] = (0, react_1.useState)(null);
    const [offlineMode, setOfflineMode] = (0, react_1.useState)(false);
    const [queuedSales, setQueuedSales] = (0, react_1.useState)([]);
    // Calculate days to expiry helper
    const daysToExpiry = (expiryDate) => {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    // FEFO (First-Expire-First-Out) batch selection
    const getBatchForProduct = (productId) => {
        const productBatches = currentBatches
            .filter(batch => batch.product_id === productId && batch.qty_on_hand > 0)
            .sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());
        return productBatches.length > 0 ? productBatches[0] : null;
    };
    // Product search functionality
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            const results = currentProducts.filter(product => product.brand.toLowerCase().includes(query.toLowerCase()) ||
                product.generic.toLowerCase().includes(query.toLowerCase()) ||
                product.sku.toLowerCase().includes(query.toLowerCase()) ||
                product.barcode.includes(query));
            setSearchResults(results);
        }
        else {
            setSearchResults([]);
        }
    };
    // Add item to cart with FEFO logic
    const addToCart = (product, quantity = 1) => {
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
            const confirmed = confirm(`Warning: This medicine expires in ${daysLeft} days (${batch.expiry}). Continue with sale?`);
            if (!confirmed)
                return;
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
        }
        else {
            // Add new item
            const newItem = {
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
    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };
    // Update item quantity
    const updateQuantity = (index, newQuantity) => {
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
    const applyDiscounts = (lineItems) => {
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
            }
            else {
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
        }
        catch (error) {
            console.error('Sale processing error:', error);
            alert('Error processing sale. Please try again.');
        }
        finally {
            setSaleInProgress(false);
        }
    };
    const totals = calculateTotals();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white border-b shadow-sm", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsx)("div", { className: "py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("a", { href: "/dashboard", className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "\u2190 Back to Dashboard" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-300", children: "|" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "POS Terminal" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: "Offline Mode:" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setOfflineMode(!offlineMode), className: `px-3 py-1 rounded text-sm font-medium ${offlineMode ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`, children: offlineMode ? 'OFFLINE' : 'ONLINE' })] }), queuedSales.length > 0 && ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded", children: [queuedSales.length, " queued sales"] })), (0, jsx_runtime_1.jsxs)("div", { className: "text-right text-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: "Store: Makati Main" }), (0, jsx_runtime_1.jsx)("div", { className: "text-gray-600", children: "POS-01 \u2022 Cashier: Maria Santos" })] })] })] }) }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Search Products" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: searchQuery, onChange: (e) => handleSearch(e.target.value), placeholder: "Search by brand, generic name, SKU, or scan barcode...", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-3 top-3", children: (0, jsx_runtime_1.jsx)("span", { className: "text-gray-400", children: "\uD83D\uDD0D" }) })] }), searchResults.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 max-h-96 overflow-y-auto", children: searchResults.map(product => {
                                                const batch = getBatchForProduct(product.id);
                                                const daysLeft = batch ? daysToExpiry(batch.expiry) : 0;
                                                return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => addToCart(product), className: "flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer mb-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-gray-900", children: product.brand }), product.rx_flag && ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-red-100 text-red-700 text-xs rounded", children: "Rx" })), daysLeft <= 30 && ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded", children: ["Expires ", daysLeft, "d"] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600", children: [product.generic, " ", product.strength] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["SKU: ", product.sku, " \u2022 Stock: ", product.stock_cache.current_on_hand, " packs"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-lg font-bold text-gray-900", children: ["\u20B1", product.pricing.srp.toFixed(2)] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-500", children: ["per pack of ", product.pack_size] })] })] }, product.id));
                                            }) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Popular Items" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: currentProducts.slice(0, 6).map(product => {
                                                const batch = getBatchForProduct(product.id);
                                                const daysLeft = batch ? daysToExpiry(batch.expiry) : 0;
                                                return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => addToCart(product), disabled: !batch || batch.qty_on_hand === 0, className: "p-4 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1 mb-2", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-sm", children: product.brand }), product.rx_flag && (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-red-600", children: "Rx" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-600 mb-1", children: product.generic }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-bold", children: ["\u20B1", product.pricing.srp.toFixed(2)] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500", children: ["Stock: ", product.stock_cache.current_on_hand, daysLeft <= 30 && (0, jsx_runtime_1.jsxs)("span", { className: "text-orange-600", children: [" \u2022 ", daysLeft, "d left"] })] })] }, product.id));
                                            }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Customer Information" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: customer.phone || '', onChange: (e) => setCustomer({ ...customer, phone: e.target.value }), placeholder: "Phone number (optional)", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: customer.name || '', onChange: (e) => setCustomer({ ...customer, name: e.target.value }), placeholder: "Customer name (optional)", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: customer.is_senior, onChange: (e) => setCustomer({ ...customer, is_senior: e.target.checked }), className: "mr-2" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Senior Citizen (20% off)" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: customer.is_pwd, onChange: (e) => setCustomer({ ...customer, is_pwd: e.target.checked }), className: "mr-2" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "PWD (20% off)" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border", children: [(0, jsx_runtime_1.jsx)("div", { className: "px-6 py-4 border-b", children: (0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold", children: ["Current Sale (", cart.length, " items)"] }) }), (0, jsx_runtime_1.jsx)("div", { className: "max-h-96 overflow-y-auto", children: cart.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "p-6 text-center text-gray-500", children: "Cart is empty. Add items to start a sale." })) : (cart.map((item, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 border-b last:border-b-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-sm", children: item.product_name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mt-1", children: [item.is_prescription && ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-red-100 text-red-700 text-xs rounded", children: "Rx" })), item.expiry_warning && ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded", children: "Expiry Warning" }))] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => removeFromCart(index), className: "text-red-600 hover:text-red-800 text-sm", children: "Remove" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => updateQuantity(index, item.qty - 1), className: "w-8 h-8 bg-gray-100 rounded text-center hover:bg-gray-200", children: "-" }), (0, jsx_runtime_1.jsx)("span", { className: "w-12 text-center", children: item.qty }), (0, jsx_runtime_1.jsx)("button", { onClick: () => updateQuantity(index, item.qty + 1), className: "w-8 h-8 bg-gray-100 rounded text-center hover:bg-gray-200", children: "+" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium", children: ["\u20B1", item.subtotal.toFixed(2)] }), item.discount > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-green-600", children: ["-\u20B1", (item.qty * item.discount).toFixed(2), " discount"] }))] })] })] }, index)))) }), cart.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 border-t bg-gray-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Gross Amount:" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B1", totals.gross.toFixed(2)] })] }), totals.totalDiscount > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm text-green-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "Senior/PWD Discount:" }), (0, jsx_runtime_1.jsxs)("span", { children: ["-\u20B1", totals.totalDiscount.toFixed(2)] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "VAT (12%):" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B1", totals.vat.toFixed(2)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between font-bold text-lg border-t pt-2", children: [(0, jsx_runtime_1.jsx)("span", { children: "Total:" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B1", totals.net.toFixed(2)] })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: processSale, disabled: saleInProgress || cart.length === 0, className: "w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: saleInProgress ? 'Processing...' : 'Complete Sale' })] }))] }), receiptData && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm border p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "Last Receipt" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Receipt #: ", receiptData.saleEvent.id.split(':').pop()] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Items: ", receiptData.saleEvent.lines.length] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Total: \u20B1", receiptData.totals.net.toFixed(2)] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Time: ", new Date(receiptData.timestamp).toLocaleTimeString()] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => window.print(), className: "mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium", children: "Print Receipt" })] }))] })] }) })] }));
}
//# sourceMappingURL=page.js.map