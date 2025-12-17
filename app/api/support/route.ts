import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import Support from '@/backend/models/Support';

// Fallback support tickets when database is not available
const fallbackTickets: any[] = [];

export async function GET() {
  try {
    // Try database first
    try {
      await connectDB();
      const tickets = await Support.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: tickets });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback support tickets');
      return NextResponse.json({ success: true, data: fallbackTickets });
    }
  } catch (error: any) {
    return NextResponse.json({ success: true, data: fallbackTickets });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Try database first
    try {
      await connectDB();
      const ticket = await Support.create(body);
      console.log('✅ Support ticket created in database');
      return NextResponse.json({ success: true, data: ticket }, { status: 201 });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, simulating support ticket creation');
      
      // Simulate creation
      const newTicket = {
        _id: `temp_${Date.now()}`,
        ...body,
        createdAt: new Date()
      };
      
      console.log('✅ Temporary support ticket created');
      return NextResponse.json({ success: true, data: newTicket }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}