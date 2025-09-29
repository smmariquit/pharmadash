"use client";

import { useState } from "react";
import { Product } from "@/models/product";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [productId, setProductId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [lastId, setLastId] = useState("");

  const handleApiCall = async (
    endpoint: string,
    method: string,
    body?: any,
    params?: Record<string, string>,
  ) => {
    setLoading(endpoint);
    setResult(null);

    try {
      // Construct URL with query parameters
      let url = endpoint;
      if (params) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
        const queryString = queryParams.toString();
        if (queryString) url += `?${queryString}`;
      }

      console.log(`📤 Calling ${method} ${url}`);
      if (body) console.log("Request body:", body);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      const responseText = await response.text();
      console.log("📡 Raw response:", responseText);

      let data;
      try {
        // data = JSON.parse(responseText);
      } catch (e) {
        console.error("❌ Failed to parse response:", e);
        throw new Error("Invalid JSON response from server");
      }

      console.log("✅ Parsed response:", data);

      setResult({
        success: response.ok,
        data,
        error: !response.ok ? data.error : undefined,
      });
    } catch (error) {
      console.error("❌ API call failed:", error);
      setResult({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setLoading(null);
    }
  };

  const sampleProduct: Partial<Product> = {
    store_id: "store_123",
    sku: "TEST001",
    barcode: "4801234567891",
    brand: "TestBrand",
    generic: "TestGeneric",
    form: "tablet",
    strength: "100mg",
    pack_size: 10,
    rx_flag: false,
    pricing: {
      srp: 3.5,
      cost: 2.1,
      markup_pct: 42.5,
      tax_code: "VAT12",
    },
    replenishment: {
      rop: 25,
      roq: 70,
      min: 25,
      max: 250,
    },
    supplier_refs: [
      {
        supplier_id: "sup_test",
        lead_days: 4,
        moq: 100,
      },
    ],
    substitutes: [],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Product API Test Dashboard</h1>

      <div className="space-y-8">
        {/* List Products */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">List Products</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Page Size"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Last ID (for pagination)"
                value={lastId}
                onChange={(e) => setLastId(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <button
              onClick={() =>
                handleApiCall("/api/products", "GET", null, {
                  pageSize,
                  lastId: lastId || undefined,
                })
              }
              disabled={loading === "/api/products"}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading === "/api/products" ? "Loading..." : "List Products"}
            </button>
          </div>
        </section>

        {/* Create Product */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create Product</h2>
          <button
            onClick={() =>
              handleApiCall("/api/products", "POST", sampleProduct)
            }
            disabled={loading === "create"}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading === "create" ? "Creating..." : "Create Test Product"}
          </button>
        </section>

        {/* Get/Update/Delete Product */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Product Operations</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleApiCall(`/api/products/${productId}`, "GET")
                }
                disabled={!productId || loading === "get"}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading === "get" ? "Loading..." : "Get Product"}
              </button>
              <button
                onClick={() =>
                  handleApiCall(`/api/products/${productId}`, "PUT", {
                    brand: "Updated Brand",
                    generic: "Updated Generic",
                  })
                }
                disabled={!productId || loading === "update"}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                {loading === "update" ? "Updating..." : "Update Product"}
              </button>
              <button
                onClick={() =>
                  handleApiCall(`/api/products/${productId}`, "DELETE")
                }
                disabled={!productId || loading === "delete"}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
              >
                {loading === "delete" ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </section>

        {/* Search Products */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Search Products</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search query (name, barcode, or SKU)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <button
              onClick={() =>
                handleApiCall("/api/products/search", "GET", null, {
                  q: searchQuery,
                })
              }
              disabled={!searchQuery || loading === "search"}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading === "search" ? "Searching..." : "Search Products"}
            </button>
          </div>
        </section>

        {/* Generate Barcode */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Generate Barcode</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <button
              onClick={() =>
                handleApiCall(`/api/products/${productId}/barcodes`, "POST", {
                  quantity: 1,
                  format: "pdf",
                })
              }
              disabled={!productId || loading === "barcode"}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              {loading === "barcode" ? "Generating..." : "Generate Barcode"}
            </button>
          </div>
        </section>

        {/* Result Display */}
        {result && (
          <section
            className={`border rounded-lg p-6 ${
              result.success ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {result.success ? "Success" : "Error"}
            </h2>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {JSON.stringify(result.data || result.error, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}
