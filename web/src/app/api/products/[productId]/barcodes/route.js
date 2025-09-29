"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const firebase_admin_1 = require("@/lib/firebase-admin");
const product_1 = require("@/models/product");
// POST /api/products/{productId}/barcodes - Generate/print barcodes
async function POST(request) {
    const url = new URL(request.url);
    const productId = url.pathname.split("/")[4]; // "products/[productId]/barcodes
    try {
        console.log("📥 Barcode generation request for:", productId);
        // Get the product details first
        const docRef = firebase_admin_1.adminDb.collection("products").doc(productId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            return server_1.NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        const product = docSnap.data();
        // Get print parameters from request
        const { quantity = 1, format = "pdf" } = await request.json();
        console.log("✅ Generating barcode:", {
            barcode: product.barcode,
            quantity,
            format,
        });
        // Here you would typically:
        // 1. Generate barcode using a library like 'jsbarcode'
        // 2. Create a PDF/image with the barcode
        // 3. Return the file or a URL to download it
        // For now, we'll just return the barcode data
        return server_1.NextResponse.json({
            message: "Barcode generation requested",
            product_id: productId,
            barcode: product.barcode,
            quantity,
            format,
        }, { status: 200 });
    }
    catch (error) {
        console.error("❌ Error generating barcodes:", error);
        return server_1.NextResponse.json({
            error: "Failed to generate barcodes",
            details: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map