import { connectToDatabase } from "../../../../lib/mongodb";
import { handleError } from "../../../../middleware/errorMiddleware";
import NewArrival from "../../../../model/new-arrival.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const updatedData = await req.json();

    const result = await NewArrival.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return NextResponse.json({ message: "New Arrival not found" }, { status: 404 });
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
    const result = await NewArrival.deleteOne({ _id: id });
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};
