import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import Blog from '@/backend/models/Blog';
const fallbackStore = require('@/lib/fallback-store');

export async function GET() {
  try {
    // Try database first
    try {
      await connectDB();
      const blogs = await Blog.find({}).sort({ createdAt: -1 });
      console.log('✅ Blogs loaded from database:', blogs.length);
      return NextResponse.json({ success: true, data: blogs });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback blogs');
      const blogs = fallbackStore.getAll('blogs');
      return NextResponse.json({ success: true, data: blogs });
    }
  } catch (error: any) {
    console.log('❌ Blogs GET error:', error.message);
    const blogs = fallbackStore.getAll('blogs');
    return NextResponse.json({ success: true, data: blogs });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Try database first
    try {
      await connectDB();
      const blog = await Blog.create(body);
      console.log('✅ Blog created in database:', blog.title);
      return NextResponse.json({ success: true, data: blog }, { status: 201 });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Create blog in fallback store
      const newBlog = fallbackStore.create('blogs', body);
      console.log('✅ Blog created in fallback store:', newBlog.title);
      return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
    }
  } catch (error: any) {
    console.log('❌ Blogs POST error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}