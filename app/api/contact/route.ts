import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/model/contact.model";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newContact = new Contact(body);
    await newContact.save();
    return NextResponse.json({ message: "Contact Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const contacts = await Contact.find();
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve contacts" }, { status: 500 });
  }
}
