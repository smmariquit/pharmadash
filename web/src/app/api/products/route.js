"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const server_1 = require("next/server");
const firebase_admin_1 = require("@/lib/firebase-admin");
const product_1 = require("@/models/product");
// GET /api/products - List all products with filtering/pagination
async function GET(request) {
    console.log("📥 GET /api/products request received");
    try {
        const { searchParams } = new URL(request.url);
        const pageSize = Number(searchParams.get("pageSize")) || 10;
        const lastId = searchParams.get("lastId");
        const category = searchParams.get("category");
        console.log("🔍 Query params:", { pageSize, lastId, category });
        // ✅ Admin SDK syntax
        let query = firebase_admin_1.adminDb.collection("products").orderBy("_id").limit(pageSize);
        if (lastId) {
            const lastDoc = await firebase_admin_1.adminDb.collection("products").doc(lastId).get();
            query = query.startAfter(lastDoc);
        }
        if (category) {
            query = query.where("category", "==", category);
        }
        console.log("📚 Fetching products from Firestore...");
        const snapshot = await query.get();
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(`✅ Found ${products.length} products`);
        return server_1.NextResponse.json({
            products,
            lastId: products.length > 0 ? products[products.length - 1].id : null,
        });
    }
    catch (error) {
        console.error("❌ Error fetching products:", error);
        return server_1.NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
// POST /api/products - Create new product(s)
async function POST(request) {
    console.log("📥 POST /api/products request received");
    try {
        const body = await request.json();
        console.log("📦 Received request body:", body);
        const products = Array.isArray(body) ? body : [body];
        const now = Date.now();
        console.log(`🔍 Validating ${products.length} products...`);
        for (const product of products) {
            if (!product.store_id || !product.sku || !product.brand) {
                console.log("❌ Validation failed for product:", product);
                return server_1.NextResponse.json({
                    error: "Missing required fields in one or more products",
                    product: product,
                }, { status: 400 });
            }
        }
        console.log("📝 Creating batch operation...");
        // ✅ Admin SDK batch syntax
        const batch = firebase_admin_1.adminDb.batch();
        const productRefs = [];
        for (const product of products) {
            const docRef = firebase_admin_1.adminDb.collection("products").doc(); // Auto-generate ID
            const productWithMeta = {
                ...product,
                meta: {
                    created_at: now,
                    updated_at: now,
                },
            };
            batch.set(docRef, productWithMeta);
            productRefs.push({ id: docRef.id, data: productWithMeta });
        }
        console.log("💾 Committing batch to Firestore...");
        await batch.commit();
        console.log("✅ Batch committed successfully");
        return server_1.NextResponse.json({
            message: `Successfully created ${products.length} product(s)`,
            products: productRefs,
        }, { status: 201 });
    }
    catch (error) {
        console.error("❌ Error creating products:", error);
        return server_1.NextResponse.json({
            error: "Failed to create products",
            details: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map