import { NextResponse } from "next/server";

export const handleError = (error) => {
  return NextResponse.json(error);
};