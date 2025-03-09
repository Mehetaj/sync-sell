import { connectToDatabase } from "../../../../lib/mongodb";
import { handleError } from "../../../../middleware/errorMiddleware";
import { NextResponse } from "next/server";
import Order from "../../../../model/order.model";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const updatedData = await req.json();

    const result = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;
    const result = await Order.deleteOne({ _id: id });
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};
