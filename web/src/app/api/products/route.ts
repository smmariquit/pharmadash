import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit, startAfter, where, addDoc, orderBy } from "firebase/firestore";
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

// POST /api/products - Create new product
export async function POST(request: Request) {
  try {
    const body: Partial<Product> = await request.json();

    // Validate required fields
    if (!body.store_id || !body.sku || !body.brand) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add metadata
    const now = Date.now();
    const product: Product = {
      ...body as Product,
      meta: {
        created_at: now,
        updated_at: now
      }
    };

    const docRef = await addDoc(collection(db, 'products'), product);

    return NextResponse.json({
      message: 'Product created successfully',
      id: docRef.id,
      product
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

