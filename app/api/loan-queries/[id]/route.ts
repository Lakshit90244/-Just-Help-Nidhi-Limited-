import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import LoanQuery from '@/backend/models/LoanQuery';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const query = await LoanQuery.findById(id);
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: query });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    body.updatedAt = new Date();
    const query = await LoanQuery.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: query });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const query = await LoanQuery.findByIdAndDelete(id);
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}