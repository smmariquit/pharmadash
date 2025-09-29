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
  created_at: number;
  updated_at: number;
};

// Product related types
export interface Product {
  _id: string;
  store_id: string;
  sku: string;
  barcode: string;
  brand: string;
  generic: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'drops' | 'cream' | 'ointment';
  strength: string;
  pack_size: number;
  rx_flag: boolean;
  pricing: {
    srp: number;
    cost: number;
    markup_pct: number;
    tax_code: string;
  };
  replenishment: {
    rop: number;    // Reorder point
    roq: number;    // Reorder quantity
    min: number;    // Minimum stock
    max: number;    // Maximum stock
  };
  supplier_refs: Array<{
    supplier_id: string;
    lead_days: number;
    moq: number;    // Minimum order quantity
  }>;
  substitutes: string[];
  meta: Meta;
}

// Batch tracking
export interface Batch {
  _id: string;
  store_id: string;
  product_id: string;
  lot_no: string;
  expiry: string;   // ISO date string
  unit_cost: number;
  qty_on_hand: number;
  received_at: number;
  po_id: string;
}

// Sales transaction
export interface SaleEvent {
  _id: string;
  store_id: string;
  ts: string;       // ISO datetime string
  lines: Array<{
    product_id: string;
    batch_id: string;
    qty: number;
    unit_price: number;
    discount: number;
  }>;
  tenders: Array<{
    method: 'cash' | 'card' | 'online';
    amount: number;
  }>;
  totals: {
    gross: number;
    vat: number;
    net: number;
  };
  pos_id: string;
  offline: boolean;
}

// Purchase order
export interface PurchaseOrder {
  _id: string;
  store_id: string;
  status: 'DRAFT' | 'SENT' | 'RECEIVED' | 'CANCELLED';
  supplier_id: string;
  lines: Array<{
    product_id: string;
    qty: number;
    unit_cost: number;
  }>;
  budget_cycle_id: string;
  created_at: number;
  sent_via: string[];
  totals: {
    items: number;
    amount: number;
  };
}

// Goods receipt
export interface GRNEvent {
  _id: string;
  store_id: string;
  po_id: string;
  ts: number;
  lines: Array<{
    product_id: string;
    lot_no: string;
    expiry: string;
    qty: number;
    unit_cost: number;
  }>;
  discrepancies: Array<{
    product_id: string;
    expected: number;
    received: number;
    reason?: string;
  }>;
}

// Forecast snapshot
export interface ForecastSnapshot {
  _id: string;
  store_id: string;
  product_id: string;
  period: string;
  model: string;
  mean_dly_demand: number;
  sigma: number;
  coverage_days: number;
  explain: string[];
  created_at: number;
}

// Recommendations
export interface Recommendation {
  _id: string;
  store_id: string;
  budget: number;
  objective: 'expected_gp_max' | 'stockout_min';
  items: Array<{
    product_id: string;
    qty: number;
    supplier_id: string;
    reason: string[];
    exp_gp: number;
  }>;
  spend: number;
  created_at: number;
}

// Expiry actions
export interface ExpiryAction {
  _id: string;
  store_id: string;
  batch_id: string;
  action: 'RETURN' | 'DONATE' | 'MARKDOWN' | 'DISPOSE';
  target: {
    supplier_id?: string;
    organization_id?: string;
    markdown_pct?: number;
  };
  decision_basis: string[];
  ts: number;
  status: 'PENDING' | 'PAPERWORK_SENT' | 'COMPLETED' | 'CANCELLED';
}

// Audit logs
export interface AuditLog {
  _id: string;
  store_id: string;
  actor: string;
  action: string;
  entity: keyof typeof COLLECTIONS;
  entity_id: string;
  before: any | null;
  after: any | null;
  ts: string;
}

// Sample initialization data
export const sampleData = {
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
} as const;

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

