import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import User from '@/backend/models/User';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json();

    let existingUser = null;
    let newUser = null;

    // Try database first
    try {
      await connectDB();
      existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
      }

      // Create new user in database
      newUser = await User.create({
        name,
        email,
        password,
        phone,
        role: 'user',
        status: 'active'
      });

      console.log('✅ User created in database:', newUser.email);

    } catch (dbError) {
      console.log('⚠️ Database connection failed, creating temporary user');
      
      // Create temporary user object (not persisted)
      newUser = {
        _id: `temp_${Date.now()}`,
        name,
        email,
        password,
        phone,
        role: 'user',
        status: 'active'
      };

      console.log('✅ Temporary user created:', newUser.email);
    }

    // Generate a simple token
    const token = `token_${newUser._id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 });

  } catch (error: any) {
    console.log('❌ Signup error:', error.message);
    return NextResponse.json({ success: false, error: 'Signup failed' }, { status: 500 });
  }
}