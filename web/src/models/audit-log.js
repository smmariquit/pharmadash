"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleAuditLog = void 0;
const common_1 = require("./common");
// Sample audit log data
exports.sampleAuditLog = {
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
//# sourceMappingURL=audit-log.js.map