import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import LoanApplication from '../models/LoanApplication';

export async function GET() {
  try {
    await connectDB();
    const loanApplications = await LoanApplication.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: loanApplications });
  } catch (error: any) {
    console.log('LoanApplications GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const loanApplication = await LoanApplication.create(body);
    return NextResponse.json({ success: true, data: loanApplication }, { status: 201 });
  } catch (error: any) {
    console.log('LoanApplications POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}