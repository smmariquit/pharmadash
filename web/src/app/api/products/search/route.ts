import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET /api/products/search - Search products by barcode/name/SKU
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q");

    if (!searchTerm) {
      return NextResponse.json(
        { error: "Search term is required" },
        { status: 400 },
      );
    }

    console.log("🔍 Searching for:", searchTerm);

    // Admin SDK doesn't support OR queries directly
    // We need to run multiple queries and merge results
    const productsMap = new Map();

    // Query 1: Exact match on barcode
    const barcodeQuery = await adminDb
      .collection("products")
      .where("barcode", "==", searchTerm)
      .get();

    barcodeQuery.docs.forEach((doc) => {
      productsMap.set(doc.id, { id: doc.id, ...doc.data() });
    });

    // Query 2: Exact match on SKU
    const skuQuery = await adminDb
      .collection("products")
      .where("sku", "==", searchTerm)
      .get();

    skuQuery.docs.forEach((doc) => {
      productsMap.set(doc.id, { id: doc.id, ...doc.data() });
    });

    // Query 3: Prefix search on brand
    const brandQuery = await adminDb
      .collection("products")
      .where("brand", ">=", searchTerm)
      .where("brand", "<=", searchTerm + "\uf8ff")
      .get();

    brandQuery.docs.forEach((doc) => {
      productsMap.set(doc.id, { id: doc.id, ...doc.data() });
    });

    // Query 4: Prefix search on generic
    const genericQuery = await adminDb
      .collection("products")
      .where("generic", ">=", searchTerm)
      .where("generic", "<=", searchTerm + "\uf8ff")
      .get();

    genericQuery.docs.forEach((doc) => {
      productsMap.set(doc.id, { id: doc.id, ...doc.data() });
    });

    // Convert map to array
    const products = Array.from(productsMap.values());

    console.log(`✅ Found ${products.length} products`);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("❌ Error searching products:", error);
    return NextResponse.json(
      {
        error: "Failed to search products",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
