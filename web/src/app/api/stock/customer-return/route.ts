import { NextRequest, NextResponse } from 'next/server';
import { CustomerReturnRequest } from '@/types/stock-operations';

// Customer Return API - POST /api/stock/customer-return
export async function POST(request: NextRequest) {
  try {
    const body: CustomerReturnRequest = await request.json();

    // Validation
    if (!body.return_type) {
      return NextResponse.json(
        { success: false, message: 'Return type is required' },
        { status: 400 }
      );
    }

    const validReturnTypes = ['DEFECTIVE', 'WRONG_ITEM', 'EXPIRED', 'CUSTOMER_CHANGE_MIND'];
    if (!validReturnTypes.includes(body.return_type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid return type' },
        { status: 400 }
      );
    }

    if (!body.lines || body.lines.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one line item is required' },
        { status: 400 }
      );
    }

    if (!body.action) {
      return NextResponse.json(
        { success: false, message: 'Return action is required' },
        { status: 400 }
      );
    }

    const validActions = ['REFUND', 'EXCHANGE', 'STORE_CREDIT'];
    if (!validActions.includes(body.action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid return action' },
        { status: 400 }
      );
    }

    // Validate each line item
    for (const [index, line] of body.lines.entries()) {
      if (!line.product_id) {
        return NextResponse.json(
          { success: false, message: `Product ID is required for line ${index + 1}` },
          { status: 400 }
        );
      }
      if (line.quantity <= 0) {
        return NextResponse.json(
          { success: false, message: `Quantity must be positive for line ${index + 1}` },
          { status: 400 }
        );
      }
      if (line.unit_price <= 0) {
        return NextResponse.json(
          { success: false, message: `Unit price must be positive for line ${index + 1}` },
          { status: 400 }
        );
      }
      if (!line.reason) {
        return NextResponse.json(
          { success: false, message: `Reason is required for line ${index + 1}` },
          { status: 400 }
      );
      }
    }

    // Check if supervisor approval is required for refunds
    const totalRefundAmount = body.lines.reduce((sum, line) => sum + (line.quantity * line.unit_price), 0);
    const refundThreshold = 1000; // In real implementation, get from config
    if (body.action === 'REFUND' && totalRefundAmount > refundThreshold && !body.supervisor_approval) {
      return NextResponse.json(
        { success: false, message: 'Supervisor approval required for large refunds' },
        { status: 400 }
      );
    }

    // Process customer return
    const store_id = "store_123"; // In real implementation, get from auth context
    const timestamp = new Date().toISOString();
    const return_id = `${store_id}:CRET${Date.now()}`;

    // Create stock movements
    const movementsCreated = [];
    let shouldReturnToStock = false;

    // Determine if items should return to stock based on return type and condition
    switch (body.return_type) {
      case 'WRONG_ITEM':
      case 'CUSTOMER_CHANGE_MIND':
        shouldReturnToStock = true; // Generally safe to return to stock
        break;
      case 'DEFECTIVE':
      case 'EXPIRED':
        shouldReturnToStock = false; // Should be quarantined or disposed
        break;
    }

    for (const line of body.lines) {
      // Create stock movement
      const movement = {
        _id: `${store_id}:MOV:${timestamp}:${Math.random().toString(36).substr(2, 9)}`,
        store_id,
        movement_type: 'CUSTOMER_RETURN',
        product_id: line.product_id,
        quantity_change: shouldReturnToStock ? line.quantity : 0, // Only add to stock if safe
        reference_document_id: return_id,
        reference_document_type: 'RETURN',
        reason: `Customer return: ${body.return_type} - ${line.reason}`,
        unit_cost: line.unit_price,
        timestamp,
        created_by: 'customer_service',
        notes: body.notes
      };
      movementsCreated.push(movement);
    }

    // Create customer return record
    const return_record = {
      _id: return_id,
      store_id,
      original_sale_id: body.original_sale_id,
      return_type: body.return_type,
      lines: body.lines,
      customer_info: body.customer_info,
      action: body.action,
      supervisor_approval: body.supervisor_approval,
      notes: body.notes,
      total_amount: totalRefundAmount,
      returned_to_stock: shouldReturnToStock,
      status: 'COMPLETED',
      processed_by: 'customer_service',
      timestamp
    };

    // Create audit log
    const audit_log = {
      _id: `${store_id}:AUD:${timestamp}:CUSTOMER_RETURN`,
      store_id,
      actor: 'customer_service',
      action: 'CUSTOMER_RETURN',
      entity: 'customer_returns',
      entity_id: return_id,
      before: null,
      after: return_record,
      ts: timestamp
    };

    // Generate financial transaction if refund
    let financial_transaction = null;
    if (body.action === 'REFUND') {
      financial_transaction = {
        _id: `${store_id}:FIN:${timestamp}:REFUND`,
        type: 'REFUND',
        amount: totalRefundAmount,
        reference_id: return_id,
        status: 'PENDING',
        method: 'CASH', // In real implementation, get payment method
        timestamp
      };
    }

    // In a real implementation:
    // 1. Validate original sale if sale_id provided
    // 2. Check return policy and time limits
    // 3. Process refund through payment system
    // 4. Update inventory appropriately
    // 5. Generate return receipt
    // if (body.original_sale_id) {
    //   await validateOriginalSale(body.original_sale_id, body.lines);
    // }
    // if (shouldReturnToStock) {
    //   await updateInventoryFromReturn(body.lines);
    // } else {
    //   await quarantineItems(body.lines, body.return_type);
    // }
    // await saveToDatabase('customer_returns', return_record);
    // await saveToDatabase('stock_movements', movementsCreated);
    // await saveToDatabase('audit_logs', audit_log);
    // if (financial_transaction) {
    //   await processRefund(financial_transaction);
    // }

    return NextResponse.json({
      success: true,
      operation_id: return_id,
      message: `Customer return processed for ${body.lines.length} items`,
      return_record,
      movements_created: movementsCreated.length,
      returned_to_stock: shouldReturnToStock,
      refund_amount: body.action === 'REFUND' ? totalRefundAmount : 0,
      financial_transaction,
      audit_log_id: audit_log._id,
      warnings: !shouldReturnToStock ? [
        `Items marked as ${body.return_type} - not returned to stock`,
        'Items should be quarantined and properly disposed'
      ] : undefined
    }, { status: 200 });

  } catch (error) {
    console.error('Customer return error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}