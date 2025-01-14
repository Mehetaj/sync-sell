import { connectToDatabase } from "@/lib/mongodb";
import NewArrival from "@/model/new-arrival.model";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// POST: Create a new arrival
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  await connectToDatabase();
  await NewArrival.create(body);
  return NextResponse.json({ message: "NewArrival Created" }, { status: 201 });
}

// GET: Retrieve all new arrivals
export async function GET(): Promise<NextResponse> {
  await connectToDatabase();
  const NewArrivals = await NewArrival.find();
  return NextResponse.json({ NewArrivals });
}

// DELETE: Delete a new arrival by ID
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDatabase();
  await NewArrival.findByIdAndDelete(id);
  return NextResponse.json({ message: "NewArrival deleted" }, { status: 200 });
}
