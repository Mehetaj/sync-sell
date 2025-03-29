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


export const GET = async (req) => {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");

    if (userEmail) {
      const order = await Order.findOne({ email: userEmail });
      if (!order) {
        return NextResponse.json({ success: false, error: "Order not found" });
      }
      return NextResponse.json({ success: true, orders: order });
    }

    const orders = await Order.find();
    return NextResponse.json({ success: true, orders: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
