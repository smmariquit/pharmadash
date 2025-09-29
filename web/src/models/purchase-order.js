"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.samplePurchaseOrder = void 0;
// Sample purchase order data
exports.samplePurchaseOrder = {
    _id: "store_123:PO00087",
    store_id: "store_123",
    status: "SENT",
    supplier_id: "sup_unilab",
    lines: [
        {
            product_id: "store_123:paracetamol_500_tab_10s",
            qty: 500,
            unit_cost: 1.7
        }
    ],
    budget_cycle_id: "store_123:2025W39",
    created_at: 1733000000,
    sent_via: ["email"],
    totals: {
        items: 500,
        amount: 850
    }
};
//# sourceMappingURL=purchase-order.js.map