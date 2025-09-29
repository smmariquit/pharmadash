"use client";

import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const uploadToFirestore = async () => {
    try {
      setIsLoading(true);
      setResult(null);

      const response = await fetch("/api/add-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "test_item",
          value: "test_value",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add record");
      }

      setResult({
        success: true,
        message: `Successfully added record with ID: ${data.id}`,
      });
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={uploadToFirestore}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? "Adding to Firestore..." : "Add to Firestore"}
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded ${
            result.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}
