"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleExpiryAction = void 0;
// Sample expiry action data
exports.sampleExpiryAction = {
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
//# sourceMappingURL=expiry-action.js.map