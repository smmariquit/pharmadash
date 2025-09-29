export type ExpiryActionType = 'RETURN' | 'DONATE' | 'MARKDOWN' | 'DISPOSE';
export type ExpiryActionStatus = 'PENDING' | 'PAPERWORK_SENT' | 'COMPLETED' | 'CANCELLED';
export interface ExpiryAction {
    _id: string;
    store_id: string;
    batch_id: string;
    action: ExpiryActionType;
    target: {
        supplier_id?: string;
        organization_id?: string;
        markdown_pct?: number;
    };
    decision_basis: string[];
    ts: number;
    status: ExpiryActionStatus;
}
export declare const sampleExpiryAction: ExpiryAction;
//# sourceMappingURL=expiry-action.d.ts.map