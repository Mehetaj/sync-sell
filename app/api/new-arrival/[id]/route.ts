import { connectToDatabase } from "@/lib/mongodb";
import { handleError } from "@/middleare/errorMiddleware";
import NewArrival from "@/model/new-arrival.model";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};

export const PATCH = async (req: NextRequest, { params }: ParamsType) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const updatedData = await req.json();

    // Find and update the document
    const result = await NewArrival.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return NextResponse.json({ message: "New Arrival not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return handleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: ParamsType) => {
  try {
    await connectToDatabase();
    const id = params?.id;
    const result = await NewArrival.deleteOne({ _id: id });
    return NextResponse.json(result);
  } catch (error: any) {
    return handleError(error);
  }
};
