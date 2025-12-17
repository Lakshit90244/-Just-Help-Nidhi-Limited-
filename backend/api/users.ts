import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import User from '../models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.log('Users GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await User.create(body);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    console.log('Users POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}