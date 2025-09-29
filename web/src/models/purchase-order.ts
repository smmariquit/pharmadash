export type POStatus = 'DRAFT' | 'SENT' | 'RECEIVED' | 'CANCELLED';

export interface PurchaseOrder {
  _id: string;          // Composite ID: store_id:PO_sequence
  store_id: string;
  status: POStatus;
  supplier_id: string;
  lines: Array<{
    product_id: string; // Reference to Product._id
    qty: number;
    unit_cost: number;
  }>;
  budget_cycle_id: string;
  created_at: number;   // Unix timestamp
  sent_via: string[];   // Communication channels used
  totals: {
    items: number;      // Total quantity of items
    amount: number;     // Total cost
  };
}

// Sample purchase order data
export const samplePurchaseOrder: PurchaseOrder = {
  _id: "store_123:PO00087",
  store_id: "store_123",
  status: "SENT",
  supplier_id: "sup_unilab",
  lines: [
    {
      product_id: "store_123:paracetamol_500_tab_10s",
      qty: 500,
      unit_cost: 1.7
    }
  ],
  budget_cycle_id: "store_123:2025W39",
  created_at: 1733000000,
  sent_via: ["email"],
  totals: {
    items: 500,
    amount: 850
  }
};

