import { connectToDatabase } from "../../../lib/mongodb";
import NewArrival from "../../../model/new-arrival.model";
import { NextResponse } from "next/server";

// POST: Create a new arrival
export async function POST(request) {
  const body = await request.json();
  await connectToDatabase();
  await NewArrival.create(body);
  return NextResponse.json({ message: "NewArrival Created" }, { status: 201 });
}

// GET: Retrieve all new arrivals
export async function GET() {
  await connectToDatabase();
  const NewArrivals = await NewArrival.find();
  return NextResponse.json({ NewArrivals });
}
