import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../../model/user.model";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDatabase();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
