import { PaymentMethod } from './common';
export interface SaleEvent {
    _id: string;
    store_id: string;
    ts: string;
    lines: Array<{
        product_id: string;
        batch_id: string;
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
export declare const sampleSaleEvent: SaleEvent;
//# sourceMappingURL=sale-event.d.ts.map