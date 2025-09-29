import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit, startAfter, where, addDoc, orderBy } from "firebase/firestore";
import { Product } from "@/models/product";

// GET /api/products - List all products with filtering/pagination
export async function GET(request: Request) {
  console.log('🔍 [Products API] GET request started');
  console.log('🔗 Request URL:', request.url);
  
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const lastId = searchParams.get('lastId');
    const category = searchParams.get('category');

    console.log('📊 [Products API] Query parameters:', { pageSize, lastId, category });

    let q = query(collection(db, 'products'), limit(pageSize));
    console.log('🔥 [Products API] Firebase query initialized');

    // Add category filter if provided (must be done before orderBy for compound queries)
    if (category) {
      console.log(`🏷️ [Products API] Adding category filter: ${category}`);
      q = query(q, where('category', '==', category));
    }

    // Add pagination if lastId is provided
    if (lastId) {
      console.log(`📄 [Products API] Adding pagination from lastId: ${lastId}`);
      const { doc } = await import('firebase/firestore');
      const lastDoc = doc(db, 'products', lastId);
      q = query(q, startAfter(lastDoc));
    }

    console.log('🔥 [Products API] Executing Firestore query...');
    const snapshot = await getDocs(q);
    console.log(`📦 [Products API] Query successful! Found ${snapshot.docs.length} documents`);

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const responseData = {
      products,
      lastId: products.length > 0 ? products[products.length - 1].id : null
    };

    console.log('✅ [Products API] GET request completed successfully');
    console.log(`📊 [Products API] Returning ${products.length} products`);

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('❌ [Products API] Error fetching products:');
    console.error('Error details:', error);
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request: Request) {
  console.log('📝 [Products API] POST request started');
  
  try {
    console.log('📥 [Products API] Parsing request body...');
    const body: Partial<Product> = await request.json();
    console.log('📊 [Products API] Request body parsed:', JSON.stringify(body, null, 2));

    // Validate required fields
    console.log('🔍 [Products API] Validating required fields...');
    if (!body.store_id || !body.sku || !body.brand) {
      console.warn('⚠️ [Products API] Missing required fields:', {
        store_id: !!body.store_id,
        sku: !!body.sku,
        brand: !!body.brand
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    console.log('✅ [Products API] Required fields validation passed');

    // Add metadata
    const now = Date.now();
    const product: Product = {
      ...body as Product,
      meta: {
        created_at: now,
        updated_at: now
      }
    };
    console.log('🏷️ [Products API] Product with metadata prepared');

    console.log('🔥 [Products API] Saving to Firestore...');
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log(`✅ [Products API] Product created successfully with ID: ${docRef.id}`);

    const responseData = {
      message: 'Product created successfully',
      id: docRef.id,
      product
    };

    return NextResponse.json(responseData, { status: 201 });

  } catch (error) {
    console.error('❌ [Products API] Error creating product:');
    console.error('Error details:', error);
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

