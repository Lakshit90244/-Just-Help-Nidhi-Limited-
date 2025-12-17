import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import Product from '@/backend/models/Product';
const fallbackStore = require('@/lib/fallback-store');

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Try database first
    try {
      await connectDB();
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      const product = fallbackStore.getById('products', id);
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product });
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
      const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      console.log('✅ Product updated in database');
      return NextResponse.json({ success: true, data: product });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Update in fallback store
      const updatedProduct = fallbackStore.update('products', id, body);
      if (!updatedProduct) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      
      console.log('✅ Product updated in fallback store');
      return NextResponse.json({ success: true, data: updatedProduct });
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
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      console.log('✅ Product deleted from database');
      return NextResponse.json({ success: true, data: {} });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Delete from fallback store
      const deleted = fallbackStore.delete('products', id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      
      console.log('✅ Product deleted from fallback store');
      return NextResponse.json({ success: true, data: {} });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}