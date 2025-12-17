import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import Product from '../models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.log('Products GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.log('Products POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}