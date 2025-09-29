import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Product } from "@/models/product";

// GET /api/products/{productId} - Get product details
export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  console.log("📥 GET /api/products/:id request received", params.productId);

  try {
    const docRef = adminDb.collection("products").doc(params.productId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log("❌ Product not found");
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("✅ Product found");
    return NextResponse.json(docSnap.data());
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// PUT /api/products/{productId} - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  console.log("📥 PUT /api/products/:id request received", params.productId);

  try {
    const body: Partial<Product> = await request.json();
    console.log("📦 Update data:", body);

    const docRef = adminDb.collection("products").doc(params.productId);

    // Check if product exists
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      console.log("❌ Product not found");
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update metadata
    const updates = {
      ...body,
      "meta.updated_at": Date.now(),
    };

    console.log("📝 Updating product...");
    await docRef.update(updates);
    console.log("✅ Product updated");

    return NextResponse.json({
      message: "Product updated successfully",
      id: params.productId,
    });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/{productId} - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  console.log("📥 DELETE /api/products/:id request received", params.productId);

  try {
    const docRef = adminDb.collection("products").doc(params.productId);

    // Check if product exists
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      console.log("❌ Product not found");
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("🗑️ Deleting product...");
    await docRef.delete();
    console.log("✅ Product deleted");

    return NextResponse.json({
      message: "Product deleted successfully",
      id: params.productId,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
