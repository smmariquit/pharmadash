export interface GRNEvent {
  _id: string;          // Composite ID: store_id:GRN_sequence
  store_id: string;
  po_id: string;       // Reference to PurchaseOrder._id
  ts: number;          // Unix timestamp
  lines: Array<{
    product_id: string; // Reference to Product._id
    lot_no: string;
    expiry: string;    // ISO date string
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

// Sample GRN event data
export const sampleGRNEvent: GRNEvent = {
  _id: "store_123:GRN00087",
  store_id: "store_123",
  po_id: "store_123:PO00087",
  ts: 1733200000,
  lines: [
    {
      product_id: "store_123:paracetamol_500_tab_10s",
      lot_no: "LOT2025A",
      expiry: "2026-03-31",
      qty: 500,
      unit_cost: 1.7
    }
  ],
  discrepancies: []
};

