"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const server_1 = require("next/server");
const stock_operations_1 = require("@/types/stock-operations");
const models_1 = require("@/models");
// Stock Operations Service
class StockOperationsService {
    store_id = "store_123"; // In real implementation, get from auth context
    // Generate unique operation ID
    generateOperationId(type) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '');
        return `${this.store_id}:${type}:${timestamp}`;
    }
    // Generate audit log entry
    createAuditLog(action, entity, entity_id, actor, before = null, after = null) {
        const timestamp = new Date().toISOString();
        return {
            _id: `${this.store_id}:AUD:${timestamp}:${action}`,
            store_id: this.store_id,
            actor,
            action,
            entity: entity,
            entity_id,
            before,
            after,
            ts: timestamp
        };
    }
    // Create stock movement record
    createStockMovement(type, product_id, quantity_change, created_by, batch_id, reference_document_id, reference_document_type, reason, unit_cost, notes) {
        const timestamp = new Date().toISOString();
        return {
            _id: `${this.store_id}:MOV:${timestamp}:${Math.random().toString(36).substr(2, 9)}`,
            store_id: this.store_id,
            movement_type: type,
            product_id,
            batch_id,
            quantity_change,
            reference_document_id,
            reference_document_type: reference_document_type,
            reason,
            unit_cost,
            timestamp,
            created_by,
            notes
        };
    }
    // Validate stock operation
    validateStockOperation(operation, type) {
        const errors = [];
        // Common validations
        if (!operation.store_id && !this.store_id) {
            errors.push({ field: 'store_id', message: 'Store ID is required', code: 'REQUIRED' });
        }
        // Type-specific validations
        switch (type) {
            case 'receive':
                if (!operation.po_id)
                    errors.push({ field: 'po_id', message: 'Purchase Order ID is required', code: 'REQUIRED' });
                if (!operation.lines || operation.lines.length === 0) {
                    errors.push({ field: 'lines', message: 'At least one line item is required', code: 'REQUIRED' });
                }
                break;
            case 'adjust':
                if (!operation.product_id)
                    errors.push({ field: 'product_id', message: 'Product ID is required', code: 'REQUIRED' });
                if (!operation.adjustment_type)
                    errors.push({ field: 'adjustment_type', message: 'Adjustment type is required', code: 'REQUIRED' });
                if (operation.quantity_change === 0)
                    errors.push({ field: 'quantity_change', message: 'Quantity change cannot be zero', code: 'INVALID_VALUE' });
                break;
            // Add more validations for other types...
        }
        return {
            is_valid: errors.length === 0,
            errors
        };
    }
    // Get FEFO batches for a product
    async getFEFOBatches(product_id) {
        // In real implementation, query database
        // This is a mock implementation
        const mockBatches = [
            {
                batch_id: `${this.store_id}:PARA500T10:LOT2025A`,
                product_id,
                lot_no: "LOT2025A",
                expiry: "2026-03-31",
                qty_available: 420,
                unit_cost: 1.7,
                days_to_expiry: 180
            }
        ];
        // Sort by expiry date (FEFO - First Expire First Out)
        return mockBatches.sort((a, b) => a.days_to_expiry - b.days_to_expiry);
    }
    // Receive stock against PO
    async receiveStock(request) {
        const validation = this.validateStockOperation(request, 'receive');
        if (!validation.is_valid) {
            throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
        }
        const operation_id = this.generateOperationId('RECEIVE');
        const movements = [];
        const batches_affected = [];
        // Process each line item
        for (const line of request.lines) {
            // Create new batch
            const batch_id = `${this.store_id}:${line.product_id}:${line.lot_no}`;
            batches_affected.push(batch_id);
            // Create stock movement
            const movement = this.createStockMovement('RECEIVE', line.product_id, line.qty_received, request.received_by, batch_id, request.po_id, 'PO', 'Goods receipt against PO', line.unit_cost, request.notes);
            movements.push(movement);
            // In real implementation: Create batch record and update inventory
            // await this.createBatch(batch_id, line);
            // await this.updateProductStock(line.product_id, line.qty_received);
        }
        // Create audit log
        const audit_log = this.createAuditLog('STOCK_RECEIVE', 'grn_events', operation_id, request.received_by, null, { po_id: request.po_id, lines: request.lines });
        return {
            success: true,
            operation_id,
            message: `Successfully received ${request.lines.length} line items against PO ${request.po_id}`,
            movements_created: movements,
            batches_affected,
            audit_log_id: audit_log._id
        };
    }
    // Stock adjustment
    async adjustStock(request) {
        const validation = this.validateStockOperation(request, 'adjust');
        if (!validation.is_valid) {
            throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
        }
        const operation_id = this.generateOperationId('ADJUST');
        // Create stock movement
        const movement = this.createStockMovement('ADJUSTMENT', request.product_id, request.quantity_change, request.adjusted_by, request.batch_id, operation_id, 'ADJUSTMENT', `${request.adjustment_type}: ${request.reason}`, undefined, request.notes);
        // Create audit log
        const audit_log = this.createAuditLog('STOCK_ADJUSTMENT', 'stock_adjustments', operation_id, request.adjusted_by, null, request);
        return {
            success: true,
            operation_id,
            message: `Stock adjustment of ${request.quantity_change} units completed for ${request.adjustment_type}`,
            movements_created: [movement],
            batches_affected: request.batch_id ? [request.batch_id] : [],
            audit_log_id: audit_log._id
        };
    }
    // Return to supplier
    async returnToSupplier(request) {
        const operation_id = this.generateOperationId('RTS');
        const movements = [];
        const batches_affected = [];
        // Process each line item
        for (const line of request.lines) {
            batches_affected.push(line.batch_id);
            const movement = this.createStockMovement('RETURN_TO_SUPPLIER', line.product_id, -line.quantity, // Negative for outbound
            request.requested_by, line.batch_id, operation_id, 'RETURN', `${request.return_type}: ${line.reason}`, undefined, request.notes);
            movements.push(movement);
        }
        // Create audit log
        const audit_log = this.createAuditLog('RETURN_TO_SUPPLIER', 'expiry_actions', operation_id, request.requested_by, null, request);
        return {
            success: true,
            operation_id,
            message: `Return to supplier processed for ${request.lines.length} items`,
            movements_created: movements,
            batches_affected,
            audit_log_id: audit_log._id
        };
    }
    // Customer return
    async customerReturn(request) {
        const operation_id = this.generateOperationId('CRET');
        const movements = [];
        // Process each line item
        for (const line of request.lines) {
            const movement = this.createStockMovement('CUSTOMER_RETURN', line.product_id, line.quantity, // Positive for return to stock
            'customer_service', undefined, operation_id, 'RETURN', `${request.return_type}: ${line.reason}`, line.unit_price, request.notes);
            movements.push(movement);
        }
        // Create audit log
        const audit_log = this.createAuditLog('CUSTOMER_RETURN', 'customer_returns', operation_id, 'customer_service', null, request);
        return {
            success: true,
            operation_id,
            message: `Customer return processed for ${request.lines.length} items`,
            movements_created: movements,
            batches_affected: [],
            audit_log_id: audit_log._id
        };
    }
    // Cycle count
    async cycleCount(request) {
        const operation_id = this.generateOperationId('CYCLE');
        const movements = [];
        const batches_affected = [];
        // Process each counted item
        for (const item of request.items) {
            if (item.variance !== 0) {
                if (item.batch_id)
                    batches_affected.push(item.batch_id);
                const movement = this.createStockMovement('CYCLE_COUNT', item.product_id, item.variance, request.counted_by, item.batch_id, operation_id, 'ADJUSTMENT', `Cycle count variance: System ${item.system_qty}, Counted ${item.counted_qty}`, undefined, item.notes);
                movements.push(movement);
            }
        }
        // Create audit log
        const audit_log = this.createAuditLog('CYCLE_COUNT', 'cycle_counts', operation_id, request.counted_by, null, request);
        return {
            success: true,
            operation_id,
            message: `Cycle count completed with ${movements.length} adjustments`,
            movements_created: movements,
            batches_affected,
            audit_log_id: audit_log._id
        };
    }
    // Get stock movements
    async getStockMovements(query = {}) {
        // In real implementation, query database with filters
        // This is a mock response
        const movements = [
            this.createStockMovement('RECEIVE', 'store_123:paracetamol_500_tab_10s', 500, 'user_pharmacy', 'store_123:PARA500T10:LOT2025A', 'store_123:PO00087', 'PO', 'Goods receipt against PO', 1.7)
        ];
        return {
            movements,
            total_count: movements.length,
            has_more: false
        };
    }
}
// Initialize service
const stockService = new StockOperationsService();
// Export route handlers
async function POST(request) {
    try {
        const url = new URL(request.url);
        const operation = url.pathname.split('/').pop();
        const body = await request.json();
        let result;
        switch (operation) {
            case 'receive':
                result = await stockService.receiveStock(body);
                break;
            case 'adjust':
                result = await stockService.adjustStock(body);
                break;
            case 'return-to-supplier':
                result = await stockService.returnToSupplier(body);
                break;
            case 'customer-return':
                result = await stockService.customerReturn(body);
                break;
            case 'cycle-count':
                result = await stockService.cycleCount(body);
                break;
            default:
                return server_1.NextResponse.json({ success: false, message: 'Invalid operation' }, { status: 400 });
        }
        return server_1.NextResponse.json(result, { status: 200 });
    }
    catch (error) {
        console.error('Stock operation error:', error);
        return server_1.NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
async function GET(request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        // Parse query parameters
        const query = {
            product_id: searchParams.get('product_id'),
            batch_id: searchParams.get('batch_id'),
            movement_type: searchParams.get('movement_type'),
            date_from: searchParams.get('date_from'),
            date_to: searchParams.get('date_to'),
            limit: parseInt(searchParams.get('limit') || '50'),
            offset: parseInt(searchParams.get('offset') || '0')
        };
        const result = await stockService.getStockMovements(query);
        return server_1.NextResponse.json(result, { status: 200 });
    }
    catch (error) {
        console.error('Get stock movements error:', error);
        return server_1.NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map