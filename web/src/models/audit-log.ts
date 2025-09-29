import { COLLECTIONS } from './common';

export interface AuditLog {
  _id: string;          // Composite ID: store_id:AUD:timestamp:action
  store_id: string;
  actor: string;        // User or system identifier
  action: string;       // Action performed
  entity: keyof typeof COLLECTIONS;
  entity_id: string;    // Reference to affected document
  before: any | null;   // Previous state (if applicable)
  after: any | null;    // New state (if applicable)
  ts: string;          // ISO datetime string
}

// Sample audit log data
export const sampleAuditLog: AuditLog = {
  _id: "store_123:AUD:2025-09-29T10:05:20Z:SALE",
  store_id: "store_123",
  actor: "user_pharmacy",
  action: "SALE_POSTED",
  entity: "sales_events",
  entity_id: "store_123:SALE_2025-09-29T10:05:14Z_0001",
  before: null,
  after: {
    totals: {
      net: 11.16
    }
  },
  ts: "2025-09-29T10:05:20Z"
};

