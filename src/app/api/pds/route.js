import { connectToDatabase } from "../../../lib/mongodb";
import Pds from "../../../model/product.model";
import { NextResponse } from "next/server";

// POST: Create a new arrival
export async function POST(request) {
  const body = await request.json();
  await connectToDatabase();
  await Pds.create(body);
  return NextResponse.json({ message: "Pds Created" }, { status: 201 });
}

// GET: Retrieve all new arrivals
export async function GET() {
  await connectToDatabase();
  const Pdss = await Pds.find();
  return NextResponse.json({ Pdss });
}
