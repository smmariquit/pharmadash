"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const stock_operations_1 = require("@/types/stock-operations");
// Cycle Count API - POST /api/stock/cycle-count
async function POST(request) {
    try {
        const body = await request.json();
        // Validation
        if (!body.count_date) {
            return server_1.NextResponse.json({ success: false, message: 'Count date is required' }, { status: 400 });
        }
        if (!body.counted_by) {
            return server_1.NextResponse.json({ success: false, message: 'Counted by user is required' }, { status: 400 });
        }
        if (!body.count_type) {
            return server_1.NextResponse.json({ success: false, message: 'Count type is required' }, { status: 400 });
        }
        const validCountTypes = ['FULL', 'PARTIAL', 'ABC_CLASS'];
        if (!validCountTypes.includes(body.count_type)) {
            return server_1.NextResponse.json({ success: false, message: 'Invalid count type' }, { status: 400 });
        }
        if (!body.items || body.items.length === 0) {
            return server_1.NextResponse.json({ success: false, message: 'At least one item to count is required' }, { status: 400 });
        }
        // Validate each counted item
        for (const [index, item] of body.items.entries()) {
            if (!item.product_id) {
                return server_1.NextResponse.json({ success: false, message: `Product ID is required for item ${index + 1}` }, { status: 400 });
            }
            if (item.system_qty < 0) {
                return server_1.NextResponse.json({ success: false, message: `System quantity cannot be negative for item ${index + 1}` }, { status: 400 });
            }
            if (item.counted_qty < 0) {
                return server_1.NextResponse.json({ success: false, message: `Counted quantity cannot be negative for item ${index + 1}` }, { status: 400 });
            }
            // Calculate variance if not provided
            if (item.variance === undefined) {
                item.variance = item.counted_qty - item.system_qty;
            }
        }
        // Check for large variances that might need supervisor approval
        const largeVarianceThreshold = 50; // In real implementation, get from config
        const largeVariances = body.items.filter(item => Math.abs(item.variance) > largeVarianceThreshold);
        if (largeVariances.length > 0 && !body.supervisor_verified) {
            return server_1.NextResponse.json({
                success: false,
                message: 'Supervisor verification required for large variances',
                large_variances: largeVariances.map(item => ({
                    product_id: item.product_id,
                    variance: item.variance,
                    percentage: Math.round((item.variance / Math.max(item.system_qty, 1)) * 100)
                }))
            }, { status: 400 });
        }
        // Process cycle count
        const store_id = "store_123"; // In real implementation, get from auth context
        const timestamp = new Date().toISOString();
        const count_id = `${store_id}:COUNT${Date.now()}`;
        // Create stock movements for items with variances
        const movementsCreated = [];
        const adjustmentsCreated = [];
        const itemsWithVariances = body.items.filter(item => item.variance !== 0);
        for (const item of itemsWithVariances) {
            // Create stock movement for variance
            const movement = {
                _id: `${store_id}:MOV:${timestamp}:${Math.random().toString(36).substr(2, 9)}`,
                store_id,
                movement_type: 'CYCLE_COUNT',
                product_id: item.product_id,
                batch_id: item.batch_id,
                quantity_change: item.variance,
                reference_document_id: count_id,
                reference_document_type: 'CYCLE_COUNT',
                reason: `Cycle count variance: System ${item.system_qty}, Counted ${item.counted_qty}`,
                timestamp,
                created_by: body.counted_by,
                notes: item.notes
            };
            movementsCreated.push(movement);
            // Create adjustment record
            const adjustment = {
                _id: `${store_id}:ADJ:${count_id}:${item.product_id}`,
                store_id,
                product_id: item.product_id,
                batch_id: item.batch_id,
                adjustment_type: 'COUNT_VARIANCE',
                quantity_change: item.variance,
                reason: `Cycle count adjustment`,
                adjusted_by: body.counted_by,
                cycle_count_id: count_id,
                variance_percentage: Math.round((item.variance / Math.max(item.system_qty, 1)) * 100),
                notes: item.notes,
                timestamp
            };
            adjustmentsCreated.push(adjustment);
        }
        // Create cycle count record
        const count_record = {
            _id: count_id,
            store_id,
            count_date: body.count_date,
            counted_by: body.counted_by,
            location: body.location,
            count_type: body.count_type,
            supervisor_verified: body.supervisor_verified,
            items: body.items,
            summary: {
                total_items_counted: body.items.length,
                items_with_variances: itemsWithVariances.length,
                total_variance_value: itemsWithVariances.reduce((sum, item) => {
                    // Estimate value impact (would need unit cost from product)
                    return sum + Math.abs(item.variance);
                }, 0),
                accuracy_percentage: Math.round(((body.items.length - itemsWithVariances.length) / body.items.length) * 100)
            },
            status: 'COMPLETED',
            timestamp
        };
        // Create audit log
        const audit_log = {
            _id: `${store_id}:AUD:${timestamp}:CYCLE_COUNT`,
            store_id,
            actor: body.counted_by,
            action: 'CYCLE_COUNT',
            entity: 'cycle_counts',
            entity_id: count_id,
            before: null,
            after: count_record,
            ts: timestamp
        };
        // Generate variance analysis
        const variance_analysis = {
            total_items: body.items.length,
            items_with_variances: itemsWithVariances.length,
            accuracy_rate: count_record.summary.accuracy_percentage,
            largest_positive_variance: itemsWithVariances.length > 0 ?
                Math.max(...itemsWithVariances.map(item => item.variance)) : 0,
            largest_negative_variance: itemsWithVariances.length > 0 ?
                Math.min(...itemsWithVariances.map(item => item.variance)) : 0,
            recommendations: []
        };
        // Add recommendations based on variance patterns
        if (variance_analysis.accuracy_rate < 95) {
            variance_analysis.recommendations.push('Consider additional staff training on counting procedures');
        }
        if (largeVariances.length > 0) {
            variance_analysis.recommendations.push('Review security procedures for high-variance items');
        }
        if (itemsWithVariances.length > body.items.length * 0.2) {
            variance_analysis.recommendations.push('Consider more frequent cycle counts for this location');
        }
        // In a real implementation:
        // 1. Update batch quantities for items with variances
        // 2. Update product stock cache
        // 3. Generate variance reports
        // 4. Schedule follow-up counts for high-variance items
        // for (const item of itemsWithVariances) {
        //   if (item.batch_id) {
        //     await updateBatchQuantity(item.batch_id, item.variance);
        //   }
        //   await updateProductStockCache(item.product_id, item.variance);
        // }
        // await saveToDatabase('cycle_counts', count_record);
        // await saveToDatabase('stock_movements', movementsCreated);
        // await saveToDatabase('stock_adjustments', adjustmentsCreated);
        // await saveToDatabase('audit_logs', audit_log);
        return server_1.NextResponse.json({
            success: true,
            operation_id: count_id,
            message: `Cycle count completed with ${itemsWithVariances.length} adjustments out of ${body.items.length} items counted`,
            count_record,
            movements_created: movementsCreated.length,
            adjustments_created: adjustmentsCreated.length,
            variance_analysis,
            audit_log_id: audit_log._id,
            warnings: largeVariances.length > 0 ? [
                `${largeVariances.length} items have large variances that require investigation`
            ] : undefined
        }, { status: 200 });
    }
    catch (error) {
        console.error('Cycle count error:', error);
        return server_1.NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map