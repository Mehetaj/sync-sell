import { connectToDatabase } from "../../../lib/mongodb";
import { handleError } from "../../../middleware/errorMiddleware";
import Contact from "../../../model/contact.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newContact = new Contact(body);
    await newContact.save();
    return NextResponse.json({ message: "Contact Created" }, { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}

export async function GET() {
  await connectToDatabase();
  const contacts = await Contact.find();
  return NextResponse.json({ contacts });
}
