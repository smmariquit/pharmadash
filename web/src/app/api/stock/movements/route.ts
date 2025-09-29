import { NextRequest, NextResponse } from 'next/server';
import { StockMovementsResponse, StockMovement, StockMovementQuery } from '@/types/stock-operations';

// Stock Movements API - GET /api/stock/movements
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Parse query parameters
    const query: StockMovementQuery = {
      product_id: searchParams.get('product_id') || undefined,
      batch_id: searchParams.get('batch_id') || undefined,
      movement_type: searchParams.get('movement_type') || undefined,
      date_from: searchParams.get('date_from') || undefined,
      date_to: searchParams.get('date_to') || undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0')
    };

    // Validate query parameters
    if (query.limit && (query.limit < 1 || query.limit > 1000)) {
      return NextResponse.json(
        { success: false, message: 'Limit must be between 1 and 1000' },
        { status: 400 }
      );
    }

    if (query.offset && query.offset < 0) {
      return NextResponse.json(
        { success: false, message: 'Offset must be non-negative' },
        { status: 400 }
      );
    }

    // Validate movement type if provided
    if (query.movement_type) {
      const validTypes = ['RECEIVE', 'SALE', 'ADJUSTMENT', 'RETURN_TO_SUPPLIER', 'CUSTOMER_RETURN', 'CYCLE_COUNT', 'TRANSFER'];
      if (!validTypes.includes(query.movement_type)) {
        return NextResponse.json(
          { success: false, message: 'Invalid movement type' },
          { status: 400 }
        );
      }
    }

    // Validate date range
    if (query.date_from && query.date_to) {
      const fromDate = new Date(query.date_from);
      const toDate = new Date(query.date_to);
      
      if (fromDate > toDate) {
        return NextResponse.json(
          { success: false, message: 'date_from cannot be after date_to' },
          { status: 400 }
        );
      }

      // Limit date range to prevent performance issues
      const daysDifference = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDifference > 365) {
        return NextResponse.json(
          { success: false, message: 'Date range cannot exceed 365 days' },
          { status: 400 }
        );
      }
    }

    const store_id = "store_123"; // In real implementation, get from auth context

    // In a real implementation, this would query the database with filters
    // For this mock, generate sample data based on the query
    const sampleMovements: StockMovement[] = [
      {
        _id: `${store_id}:MOV:2025-09-29T10:00:00Z:ABC123`,
        store_id,
        movement_type: 'RECEIVE',
        product_id: 'store_123:paracetamol_500_tab_10s',
        batch_id: 'store_123:PARA500T10:LOT2025A',
        quantity_change: 500,
        reference_document_id: 'store_123:GRN00087',
        reference_document_type: 'PO',
        reason: 'Goods receipt against PO',
        unit_cost: 1.7,
        timestamp: '2025-09-29T10:00:00Z',
        created_by: 'user_pharmacy',
        notes: 'Regular stock receipt'
      },
      {
        _id: `${store_id}:MOV:2025-09-29T14:30:00Z:DEF456`,
        store_id,
        movement_type: 'SALE',
        product_id: 'store_123:paracetamol_500_tab_10s',
        batch_id: 'store_123:PARA500T10:LOT2025A',
        quantity_change: -10,
        reference_document_id: 'store_123:SALE_2025-09-29T14:30:00Z_0001',
        reference_document_type: 'SALE',
        reason: 'Customer purchase',
        unit_cost: 1.7,
        timestamp: '2025-09-29T14:30:00Z',
        created_by: 'pos_system',
        notes: undefined
      },
      {
        _id: `${store_id}:MOV:2025-09-29T16:15:00Z:GHI789`,
        store_id,
        movement_type: 'ADJUSTMENT',
        product_id: 'store_123:paracetamol_500_tab_10s',
        batch_id: 'store_123:PARA500T10:LOT2025A',
        quantity_change: -2,
        reference_document_id: 'store_123:ADJ1733000000',
        reference_document_type: 'ADJUSTMENT',
        reason: 'DAMAGE: Broken tablets found during inspection',
        unit_cost: 1.7,
        timestamp: '2025-09-29T16:15:00Z',
        created_by: 'user_pharmacy',
        notes: 'Damaged during transport'
      }
    ];

    // Filter movements based on query parameters
    let filteredMovements = sampleMovements.filter(movement => {
      if (query.product_id && movement.product_id !== query.product_id) return false;
      if (query.batch_id && movement.batch_id !== query.batch_id) return false;
      if (query.movement_type && movement.movement_type !== query.movement_type) return false;
      
      if (query.date_from) {
        const movementDate = new Date(movement.timestamp);
        const fromDate = new Date(query.date_from);
        if (movementDate < fromDate) return false;
      }
      
      if (query.date_to) {
        const movementDate = new Date(movement.timestamp);
        const toDate = new Date(query.date_to);
        toDate.setHours(23, 59, 59, 999); // Include entire day
        if (movementDate > toDate) return false;
      }
      
      return true;
    });

    // Apply pagination
    const totalCount = filteredMovements.length;
    const offset = query.offset || 0;
    const limit = query.limit || 50;
    
    filteredMovements = filteredMovements
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Most recent first
      .slice(offset, offset + limit);

    // Calculate summary statistics
    const summary = {
      total_movements: totalCount,
      movements_returned: filteredMovements.length,
      has_more: (offset + limit) < totalCount,
      date_range: {
        from: query.date_from || 'all',
        to: query.date_to || 'all'
      },
      movement_types: [...new Set(filteredMovements.map(m => m.movement_type))],
      net_quantity_change: filteredMovements.reduce((sum, m) => sum + m.quantity_change, 0)
    };

    const response: StockMovementsResponse = {
      movements: filteredMovements,
      total_count: totalCount,
      has_more: summary.has_more
    };

    return NextResponse.json({
      success: true,
      ...response,
      summary,
      query_applied: query
    }, { status: 200 });

  } catch (error) {
    console.error('Get stock movements error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method to create bulk movements (for data migration, etc.)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // This could be used for bulk import of historical movements
    if (!body.movements || !Array.isArray(body.movements)) {
      return NextResponse.json(
        { success: false, message: 'Movements array is required' },
        { status: 400 }
      );
    }

    // In a real implementation, validate and save bulk movements
    // This is typically used for data migration or batch operations
    
    return NextResponse.json(
      { success: false, message: 'Bulk movement creation not implemented in this demo' },
      { status: 501 }
    );

  } catch (error) {
    console.error('Bulk movements error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}