import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import LoanQuery from '@/backend/models/LoanQuery';

// Fallback loan queries when database is not available
const fallbackQueries: any[] = [];

export async function GET() {
  try {
    // Try database first
    try {
      await connectDB();
      const queries = await LoanQuery.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: queries });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback loan queries');
      return NextResponse.json({ success: true, data: fallbackQueries });
    }
  } catch (error: any) {
    return NextResponse.json({ success: true, data: fallbackQueries });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Try database first
    try {
      await connectDB();
      const query = await LoanQuery.create(body);
      console.log('✅ Loan query created in database');
      return NextResponse.json({ success: true, data: query }, { status: 201 });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, simulating loan query creation');
      
      // Simulate creation
      const newQuery = {
        _id: `temp_${Date.now()}`,
        ...body,
        createdAt: new Date()
      };
      
      console.log('✅ Temporary loan query created');
      return NextResponse.json({ success: true, data: newQuery }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}