# Stock Operations API Documentation

This document describes the Stock Operations APIs implemented for PharmaDash, based on the Product Requirements Document (PRD).

## Overview

The Stock Operations API provides endpoints for managing inventory movements, stock adjustments, and related operations critical to pharmacy inventory management. All operations follow FEFO (First Expire First Out) principles and maintain comprehensive audit trails.

## API Endpoints

### 1. POST /api/stock/receive
**Purpose**: Receive goods against a Purchase Order (PO)

**Request Body**:
```typescript
{
  po_id: string;           // Purchase Order ID
  supplier_id: string;     // Supplier identifier
  lines: Array<{
    product_id: string;    // Product identifier
    lot_no: string;        // Batch/lot number
    expiry: string;        // Expiry date (ISO format)
    qty_received: number;  // Quantity received
    unit_cost: number;     // Cost per unit
  }>;
  notes?: string;          // Optional notes
  received_by: string;     // User who received the goods
}
```

**Response**:
```typescript
{
  success: boolean;
  operation_id: string;           // GRN ID
  message: string;
  grn_event: object;             // Goods Receipt Note details
  batches_created: number;       // Count of batches created
  movements_created: number;     // Count of stock movements
  audit_log_id: string;
}
```

**Business Logic**:
- Creates new batch records for each received item
- Updates product stock levels
- Generates stock movements (positive quantities)
- Creates immutable audit trail
- Validates expiry dates are in the future

### 2. POST /api/stock/adjust
**Purpose**: Record stock adjustments for damage, theft, variance, etc.

**Request Body**:
```typescript
{
  product_id: string;
  batch_id?: string;               // Optional specific batch
  adjustment_type: 'DAMAGE' | 'THEFT' | 'COUNT_VARIANCE' | 'WRITE_OFF' | 'FOUND';
  quantity_change: number;         // Positive or negative
  reason: string;                  // Detailed reason
  approval_code?: string;          // Required for large adjustments
  adjusted_by: string;             // User making adjustment
  notes?: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  operation_id: string;
  message: string;
  adjustment_record: object;
  movement_created: object;
  audit_log_id: string;
  warning?: string;               // For large adjustments
}
```

**Business Logic**:
- Validates adjustment types and quantities
- Requires approval for adjustments above threshold
- Updates batch quantities and product stock cache
- Creates adjustment and movement records
- Maintains detailed audit trail

### 3. POST /api/stock/return-to-supplier
**Purpose**: Process returns to suppliers (expired, damaged, overstocked items)

**Request Body**:
```typescript
{
  supplier_id: string;
  return_type: 'EXPIRED' | 'DAMAGED' | 'OVERSTOCKED' | 'QUALITY_ISSUE';
  lines: Array<{
    batch_id: string;
    product_id: string;
    quantity: number;
    reason: string;
  }>;
  reference_document?: string;     // External reference
  notes?: string;
  requested_by: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  operation_id: string;
  message: string;
  rts_record: object;
  movements_created: number;
  expiry_actions_created: number;
  audit_log_id: string;
  next_steps: string[];           // Process workflow steps
}
```

**Business Logic**:
- Validates batch availability
- Creates expiry action records
- Generates outbound stock movements (negative quantities)
- Tracks return workflow status
- Integrates with supplier return processes

### 4. POST /api/stock/customer-return
**Purpose**: Handle customer returns with appropriate stock disposition

**Request Body**:
```typescript
{
  original_sale_id?: string;       // Optional reference to original sale
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
  supervisor_approval?: string;    // Required for large refunds
  notes?: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  operation_id: string;
  message: string;
  return_record: object;
  movements_created: number;
  returned_to_stock: boolean;      // Whether items returned to inventory
  refund_amount: number;
  financial_transaction?: object;
  audit_log_id: string;
  warnings?: string[];
}
```

**Business Logic**:
- Determines if items should return to stock based on condition
- Processes refunds through financial system
- Quarantines defective/expired items
- Requires supervisor approval for large refunds
- Maintains customer return history

### 5. POST /api/stock/cycle-count
**Purpose**: Record cycle count results and process variances

**Request Body**:
```typescript
{
  count_date: string;              // Date of count
  counted_by: string;              // User who performed count
  location?: string;               // Storage location
  items: Array<{
    product_id: string;
    batch_id?: string;
    system_qty: number;            // System quantity
    counted_qty: number;           // Actually counted quantity
    variance: number;              // Calculated difference
    notes?: string;
  }>;
  count_type: 'FULL' | 'PARTIAL' | 'ABC_CLASS';
  supervisor_verified?: boolean;   // Required for large variances
}
```

**Response**:
```typescript
{
  success: boolean;
  operation_id: string;
  message: string;
  count_record: object;
  movements_created: number;
  adjustments_created: number;
  variance_analysis: {
    total_items: number;
    items_with_variances: number;
    accuracy_rate: number;
    largest_positive_variance: number;
    largest_negative_variance: number;
    recommendations: string[];
  };
  audit_log_id: string;
  warnings?: string[];
}
```

**Business Logic**:
- Calculates variances between system and counted quantities
- Requires supervisor verification for large variances
- Creates stock movements for all variances
- Generates accuracy analysis and recommendations
- Updates inventory to match counted quantities

### 6. GET /api/stock/movements
**Purpose**: Retrieve stock movement history with filtering

**Query Parameters**:
- `product_id` (optional): Filter by specific product
- `batch_id` (optional): Filter by specific batch
- `movement_type` (optional): Filter by movement type
- `date_from` (optional): Start date filter (ISO format)
- `date_to` (optional): End date filter (ISO format)
- `limit` (optional): Number of results (1-1000, default 50)
- `offset` (optional): Pagination offset (default 0)

**Response**:
```typescript
{
  success: boolean;
  movements: StockMovement[];
  total_count: number;
  has_more: boolean;
  summary: {
    total_movements: number;
    movements_returned: number;
    has_more: boolean;
    date_range: object;
    movement_types: string[];
    net_quantity_change: number;
  };
  query_applied: object;
}
```

**Business Logic**:
- Returns movements in reverse chronological order (most recent first)
- Supports comprehensive filtering and pagination
- Includes summary statistics
- Limits date range to prevent performance issues
- Validates all query parameters

## Common Features

### Validation
All endpoints implement comprehensive input validation:
- Required field checks
- Type validation (positive numbers, valid enums)
- Business rule validation (expiry dates, approval thresholds)
- Referential integrity checks

### Audit Trail
Every operation creates immutable audit log entries:
- Actor identification (who performed the action)
- Timestamp (when the action occurred)
- Before/after states (what changed)
- Action type and entity affected

### Error Handling
Consistent error response format:
```typescript
{
  success: false;
  message: string;          // Human-readable error description
  error_code?: string;      // Machine-readable error code
  validation_errors?: object[]; // Field-specific validation errors
}
```

### Stock Movement Tracking
All operations that affect inventory create stock movement records:
- Unique movement ID
- Movement type classification
- Quantity change (positive for inbound, negative for outbound)
- Reference to source document
- Timestamp and actor information

## Integration Points

### With Batch Management
- FEFO (First Expire First Out) picking logic
- Batch quantity updates
- Expiry date tracking and alerts

### With Product Catalog
- Product stock cache updates
- ABC classification impact
- Reorder point calculations

### With Financial System
- Cost of goods sold (COGS) tracking
- Inventory valuation adjustments
- Refund processing

### With Audit System
- Comprehensive audit trail
- Regulatory compliance reporting
- Change tracking and accountability

## Implementation Notes

### Database Considerations
- Use transactions for multi-step operations
- Implement optimistic concurrency for batch updates
- Index frequently queried fields (product_id, timestamp, movement_type)
- Consider partitioning by store_id for multi-tenant deployments

### Performance Optimizations
- Denormalize frequently accessed data
- Cache product stock levels
- Batch database operations where possible
- Implement proper pagination for large result sets

### Security Considerations
- Validate all user inputs
- Require authentication for all operations
- Implement role-based authorization
- Audit all security-sensitive operations

This API implementation provides the foundation for comprehensive inventory management while maintaining the audit trail and business logic requirements specified in the PharmaDash PRD.