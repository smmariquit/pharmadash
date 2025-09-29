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

// Sample data collection for initialization
export const sampleData = {
  products: [sampleProduct],
  batches: [sampleBatch],
  sales_events: [sampleSaleEvent],
  purchase_orders: [samplePurchaseOrder],
  grn_events: [sampleGRNEvent],
  forecast_snapshots: [sampleForecastSnapshot],
  recommendations: [sampleRecommendation],
  expiry_actions: [sampleExpiryAction],
  audit_logs: [sampleAuditLog]
};

