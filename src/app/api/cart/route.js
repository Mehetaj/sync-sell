import { connectToDatabase } from "../../../lib/mongodb";
import Cart from "../../../model/cart.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectToDatabase();
  await Cart.create(body);
  return NextResponse.json({ message: "Cart Created" }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const Carts = await Cart.find();
  return NextResponse.json({ Carts });
}
