import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const response = await Employee.findOne({ _id: id });
  return NextResponse.json({ response }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: any) {
  const { id} = params;
  const { name, surname, age, sex, certified, expierence, occupation } = await req.json();
  await connectMongoDB();
  await Employee.findByIdAndUpdate(id, { name, surname, age, sex, certified, expierence, occupation });
  return NextResponse.json({ message: "PUT Request Completed Successfully" }, { status: 200 });
}