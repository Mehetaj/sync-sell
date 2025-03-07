import { connectToDatabase } from "../../../lib/mongodb";
import Order from "../../../model/order.model";
import { NextResponse } from "next/server";

// POST: Create a new arrival
export async function POST(request) {
  const body = await request.json();
  await connectToDatabase();
  await Order.create(body);
  return NextResponse.json({ message: "Order Created" }, { status: 201 });
}

// GET: Retrieve all new arrivals
export async function GET() {
  await connectToDatabase();
  const orders = await Order.find();
  return NextResponse.json({ orders });
}
