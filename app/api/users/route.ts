import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import User from '@/backend/models/User';
const fallbackStore = require('@/lib/fallback-store');

export async function GET() {
  try {
    // Try database first
    try {
      await connectDB();
      const users = await User.find({}).sort({ createdAt: -1 });
      console.log('✅ Users loaded from database:', users.length);
      return NextResponse.json({ success: true, data: users });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback users');
      const users = fallbackStore.getAll('users');
      return NextResponse.json({ success: true, data: users });
    }
  } catch (error: any) {
    console.log('❌ Users GET error:', error.message);
    const users = fallbackStore.getAll('users');
    return NextResponse.json({ success: true, data: users });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Try database first
    try {
      await connectDB();
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser) {
        return NextResponse.json({ 
          success: false, 
          error: `User with email ${body.email} already exists` 
        }, { status: 400 });
      }
      
      const user = await User.create(body);
      console.log('✅ User created in database:', user.email);
      return NextResponse.json({ success: true, data: user }, { status: 201 });
      
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Check if user exists in fallback store
      if (fallbackStore.emailExists(body.email)) {
        return NextResponse.json({ 
          success: false, 
          error: `User with email ${body.email} already exists` 
        }, { status: 400 });
      }
      
      // Create user in fallback store
      const newUser = fallbackStore.create('users', body);
      console.log('✅ User created in fallback store:', newUser.email);
      return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    }
  } catch (error: any) {
    console.log('❌ Users POST error:', error.message);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email already exists. Please use a different email.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}