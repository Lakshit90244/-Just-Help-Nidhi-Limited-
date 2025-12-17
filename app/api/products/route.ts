import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import Product from '@/backend/models/Product';
const fallbackStore = require('@/lib/fallback-store');

export async function GET() {
  try {
    // Try database first
    try {
      await connectDB();
      const products = await Product.find({}).sort({ createdAt: -1 });
      console.log('✅ Products loaded from database:', products.length);
      return NextResponse.json({ success: true, data: products });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback products');
      const products = fallbackStore.getAll('products');
      return NextResponse.json({ success: true, data: products });
    }
  } catch (error: any) {
    console.log('❌ Products GET error:', error.message);
    const products = fallbackStore.getAll('products');
    return NextResponse.json({ success: true, data: products });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Try database first
    try {
      await connectDB();
      const product = await Product.create(body);
      console.log('✅ Product created in database:', product.name);
      return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback store');
      
      // Create product in fallback store
      const newProduct = fallbackStore.create('products', body);
      console.log('✅ Product created in fallback store:', newProduct.name);
      return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    }
  } catch (error: any) {
    console.log('❌ Products POST error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}