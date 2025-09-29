import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, or } from "firebase/firestore";

// GET /api/products/search - Search products by barcode/name/SKU
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');

    if (!searchTerm) {
      return NextResponse.json(
        { error: 'Search term is required' },
        { status: 400 }
      );
    }

    // Create a query with multiple OR conditions
    const q = query(
      collection(db, 'products'),
      or(
        where('barcode', '==', searchTerm),
        where('sku', '==', searchTerm),
        where('brand', '>=', searchTerm),
        where('brand', '<=', searchTerm + ''),
        where('generic', '>=', searchTerm),
        where('generic', '<=', searchTerm + '')
      )
    );

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}

