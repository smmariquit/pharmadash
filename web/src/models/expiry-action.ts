export type ExpiryActionType = 'RETURN' | 'DONATE' | 'MARKDOWN' | 'DISPOSE';
export type ExpiryActionStatus = 'PENDING' | 'PAPERWORK_SENT' | 'COMPLETED' | 'CANCELLED';

export interface ExpiryAction {
  _id: string;          // Composite ID: store_id:EXP_ACT:product_id:lot_no
  store_id: string;
  batch_id: string;     // Reference to Batch._id
  action: ExpiryActionType;
  target: {
    supplier_id?: string;
    organization_id?: string;
    markdown_pct?: number;
  };
  decision_basis: string[];
  ts: number;           // Unix timestamp
  status: ExpiryActionStatus;
}

// Sample expiry action data
export const sampleExpiryAction: ExpiryAction = {
  _id: "store_123:EXP_ACT:PARA500T10:LOT2025A",
  store_id: "store_123",
  batch_id: "store_123:PARA500T10:LOT2025A",
  action: "RETURN",
  target: {
    supplier_id: "sup_unilab"
  },
  decision_basis: ["<=90d", "slow_mover"],
  ts: 1733500000,
  status: "PAPERWORK_SENT"
};

