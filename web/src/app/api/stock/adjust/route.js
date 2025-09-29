"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const stock_operations_1 = require("@/types/stock-operations");
// Stock Adjustment API - POST /api/stock/adjust
async function POST(request) {
    try {
        const body = await request.json();
        // Validation
        if (!body.product_id) {
            return server_1.NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }
        if (!body.adjustment_type) {
            return server_1.NextResponse.json({ success: false, message: 'Adjustment type is required' }, { status: 400 });
        }
        const validAdjustmentTypes = ['DAMAGE', 'THEFT', 'COUNT_VARIANCE', 'WRITE_OFF', 'FOUND'];
        if (!validAdjustmentTypes.includes(body.adjustment_type)) {
            return server_1.NextResponse.json({ success: false, message: 'Invalid adjustment type' }, { status: 400 });
        }
        if (body.quantity_change === 0) {
            return server_1.NextResponse.json({ success: false, message: 'Quantity change cannot be zero' }, { status: 400 });
        }
        if (!body.reason) {
            return server_1.NextResponse.json({ success: false, message: 'Reason is required for stock adjustment' }, { status: 400 });
        }
        if (!body.adjusted_by) {
            return server_1.NextResponse.json({ success: false, message: 'Adjusted by user is required' }, { status: 400 });
        }
        // Check if approval is required for large adjustments
        const adjustmentThreshold = 100; // In real implementation, get from config
        if (Math.abs(body.quantity_change) > adjustmentThreshold && !body.approval_code) {
            return server_1.NextResponse.json({ success: false, message: 'Approval code required for large adjustments' }, { status: 400 });
        }
        // Process stock adjustment
        const store_id = "store_123"; // In real implementation, get from auth context
        const timestamp = new Date().toISOString();
        const adjustment_id = `${store_id}:ADJ${Date.now()}`;
        // Create stock movement
        const movement = {
            _id: `${store_id}:MOV:${timestamp}:${Math.random().toString(36).substr(2, 9)}`,
            store_id,
            movement_type: 'ADJUSTMENT',
            product_id: body.product_id,
            batch_id: body.batch_id,
            quantity_change: body.quantity_change,
            reference_document_id: adjustment_id,
            reference_document_type: 'ADJUSTMENT',
            reason: `${body.adjustment_type}: ${body.reason}`,
            timestamp,
            created_by: body.adjusted_by,
            notes: body.notes
        };
        // Create adjustment record
        const adjustment_record = {
            _id: adjustment_id,
            store_id,
            product_id: body.product_id,
            batch_id: body.batch_id,
            adjustment_type: body.adjustment_type,
            quantity_change: body.quantity_change,
            reason: body.reason,
            adjusted_by: body.adjusted_by,
            approval_code: body.approval_code,
            notes: body.notes,
            timestamp,
            status: 'COMPLETED'
        };
        // Create audit log
        const audit_log = {
            _id: `${store_id}:AUD:${timestamp}:STOCK_ADJUSTMENT`,
            store_id,
            actor: body.adjusted_by,
            action: 'STOCK_ADJUSTMENT',
            entity: 'stock_adjustments',
            entity_id: adjustment_id,
            before: null, // In real implementation, capture current stock levels
            after: adjustment_record,
            ts: timestamp
        };
        // In a real implementation:
        // 1. Update batch quantity if batch_id provided
        // 2. Update product stock cache
        // 3. Save records to database
        // if (body.batch_id) {
        //   await updateBatchQuantity(body.batch_id, body.quantity_change);
        // }
        // await updateProductStockCache(body.product_id, body.quantity_change);
        // await saveToDatabase('stock_adjustments', adjustment_record);
        // await saveToDatabase('stock_movements', movement);
        // await saveToDatabase('audit_logs', audit_log);
        return server_1.NextResponse.json({
            success: true,
            operation_id: adjustment_id,
            message: `Stock adjustment of ${body.quantity_change} units completed for ${body.adjustment_type}`,
            adjustment_record,
            movement_created: movement,
            audit_log_id: audit_log._id,
            warning: Math.abs(body.quantity_change) > adjustmentThreshold ?
                'Large adjustment detected - ensure proper approval process' : undefined
        }, { status: 200 });
    }
    catch (error) {
        console.error('Stock adjustment error:', error);
        return server_1.NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map