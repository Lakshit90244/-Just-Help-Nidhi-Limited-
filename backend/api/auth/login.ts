import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password (simple comparison for now)
    // In production, you should hash passwords
    if (user.password && user.password !== password) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate a simple token (in production, use JWT)
    const token = `token_${user._id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });

  } catch (error: any) {
    console.log('Login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}