export interface StockReceiveRequest {
    po_id: string;
    supplier_id: string;
    lines: Array<{
        product_id: string;
        lot_no: string;
        expiry: string;
        qty_received: number;
        unit_cost: number;
    }>;
    notes?: string;
    received_by: string;
}
export interface StockAdjustmentRequest {
    product_id: string;
    batch_id?: string;
    adjustment_type: 'DAMAGE' | 'THEFT' | 'COUNT_VARIANCE' | 'WRITE_OFF' | 'FOUND';
    quantity_change: number;
    reason: string;
    approval_code?: string;
    adjusted_by: string;
    notes?: string;
}
export interface ReturnToSupplierRequest {
    supplier_id: string;
    return_type: 'EXPIRED' | 'DAMAGED' | 'OVERSTOCKED' | 'QUALITY_ISSUE';
    lines: Array<{
        batch_id: string;
        product_id: string;
        quantity: number;
        reason: string;
    }>;
    reference_document?: string;
    notes?: string;
    requested_by: string;
}
export interface CustomerReturnRequest {
    original_sale_id?: string;
    return_type: 'DEFECTIVE' | 'WRONG_ITEM' | 'EXPIRED' | 'CUSTOMER_CHANGE_MIND';
    lines: Array<{
        product_id: string;
        quantity: number;
        unit_price: number;
        reason: string;
    }>;
    customer_info?: {
        name?: string;
        phone?: string;
    };
    action: 'REFUND' | 'EXCHANGE' | 'STORE_CREDIT';
    supervisor_approval?: string;
    notes?: string;
}
export interface CycleCountRequest {
    count_date: string;
    counted_by: string;
    location?: string;
    items: Array<{
        product_id: string;
        batch_id?: string;
        system_qty: number;
        counted_qty: number;
        variance: number;
        notes?: string;
    }>;
    count_type: 'FULL' | 'PARTIAL' | 'ABC_CLASS';
    supervisor_verified?: boolean;
}
export interface StockMovement {
    _id: string;
    store_id: string;
    movement_type: 'RECEIVE' | 'SALE' | 'ADJUSTMENT' | 'RETURN_TO_SUPPLIER' | 'CUSTOMER_RETURN' | 'CYCLE_COUNT' | 'TRANSFER';
    product_id: string;
    batch_id?: string;
    quantity_change: number;
    reference_document_id?: string;
    reference_document_type?: 'PO' | 'SALE' | 'ADJUSTMENT' | 'RETURN';
    reason?: string;
    unit_cost?: number;
    timestamp: string;
    created_by: string;
    notes?: string;
}
export interface StockMovementQuery {
    product_id?: string;
    batch_id?: string;
    movement_type?: string;
    date_from?: string;
    date_to?: string;
    limit?: number;
    offset?: number;
}
export interface StockOperationResponse {
    success: boolean;
    operation_id: string;
    message: string;
    movements_created?: StockMovement[];
    batches_affected?: string[];
    audit_log_id?: string;
}
export interface StockMovementsResponse {
    movements: StockMovement[];
    total_count: number;
    has_more: boolean;
}
export interface FEFOBatch {
    batch_id: string;
    product_id: string;
    lot_no: string;
    expiry: string;
    qty_available: number;
    unit_cost: number;
    days_to_expiry: number;
}
export interface StockValidationError {
    field: string;
    message: string;
    code: string;
}
export interface StockValidationResult {
    is_valid: boolean;
    errors: StockValidationError[];
    warnings?: string[];
}
//# sourceMappingURL=stock-operations.d.ts.map