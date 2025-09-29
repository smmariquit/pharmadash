"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionReferences = exports.sampleData = exports.COLLECTIONS = void 0;
// Collection names
exports.COLLECTIONS = {
    PRODUCTS: 'products',
    BATCHES: 'batches',
    SALES_EVENTS: 'sales_events',
    PURCHASE_ORDERS: 'purchase_orders',
    GRN_EVENTS: 'grn_events',
    FORECAST_SNAPSHOTS: 'forecast_snapshots',
    RECOMMENDATIONS: 'recommendations',
    EXPIRY_ACTIONS: 'expiry_actions',
    AUDIT_LOGS: 'audit_logs',
};
// Sample initialization data
exports.sampleData = {
    products: [
        {
            _id: "store_123:paracetamol_500_tab_10s",
            store_id: "store_123",
            sku: "PARA500T10",
            barcode: "4801234567890",
            brand: "Biogesic",
            generic: "Paracetamol",
            form: "tablet",
            strength: "500mg",
            pack_size: 10,
            rx_flag: false,
            pricing: {
                srp: 2.5,
                cost: 1.7,
                markup_pct: 47.1,
                tax_code: "VAT12"
            },
            replenishment: {
                rop: 50,
                roq: 200,
                min: 50,
                max: 800
            },
            supplier_refs: [
                {
                    supplier_id: "sup_unilab",
                    lead_days: 3,
                    moq: 100
                }
            ],
            substitutes: ["store_123:acetaminophen_500_tab_10s"],
            meta: {
                created_at: 1732867200,
                updated_at: 1732940000
            }
        }
    ],
    batches: [
        {
            _id: "store_123:PARA500T10:LOT2025A",
            store_id: "store_123",
            product_id: "store_123:paracetamol_500_tab_10s",
            lot_no: "LOT2025A",
            expiry: "2026-03-31",
            unit_cost: 1.7,
            qty_on_hand: 420,
            received_at: 1733000000,
            po_id: "store_123:PO00087"
        }
    ],
    // Add more sample data as needed
};
// Firestore collection references (to be used with Firebase initialization)
const getCollectionReferences = (db) => ({
    products: db.collection(exports.COLLECTIONS.PRODUCTS),
    batches: db.collection(exports.COLLECTIONS.BATCHES),
    salesEvents: db.collection(exports.COLLECTIONS.SALES_EVENTS),
    purchaseOrders: db.collection(exports.COLLECTIONS.PURCHASE_ORDERS),
    grnEvents: db.collection(exports.COLLECTIONS.GRN_EVENTS),
    forecastSnapshots: db.collection(exports.COLLECTIONS.FORECAST_SNAPSHOTS),
    recommendations: db.collection(exports.COLLECTIONS.RECOMMENDATIONS),
    expiryActions: db.collection(exports.COLLECTIONS.EXPIRY_ACTIONS),
    auditLogs: db.collection(exports.COLLECTIONS.AUDIT_LOGS),
});
exports.getCollectionReferences = getCollectionReferences;
//# sourceMappingURL=models.js.map