export declare const COLLECTIONS: {
    readonly PRODUCTS: "products";
    readonly BATCHES: "batches";
    readonly SALES_EVENTS: "sales_events";
    readonly PURCHASE_ORDERS: "purchase_orders";
    readonly GRN_EVENTS: "grn_events";
    readonly FORECAST_SNAPSHOTS: "forecast_snapshots";
    readonly RECOMMENDATIONS: "recommendations";
    readonly EXPIRY_ACTIONS: "expiry_actions";
    readonly AUDIT_LOGS: "audit_logs";
};
export type Meta = {
    created_at: number;
    updated_at: number;
};
export interface Product {
    _id: string;
    store_id: string;
    sku: string;
    barcode: string;
    brand: string;
    generic: string;
    form: 'tablet' | 'capsule' | 'syrup' | 'drops' | 'cream' | 'ointment';
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
        rop: number;
        roq: number;
        min: number;
        max: number;
    };
    supplier_refs: Array<{
        supplier_id: string;
        lead_days: number;
        moq: number;
    }>;
    substitutes: string[];
    meta: Meta;
}
export interface Batch {
    _id: string;
    store_id: string;
    product_id: string;
    lot_no: string;
    expiry: string;
    unit_cost: number;
    qty_on_hand: number;
    received_at: number;
    po_id: string;
}
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
        method: 'cash' | 'card' | 'online';
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
export interface PurchaseOrder {
    _id: string;
    store_id: string;
    status: 'DRAFT' | 'SENT' | 'RECEIVED' | 'CANCELLED';
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
export interface ForecastSnapshot {
    _id: string;
    store_id: string;
    product_id: string;
    period: string;
    model: string;
    mean_dly_demand: number;
    sigma: number;
    coverage_days: number;
    explain: string[];
    created_at: number;
}
export interface Recommendation {
    _id: string;
    store_id: string;
    budget: number;
    objective: 'expected_gp_max' | 'stockout_min';
    items: Array<{
        product_id: string;
        qty: number;
        supplier_id: string;
        reason: string[];
        exp_gp: number;
    }>;
    spend: number;
    created_at: number;
}
export interface ExpiryAction {
    _id: string;
    store_id: string;
    batch_id: string;
    action: 'RETURN' | 'DONATE' | 'MARKDOWN' | 'DISPOSE';
    target: {
        supplier_id?: string;
        organization_id?: string;
        markdown_pct?: number;
    };
    decision_basis: string[];
    ts: number;
    status: 'PENDING' | 'PAPERWORK_SENT' | 'COMPLETED' | 'CANCELLED';
}
export interface AuditLog {
    _id: string;
    store_id: string;
    actor: string;
    action: string;
    entity: keyof typeof COLLECTIONS;
    entity_id: string;
    before: any | null;
    after: any | null;
    ts: string;
}
export declare const sampleData: {
    readonly products: readonly [{
        readonly _id: "store_123:paracetamol_500_tab_10s";
        readonly store_id: "store_123";
        readonly sku: "PARA500T10";
        readonly barcode: "4801234567890";
        readonly brand: "Biogesic";
        readonly generic: "Paracetamol";
        readonly form: "tablet";
        readonly strength: "500mg";
        readonly pack_size: 10;
        readonly rx_flag: false;
        readonly pricing: {
            readonly srp: 2.5;
            readonly cost: 1.7;
            readonly markup_pct: 47.1;
            readonly tax_code: "VAT12";
        };
        readonly replenishment: {
            readonly rop: 50;
            readonly roq: 200;
            readonly min: 50;
            readonly max: 800;
        };
        readonly supplier_refs: readonly [{
            readonly supplier_id: "sup_unilab";
            readonly lead_days: 3;
            readonly moq: 100;
        }];
        readonly substitutes: readonly ["store_123:acetaminophen_500_tab_10s"];
        readonly meta: {
            readonly created_at: 1732867200;
            readonly updated_at: 1732940000;
        };
    }];
    readonly batches: readonly [{
        readonly _id: "store_123:PARA500T10:LOT2025A";
        readonly store_id: "store_123";
        readonly product_id: "store_123:paracetamol_500_tab_10s";
        readonly lot_no: "LOT2025A";
        readonly expiry: "2026-03-31";
        readonly unit_cost: 1.7;
        readonly qty_on_hand: 420;
        readonly received_at: 1733000000;
        readonly po_id: "store_123:PO00087";
    }];
};
export declare const getCollectionReferences: (db: any) => {
    products: any;
    batches: any;
    salesEvents: any;
    purchaseOrders: any;
    grnEvents: any;
    forecastSnapshots: any;
    recommendations: any;
    expiryActions: any;
    auditLogs: any;
};
//# sourceMappingURL=models.d.ts.map