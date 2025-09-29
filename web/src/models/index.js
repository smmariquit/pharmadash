"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleData = void 0;
// Export all types and sample data
__exportStar(require("./common"), exports);
__exportStar(require("./product"), exports);
__exportStar(require("./batch"), exports);
__exportStar(require("./sale-event"), exports);
__exportStar(require("./purchase-order"), exports);
__exportStar(require("./grn-event"), exports);
__exportStar(require("./forecast-snapshot"), exports);
__exportStar(require("./recommendation"), exports);
__exportStar(require("./expiry-action"), exports);
__exportStar(require("./audit-log"), exports);
// Sample data collection for initialization
exports.sampleData = {
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
//# sourceMappingURL=index.js.map