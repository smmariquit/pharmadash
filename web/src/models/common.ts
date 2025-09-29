// Collection names
export const COLLECTIONS = {
  PRODUCTS: 'products',
  BATCHES: 'batches',
  SALES_EVENTS: 'sales_events',
  PURCHASE_ORDERS: 'purchase_orders',
  GRN_EVENTS: 'grn_events',
  FORECAST_SNAPSHOTS: 'forecast_snapshots',
  RECOMMENDATIONS: 'recommendations',
  EXPIRY_ACTIONS: 'expiry_actions',
  AUDIT_LOGS: 'audit_logs',
} as const;

// Common types
export type Meta = {
  created_at: number;  // Unix timestamp
  updated_at: number;  // Unix timestamp
};

// Payment method type
export type PaymentMethod = 'cash' | 'card' | 'online';

// Medicine form type
export type MedicineForm = 'tablet' | 'capsule' | 'syrup' | 'drops' | 'cream' | 'ointment';

// Firestore collection references (to be used with Firebase initialization)
export const getCollectionReferences = (db: any) => ({
  products: db.collection(COLLECTIONS.PRODUCTS),
  batches: db.collection(COLLECTIONS.BATCHES),
  salesEvents: db.collection(COLLECTIONS.SALES_EVENTS),
  purchaseOrders: db.collection(COLLECTIONS.PURCHASE_ORDERS),
  grnEvents: db.collection(COLLECTIONS.GRN_EVENTS),
  forecastSnapshots: db.collection(COLLECTIONS.FORECAST_SNAPSHOTS),
  recommendations: db.collection(COLLECTIONS.RECOMMENDATIONS),
  expiryActions: db.collection(COLLECTIONS.EXPIRY_ACTIONS),
  auditLogs: db.collection(COLLECTIONS.AUDIT_LOGS),
});

