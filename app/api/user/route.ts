import { connectToDatabase } from "@/lib/mongodb";
import User from "@/model/user.model";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// POST: Create a new arrival
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  await connectToDatabase();
  await User.create(body);
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

// GET: Retrieve all new arrivals
export async function GET(): Promise<NextResponse> {
  await connectToDatabase();
  const Users = await User.find();
  return NextResponse.json({ Users });
}

