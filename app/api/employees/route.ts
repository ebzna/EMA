import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, surname, age, sex, certified, expierence, occupation } = await req.json();
  await connectMongoDB();
  await Employee.create({ name, surname, age, sex, certified, expierence, occupation });
  return NextResponse.json({ message: "POST Request Completed Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const data = await Employee.find();
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({ message: "DELETE Request Completed Successfully" }, { status: 200 });
}
