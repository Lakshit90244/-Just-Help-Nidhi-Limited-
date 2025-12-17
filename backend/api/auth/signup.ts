import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, phone } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    // Create new user (in production, hash the password)
    const user = await User.create({
      name,
      email,
      password, // Store password (in production, hash this)
      phone,
      role: 'user',
      status: 'active'
    });

    // Generate a simple token
    const token = `token_${user._id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 201 });

  } catch (error: any) {
    console.log('Signup error:', error);
    return NextResponse.json({ success: false, error: 'Signup failed' }, { status: 500 });
  }
}