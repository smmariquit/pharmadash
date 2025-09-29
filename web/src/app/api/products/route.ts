import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit, startAfter, where, addDoc, orderBy, writeBatch, doc } from "firebase/firestore";
import { Product } from "@/models/product";

// GET /api/products - List all products with filtering/pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const lastId = searchParams.get('lastId');
    const category = searchParams.get('category');

    let q = query(collection(db, 'products'), orderBy('_id'), limit(pageSize));

    // Add pagination if lastId is provided
    if (lastId) {
      q = query(q, startAfter(lastId));
    }

    // Add category filter if provided
    if (category) {
      q = query(q, where('category', '==', category));
    }

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      products,
      lastId: products.length > 0 ? products[products.length - 1].id : null
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product(s)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products: Partial<Product>[] = Array.isArray(body) ? body : [body];
    const now = Date.now();

    // Validate all products
    for (const product of products) {
      if (!product.store_id || !product.sku || !product.brand) {
        return NextResponse.json(
          { error: 'Missing required fields in one or more products' },
          { status: 400 }
        );
      }
    }

    // Add metadata and create all products
    const batch = writeBatch(db);
    const productRefs = [];

    for (const product of products) {
      const docRef = doc(collection(db, 'products'));
      const productWithMeta = {
        ...product,
        meta: {
          created_at: now,
          updated_at: now
        }
      };
      batch.set(docRef, productWithMeta);
      productRefs.push({ id: docRef.id, data: productWithMeta });
    }

    await batch.commit();

    return NextResponse.json({
      message: `Successfully created ${products.length} product(s)`,
      products: productRefs
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating products:', error);
    return NextResponse.json(
      { error: 'Failed to create products' },
      { status: 500 }
    );
  }
}

