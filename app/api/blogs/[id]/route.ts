import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import Blog from '@/backend/models/Blog';
const fallbackStore = require('@/lib/fallback-store');

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Try database first
    try {
      await connectDB();
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      const blog = fallbackStore.getById('blogs', id);
      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
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
      const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      console.log('✅ Blog updated in database');
      return NextResponse.json({ success: true, data: blog });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Update in fallback store
      const updatedBlog = fallbackStore.update('blogs', id, body);
      if (!updatedBlog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      
      console.log('✅ Blog updated in fallback store');
      return NextResponse.json({ success: true, data: updatedBlog });
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
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      console.log('✅ Blog deleted from database');
      return NextResponse.json({ success: true, data: {} });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Delete from fallback store
      const deleted = fallbackStore.delete('blogs', id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      
      console.log('✅ Blog deleted from fallback store');
      return NextResponse.json({ success: true, data: {} });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}