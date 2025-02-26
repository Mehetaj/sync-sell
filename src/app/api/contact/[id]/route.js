import { connectToDatabase } from "../../../../lib/mongodb";
import Contact from "../../../../model/contact.model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();

  await connectToDatabase();
  await Contact.findByIdAndUpdate(id, { title, description });

  return NextResponse.json({ message: "Contact updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  const contact = await Contact.findOne({ _id: id });

  return NextResponse.json({ contact }, { status: 200 });
}
