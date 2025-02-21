import { connectToDatabase } from "@/lib/mongodb";
import Catalog from "@/model/catalog.model";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// POST: Create a new arrival
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  await connectToDatabase();
  await Catalog.create(body);
  return NextResponse.json({ message: "Catalog Created" }, { status: 201 });
}

// GET: Retrieve all new arrivals
export async function GET(): Promise<NextResponse> {
  await connectToDatabase();
  const Catalogs = await Catalog.find();
  return NextResponse.json({ Catalogs });
}

