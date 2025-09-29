export type POStatus = 'DRAFT' | 'SENT' | 'RECEIVED' | 'CANCELLED';
export interface PurchaseOrder {
    _id: string;
    store_id: string;
    status: POStatus;
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
export declare const samplePurchaseOrder: PurchaseOrder;
//# sourceMappingURL=purchase-order.d.ts.map