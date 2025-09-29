"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionReferences = exports.COLLECTIONS = void 0;
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
//# sourceMappingURL=common.js.map