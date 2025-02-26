import { connectToDatabase } from "../../../lib/mongodb";
import Catalog from "../../../model/catalog.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectToDatabase();
  await Catalog.create(body);
  return NextResponse.json({ message: "Catalog Created" }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const Catalogs = await Catalog.find();
  return NextResponse.json({ Catalogs });
}
