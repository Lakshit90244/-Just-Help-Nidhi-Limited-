import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import User from '@/backend/models/User';
const fallbackStore = require('@/lib/fallback-store');

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Try database first
    try {
      await connectDB();
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: user });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      const user = fallbackStore.getById('users', id);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: user });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Try database first
    try {
      await connectDB();
      body.updatedAt = new Date();
      const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      console.log('✅ User updated in database');
      return NextResponse.json({ success: true, data: user });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Update in fallback store
      const updatedUser = fallbackStore.update('users', id, body);
      if (!updatedUser) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      
      console.log('✅ User updated in fallback store');
      return NextResponse.json({ success: true, data: updatedUser });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Try database first
    try {
      await connectDB();
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      console.log('✅ User deleted from database');
      return NextResponse.json({ success: true, data: {} });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Delete from fallback store
      const deleted = fallbackStore.delete('users', id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      
      console.log('✅ User deleted from fallback store');
      return NextResponse.json({ success: true, data: {} });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}