"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.PUT = PUT;
exports.DELETE = DELETE;
const server_1 = require("next/server");
const firebase_admin_1 = require("@/lib/firebase-admin");
const product_1 = require("@/models/product");
// GET /api/products/{productId} - Get product details
async function GET(request, { params }) {
    console.log("📥 GET /api/products/:id request received", params.productId);
    try {
        const docRef = firebase_admin_1.adminDb.collection("products").doc(params.productId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            console.log("❌ Product not found");
            return server_1.NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        console.log("✅ Product found");
        return server_1.NextResponse.json(docSnap.data());
    }
    catch (error) {
        console.error("❌ Error fetching product:", error);
        return server_1.NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
// PUT /api/products/{productId} - Update product
async function PUT(request, { params }) {
    console.log("📥 PUT /api/products/:id request received", params.productId);
    try {
        const body = await request.json();
        console.log("📦 Update data:", body);
        const docRef = firebase_admin_1.adminDb.collection("products").doc(params.productId);
        // Check if product exists
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            console.log("❌ Product not found");
            return server_1.NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        // Update metadata
        const updates = {
            ...body,
            "meta.updated_at": Date.now(),
        };
        console.log("📝 Updating product...");
        await docRef.update(updates);
        console.log("✅ Product updated");
        return server_1.NextResponse.json({
            message: "Product updated successfully",
            id: params.productId,
        });
    }
    catch (error) {
        console.error("❌ Error updating product:", error);
        return server_1.NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}
// DELETE /api/products/{productId} - Delete product
async function DELETE(request, { params }) {
    console.log("📥 DELETE /api/products/:id request received", params.productId);
    try {
        const docRef = firebase_admin_1.adminDb.collection("products").doc(params.productId);
        // Check if product exists
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            console.log("❌ Product not found");
            return server_1.NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        console.log("🗑️ Deleting product...");
        await docRef.delete();
        console.log("✅ Product deleted");
        return server_1.NextResponse.json({
            message: "Product deleted successfully",
            id: params.productId,
        });
    }
    catch (error) {
        console.error("❌ Error deleting product:", error);
        return server_1.NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map