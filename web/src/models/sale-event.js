"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleSaleEvent = void 0;
const common_1 = require("./common");
// Sample sale event data
exports.sampleSaleEvent = {
    _id: "store_123:SALE_2025-09-29T10:05:14Z_0001",
    store_id: "store_123",
    ts: "2025-09-29T10:05:14Z",
    lines: [
        {
            product_id: "store_123:paracetamol_500_tab_10s",
            batch_id: "store_123:PARA500T10:LOT2025A",
            qty: 5,
            unit_price: 2.5,
            discount: 0
        }
    ],
    tenders: [
        {
            method: "cash",
            amount: 12.5
        }
    ],
    totals: {
        gross: 12.5,
        vat: 1.34,
        net: 11.16
    },
    pos_id: "POS01",
    offline: false
};
//# sourceMappingURL=sale-event.js.map