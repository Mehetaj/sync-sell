import Catalog from "../../../../model/catalog.model";
import { connectToDatabase } from "../../../../lib/mongodb";
import { handleError } from "../../../../middleware/errorMiddleware";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const updatedData = await req.json();

    const result = await Catalog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return NextResponse.json(
        { message: "Catalog not found" },
        { status: 404 }
      );
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
    const result = await Catalog.deleteOne({ _id: id });
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const result = await Catalog.findById(id);

    if (!result) {
      return NextResponse.json(
        { message: "New Arrival not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};
