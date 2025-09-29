// Export all types and sample data
export * from './common';
export * from './product';
export * from './batch';
export * from './sale-event';
export * from './purchase-order';
export * from './grn-event';
export * from './forecast-snapshot';
export * from './recommendation';
export * from './expiry-action';
export * from './audit-log';

// Re-export types from types directory for convenience
export type { 
  StockReceiveRequest,
  StockAdjustmentRequest,
  ReturnToSupplierRequest,
  CustomerReturnRequest,
  CycleCountRequest,
  StockMovement,
  StockMovementQuery,
  StockOperationResponse,
  StockMovementsResponse,
  FEFOBatch,
  StockValidationError,
  StockValidationResult
} from '../types/stock-operations';

// Sample data collection for initialization
export const sampleData = {
  products: [],
  batches: [],
  sales_events: [],
  purchase_orders: [],
  grn_events: [],
  forecast_snapshots: [],
  recommendations: [],
  expiry_actions: [],
  audit_logs: []
};

