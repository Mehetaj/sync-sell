import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../model/user.model";
import { NextResponse } from "next/server";

// POST: Create a new user
export async function POST(request) {
  const body = await request.json();
  await connectToDatabase();
  await User.create(body);
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

// GET: Retrieve all users
export async function GET() {
  await connectToDatabase();
  const Users = await User.find();
  return NextResponse.json({ Users });
}
