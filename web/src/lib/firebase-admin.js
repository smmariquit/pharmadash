"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDb = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
if (!(0, app_1.getApps)().length) {
    (0, app_1.initializeApp)({
        credential: (0, app_1.cert)("../web/src/firebase-admin-key.json"),
    });
}
exports.adminDb = (0, firestore_1.getFirestore)();
//# sourceMappingURL=firebase-admin.js.map