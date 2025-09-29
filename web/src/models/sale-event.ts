import { PaymentMethod } from './common';

export interface SaleEvent {
  _id: string;          // Composite ID: store_id:SALE_timestamp_sequence
  store_id: string;
  ts: string;          // ISO datetime string
  lines: Array<{
    product_id: string; // Reference to Product._id
    batch_id: string;   // Reference to Batch._id
    qty: number;
    unit_price: number;
    discount: number;
  }>;
  tenders: Array<{
    method: PaymentMethod;
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

// Sample sale event data
export const sampleSaleEvent: SaleEvent = {
  _id: "store_123:SALE_2025-09-29T10:05:14Z_0001",
  store_id: "store_123",
  ts: "2025-09-29T10:05:14Z",
  lines: [
    {
      product_id: "store_123:paracetamol_500_tab_10s",
      batch_id: "store_123:PARA500T10:LOT2025A",
      qty: 5,
      unit_price: 2.5,
      discount: 0
    }
  ],
  tenders: [
    {
      method: "cash",
      amount: 12.5
    }
  ],
  totals: {
    gross: 12.5,
    vat: 1.34,
    net: 11.16
  },
  pos_id: "POS01",
  offline: false
};

