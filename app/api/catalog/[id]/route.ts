import { connectToDatabase } from "@/lib/mongodb";
import { handleError } from "@/middleare/errorMiddleware";
import Catalog from "@/model/catalog.model";
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

    const result = await Catalog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return NextResponse.json({ message: "Catalog not found" }, { status: 404 });
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
    const result = await Catalog.deleteOne({ _id: id });
    return NextResponse.json(result);
  } catch (error: any) {
    return handleError(error);
  }
};
