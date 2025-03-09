import { connectToDatabase } from "../../../../lib/mongodb";
import { handleError } from "../../../../middleware/errorMiddleware";
import { NextResponse } from "next/server";
import User from "../../../../model/user.model";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const updatedData = await req.json();

    const result = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return NextResponse.json(
        { message: "User not found" },
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
    const result = await User.deleteOne({ _id: id });
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params?.id;

    const result = await User.findById(id);

    if (!result) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
};
