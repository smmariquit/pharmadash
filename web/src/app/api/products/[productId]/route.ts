import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Product } from "@/models/product";

// GET /api/products/{productId} - Get product details
export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const docRef = doc(db, 'products', params.productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(docSnap.data(), { status: 200 });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/{productId} - Update product
export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body: Partial<Product> = await request.json();
    const docRef = doc(db, 'products', params.productId);

    // Check if product exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update metadata
    const updates = {
      ...body,
      'meta.updated_at': Date.now()
    };

    await updateDoc(docRef, updates);

    return NextResponse.json({
      message: 'Product updated successfully',
      id: params.productId
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/{productId} - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const docRef = doc(db, 'products', params.productId);

    // Check if product exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    await deleteDoc(docRef);

    return NextResponse.json({
      message: 'Product deleted successfully',
      id: params.productId
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

