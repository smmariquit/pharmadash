export type InventoryItem = {
  _id: string;
  store_id: string;
  sku: string;
  barcode: string;
  brand: string;
  generic: string;
  form: "capsule" | "syrup" | "tablet" | "injection" | "cream" | "ointment";
  strength: string;
  pack_size: number;
  rx_flag: boolean;
  pricing: {
    srp: number;
    cost: number;
    markup_pct: number;
    tax_code: "VAT12" | "VAT0";
  };
  replenishment: {
    rop: number; // Reorder Point
    roq: number; // Reorder Quantity
    min: number; // Minimum Stock Level
    max: number; // Maximum Stock Level
  };
  supplier_refs: Array<{
    supplier_id: string;
    lead_days: number;
    moq: number; // Minimum Order Quantity
  }>;
  substitutes: string[];
  meta: {
    created_at: number;
    updated_at: number;
  };
};

export type InventoryLot = {
  _id: string; // Composite ID: store_id:product_id:lot_no
  store_id: string; // Store identifier
  product_id: string; // Product reference (foreign key to InventoryItem)
  lot_no: string; // Batch/lot number
  expiry: string; // Expiration date in YYYY-MM-DD format
  unit_cost: number; // Cost per unit for this specific lot
  qty_on_hand: number; // Current quantity in stock
  received_at: number; // Unix timestamp when lot was received
  po_id: string; // Purchase order reference
};

export type SaleTransaction = {
  _id: string; // Composite ID: store_id:SALE_timestamp_sequence
  store_id: string; // Store identifier
  ts: string; // ISO timestamp of sale
  lines: Array<{
    product_id: string; // Reference to product
    batch_id: string; // Reference to specific batch/lot
    qty: number; // Quantity sold
    unit_price: number; // Price per unit
    discount: number; // Discount amount
  }>;
  tenders: Array<{
    method: "cash" | "card" | "qr" | "transfer";
    amount: number;
  }>;
  totals: {
    gross: number; // Total before VAT
    vat: number; // VAT amount
    net: number; // Total after VAT
  };
  pos_id: string; // POS terminal identifier
  offline: boolean; // Whether transaction was processed offline
};
