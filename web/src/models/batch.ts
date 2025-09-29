export interface Batch {
  _id: string;          // Composite ID: store_id:product_id:lot_no
  store_id: string;
  product_id: string;   // Reference to Product._id
  lot_no: string;
  expiry: string;       // ISO date string
  unit_cost: number;
  qty_on_hand: number;
  received_at: number;  // Unix timestamp
  po_id: string;        // Reference to PurchaseOrder._id
}

// Sample batch data
export const sampleBatch: Batch = {
  _id: "store_123:PARA500T10:LOT2025A",
  store_id: "store_123",
  product_id: "store_123:paracetamol_500_tab_10s",
  lot_no: "LOT2025A",
  expiry: "2026-03-31",
  unit_cost: 1.7,
  qty_on_hand: 420,
  received_at: 1733000000,
  po_id: "store_123:PO00087"
};

