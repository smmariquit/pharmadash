import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// Define the request body type
type AddRecordRequest = {
  name: string;
  value: string;
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: AddRecordRequest = await request.json();

    // Validate the required fields
    if (!body.name || !body.value) {
      return NextResponse.json(
        { error: "Name and value fields are required" },
        { status: 400 },
      );
    }

    // Create a new document in Firestore
    const docRef = await addDoc(collection(db, "records"), {
      name: body.name,
      value: body.value,
      createdAt: new Date().toISOString(),
    });

    // Return success response with the new document ID
    return NextResponse.json(
      {
        message: "Record added successfully",
        id: docRef.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding record:", error);
    return NextResponse.json(
      { error: "Failed to add record" },
      { status: 500 },
    );
  }
}
