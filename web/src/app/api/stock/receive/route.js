"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const stock_operations_1 = require("@/types/stock-operations");
// Stock Receive API - POST /api/stock/receive
async function POST(request) {
    try {
        const body = await request.json();
        // Validation
        if (!body.po_id) {
            return server_1.NextResponse.json({ success: false, message: 'Purchase Order ID is required' }, { status: 400 });
        }
        if (!body.lines || body.lines.length === 0) {
            return server_1.NextResponse.json({ success: false, message: 'At least one line item is required' }, { status: 400 });
        }
        if (!body.received_by) {
            return server_1.NextResponse.json({ success: false, message: 'Received by user is required' }, { status: 400 });
        }
        // Validate each line item
        for (const [index, line] of body.lines.entries()) {
            if (!line.product_id) {
                return server_1.NextResponse.json({ success: false, message: `Product ID is required for line ${index + 1}` }, { status: 400 });
            }
            if (!line.lot_no) {
                return server_1.NextResponse.json({ success: false, message: `Lot number is required for line ${index + 1}` }, { status: 400 });
            }
            if (!line.expiry) {
                return server_1.NextResponse.json({ success: false, message: `Expiry date is required for line ${index + 1}` }, { status: 400 });
            }
            if (line.qty_received <= 0) {
                return server_1.NextResponse.json({ success: false, message: `Quantity received must be positive for line ${index + 1}` }, { status: 400 });
            }
            if (line.unit_cost <= 0) {
                return server_1.NextResponse.json({ success: false, message: `Unit cost must be positive for line ${index + 1}` }, { status: 400 });
            }
            // Validate expiry date is in the future
            const expiryDate = new Date(line.expiry);
            if (expiryDate <= new Date()) {
                return server_1.NextResponse.json({ success: false, message: `Expiry date must be in the future for line ${index + 1}` }, { status: 400 });
            }
        }
        // Process stock receipt
        const store_id = "store_123"; // In real implementation, get from auth context
        const timestamp = new Date().toISOString();
        const grn_id = `${store_id}:GRN${Date.now()}`;
        // Create batch records and stock movements
        const batchesCreated = [];
        const movementsCreated = [];
        for (const line of body.lines) {
            // Create new batch
            const batch_id = `${store_id}:${line.product_id.split(':').pop()}:${line.lot_no}`;
            const batch = {
                _id: batch_id,
                store_id,
                product_id: line.product_id,
                lot_no: line.lot_no,
                expiry: line.expiry,
                unit_cost: line.unit_cost,
                qty_on_hand: line.qty_received,
                received_at: Math.floor(Date.now() / 1000),
                po_id: body.po_id
            };
            batchesCreated.push(batch);
            // Create stock movement
            const movement = {
                _id: `${store_id}:MOV:${timestamp}:${Math.random().toString(36).substr(2, 9)}`,
                store_id,
                movement_type: 'RECEIVE',
                product_id: line.product_id,
                batch_id,
                quantity_change: line.qty_received,
                reference_document_id: grn_id,
                reference_document_type: 'GRN',
                reason: 'Goods receipt against PO',
                unit_cost: line.unit_cost,
                timestamp,
                created_by: body.received_by,
                notes: body.notes
            };
            movementsCreated.push(movement);
        }
        // Create GRN event
        const grn_event = {
            _id: grn_id,
            store_id,
            po_id: body.po_id,
            ts: Math.floor(Date.now() / 1000),
            lines: body.lines.map(line => ({
                product_id: line.product_id,
                lot_no: line.lot_no,
                expiry: line.expiry,
                qty: line.qty_received,
                unit_cost: line.unit_cost
            })),
            discrepancies: [], // Would be populated if qty differs from PO
            received_by: body.received_by,
            notes: body.notes
        };
        // Create audit log
        const audit_log = {
            _id: `${store_id}:AUD:${timestamp}:STOCK_RECEIVE`,
            store_id,
            actor: body.received_by,
            action: 'STOCK_RECEIVE',
            entity: 'grn_events',
            entity_id: grn_id,
            before: null,
            after: grn_event,
            ts: timestamp
        };
        // In a real implementation, save to database:
        // await saveToDatabase('batches', batchesCreated);
        // await saveToDatabase('stock_movements', movementsCreated);
        // await saveToDatabase('grn_events', grn_event);
        // await saveToDatabase('audit_logs', audit_log);
        // await updateProductStockCache(body.lines);
        return server_1.NextResponse.json({
            success: true,
            operation_id: grn_id,
            message: `Successfully received ${body.lines.length} line items against PO ${body.po_id}`,
            grn_event,
            batches_created: batchesCreated.length,
            movements_created: movementsCreated.length,
            audit_log_id: audit_log._id
        }, { status: 200 });
    }
    catch (error) {
        console.error('Stock receive error:', error);
        return server_1.NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map