import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import LoanQuery from '../models/LoanQuery';

export async function GET() {
  try {
    await connectDB();
    const loanQueries = await LoanQuery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: loanQueries });
  } catch (error: any) {
    console.log('LoanQueries GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const loanQuery = await LoanQuery.create(body);
    return NextResponse.json({ success: true, data: loanQuery }, { status: 201 });
  } catch (error: any) {
    console.log('LoanQueries POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}