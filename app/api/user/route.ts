import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import { connectToDatabase } from "@/lib/mongodb";
import { handleError } from "@/middleare/errorMiddleware";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    // Ensure the database is connected
    await connectToDatabase();

    if (email) {
      const user = await User.findOne({ email });
      if (!user) return handleError({ error: "User not found" });

      return NextResponse.json({ success: true, data: user });
    }

    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return handleError(error);
  }
};

// Post or save a user in the database
export const POST = async (req: NextRequest) => {
  try {
    // Ensure the database is connected
    await connectToDatabase();

    const reqBody = await req.json();
    const newUser = new User({
      ...reqBody,
    });

    await newUser.save(); // Ensure the save operation completes
    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    return handleError(error);
  }
};
