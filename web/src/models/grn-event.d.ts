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
export declare const sampleGRNEvent: GRNEvent;
//# sourceMappingURL=grn-event.d.ts.map