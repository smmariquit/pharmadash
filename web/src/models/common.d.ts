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
export type PaymentMethod = 'cash' | 'card' | 'online';
export type MedicineForm = 'tablet' | 'capsule' | 'syrup' | 'drops' | 'cream' | 'ointment';
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
//# sourceMappingURL=common.d.ts.map