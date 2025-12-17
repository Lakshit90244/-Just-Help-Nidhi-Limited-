import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/lib/mongodb';
import User from '@/backend/models/User';

// Fallback users when database is not available
const fallbackUsers = [
  {
    _id: 'admin_001',
    name: 'Pallav Joshi',
    email: 'pallavjoshi@gmail.com',
    password: 'pallav123',
    role: 'admin'
  },
  {
    _id: 'user_001',
    name: 'Test User',
    email: 'test@gmail.com',
    password: 'test123',
    role: 'user'
  },
  {
    _id: 'user_002',
    name: 'Demo User',
    email: 'demo@gmail.com',
    password: 'demo123',
    role: 'user'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    let user = null;

    // Try database first
    try {
      await connectDB();
      user = await User.findOne({ email });
      console.log('✅ Database connected, user found:', user ? 'Yes' : 'No');
    } catch (dbError) {
      console.log('⚠️ Database connection failed, using fallback users');
      // Use fallback users if database fails
      user = fallbackUsers.find(u => u.email === email);
    }
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password (simple comparison for now)
    if (user.password && user.password !== password) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate a simple token
    const token = `token_${user._id}_${Date.now()}`;

    console.log(`✅ Login successful for: ${user.email} (${user.role})`);

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
    console.log('❌ Login error:', error.message);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}