import { Meta, MedicineForm } from './common';

export interface Product {
  _id: string;          // Composite ID: store_id:product_name
  store_id: string;
  sku: string;
  barcode: string;
  brand: string;
  generic: string;
  form: MedicineForm;
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
    rop: number;        // Reorder point
    roq: number;        // Reorder quantity
    min: number;        // Minimum stock
    max: number;        // Maximum stock
  };
  supplier_refs: Array<{
    supplier_id: string;
    lead_days: number;
    moq: number;        // Minimum order quantity
  }>;
  substitutes: string[];
  meta: Meta;
}

// Sample product data
export const sampleProduct: Product = {
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
};

