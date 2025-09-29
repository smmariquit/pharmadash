"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const stock_operations_1 = require("@/types/stock-operations");
// Return to Supplier API - POST /api/stock/return-to-supplier
async function POST(request) {
    try {
        const body = await request.json();
        // Validation
        if (!body.supplier_id) {
            return server_1.NextResponse.json({ success: false, message: 'Supplier ID is required' }, { status: 400 });
        }
        if (!body.return_type) {
            return server_1.NextResponse.json({ success: false, message: 'Return type is required' }, { status: 400 });
        }
        const validReturnTypes = ['EXPIRED', 'DAMAGED', 'OVERSTOCKED', 'QUALITY_ISSUE'];
        if (!validReturnTypes.includes(body.return_type)) {
            return server_1.NextResponse.json({ success: false, message: 'Invalid return type' }, { status: 400 });
        }
        if (!body.lines || body.lines.length === 0) {
            return server_1.NextResponse.json({ success: false, message: 'At least one line item is required' }, { status: 400 });
        }
        if (!body.requested_by) {
            return server_1.NextResponse.json({ success: false, message: 'Requested by user is required' }, { status: 400 });
        }
        // Validate each line item
        for (const [index, line] of body.lines.entries()) {
            if (!line.batch_id) {
                return server_1.NextResponse.json({ success: false, message: `Batch ID is required for line ${index + 1}` }, { status: 400 });
            }
            if (!line.product_id) {
                return server_1.NextResponse.json({ success: false, message: `Product ID is required for line ${index + 1}` }, { status: 400 });
            }
            if (line.quantity <= 0) {
                return server_1.NextResponse.json({ success: false, message: `Quantity must be positive for line ${index + 1}` }, { status: 400 });
            }
            if (!line.reason) {
                return server_1.NextResponse.json({ success: false, message: `Reason is required for line ${index + 1}` }, { status: 400 });
            }
        }
        // Process return to supplier
        const store_id = "store_123"; // In real implementation, get from auth context
        const timestamp = new Date().toISOString();
        const rts_id = `${store_id}:RTS${Date.now()}`;
        // Create stock movements and expiry actions
        const movementsCreated = [];
        const expiryActionsCreated = [];
        for (const line of body.lines) {
            // Create stock movement (negative for outbound)
            const movement = {
                _id: `${store_id}:MOV:${timestamp}:${Math.random().toString(36).substr(2, 9)}`,
                store_id,
                movement_type: 'RETURN_TO_SUPPLIER',
                product_id: line.product_id,
                batch_id: line.batch_id,
                quantity_change: -line.quantity, // Negative for outbound
                reference_document_id: rts_id,
                reference_document_type: 'RETURN',
                reason: `${body.return_type}: ${line.reason}`,
                timestamp,
                created_by: body.requested_by,
                notes: body.notes
            };
            movementsCreated.push(movement);
            // Create expiry action record
            const expiry_action = {
                _id: `${store_id}:EXP_ACT:${line.batch_id}:${Date.now()}`,
                store_id,
                batch_id: line.batch_id,
                action: 'RETURN',
                target: { supplier_id: body.supplier_id },
                decision_basis: [body.return_type.toLowerCase()],
                quantity: line.quantity,
                reason: line.reason,
                ts: Math.floor(Date.now() / 1000),
                status: 'PAPERWORK_PENDING',
                requested_by: body.requested_by,
                reference_document: body.reference_document
            };
            expiryActionsCreated.push(expiry_action);
        }
        // Create return to supplier record
        const rts_record = {
            _id: rts_id,
            store_id,
            supplier_id: body.supplier_id,
            return_type: body.return_type,
            lines: body.lines,
            reference_document: body.reference_document,
            notes: body.notes,
            requested_by: body.requested_by,
            status: 'PENDING_APPROVAL',
            created_at: timestamp,
            total_items: body.lines.reduce((sum, line) => sum + line.quantity, 0)
        };
        // Create audit log
        const audit_log = {
            _id: `${store_id}:AUD:${timestamp}:RETURN_TO_SUPPLIER`,
            store_id,
            actor: body.requested_by,
            action: 'RETURN_TO_SUPPLIER',
            entity: 'return_to_supplier',
            entity_id: rts_id,
            before: null,
            after: rts_record,
            ts: timestamp
        };
        // In a real implementation:
        // 1. Check if batches have sufficient quantity
        // 2. Reserve stock for return (don't immediately reduce)
        // 3. Update batch status to 'RESERVED_FOR_RETURN'
        // 4. Generate return paperwork
        // for (const line of body.lines) {
        //   await checkBatchAvailability(line.batch_id, line.quantity);
        //   await reserveStock(line.batch_id, line.quantity);
        // }
        // await saveToDatabase('return_to_supplier', rts_record);
        // await saveToDatabase('stock_movements', movementsCreated);
        // await saveToDatabase('expiry_actions', expiryActionsCreated);
        // await saveToDatabase('audit_logs', audit_log);
        return server_1.NextResponse.json({
            success: true,
            operation_id: rts_id,
            message: `Return to supplier request created for ${body.lines.length} items`,
            rts_record,
            movements_created: movementsCreated.length,
            expiry_actions_created: expiryActionsCreated.length,
            audit_log_id: audit_log._id,
            next_steps: [
                'Generate return documentation',
                'Await supplier approval',
                'Schedule pickup/delivery',
                'Process credit note'
            ]
        }, { status: 200 });
    }
    catch (error) {
        console.error('Return to supplier error:', error);
        return server_1.NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map