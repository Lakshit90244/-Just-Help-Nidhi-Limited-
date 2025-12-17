// Test MongoDB Atlas connection
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

console.log('🔍 Testing MongoDB Atlas Connection...');
console.log('📡 Connection String:', MONGODB_URI.replace(/:[^:@]*@/, ':****@'));

async function testConnection() {
  try {
    console.log('\n⏳ Attempting to connect...');
    
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('📊 Database:', connection.connection.db.databaseName);
    console.log('🌐 Host:', connection.connection.host);
    console.log('🔗 Connection State:', connection.connection.readyState);
    
    // Test a simple operation
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('📁 Collections found:', collections.length);
    
    if (collections.length > 0) {
      console.log('📋 Collection names:', collections.map(c => c.name).join(', '));
    }
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    
  } catch (error) {
    console.log('❌ FAILED: MongoDB connection error');
    console.log('🚨 Error Type:', error.name);
    console.log('💬 Error Message:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('\n💡 SOLUTION: This looks like an IP whitelist issue');
      console.log('   1. Go to MongoDB Atlas dashboard');
      console.log('   2. Navigate to Network Access');
      console.log('   3. Add your current IP address');
      console.log('   4. Or add 0.0.0.0/0 for all IPs (less secure)');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 SOLUTION: This looks like a credentials issue');
      console.log('   1. Check username and password');
      console.log('   2. Verify database user permissions');
      console.log('   3. Check if password contains special characters');
    }
    
    console.log('\n🔄 FALLBACK: Website will use in-memory storage');
    console.log('✅ All features still work without database');
  }
}

testConnection();