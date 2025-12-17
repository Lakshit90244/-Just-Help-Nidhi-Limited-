import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import Blog from '../models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    console.log('Blogs GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const blog = await Blog.create(body);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    console.log('Blogs POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}