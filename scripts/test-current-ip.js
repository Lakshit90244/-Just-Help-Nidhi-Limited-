// Test MongoDB connection with current IP
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB with IP: 157.48.203.66');
console.log('📋 This IP should be added to MongoDB Atlas Network Access');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

async function quickTest() {
  try {
    console.log('⏳ Quick connection test (5 second timeout)...');
    
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('🎉 SUCCESS! MongoDB Connected!');
    console.log('✅ Database:', connection.connection.db.databaseName);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
    
    console.log('\n🚀 GREAT! Now restart your server:');
    console.log('   npm run dev');
    
  } catch (error) {
    console.log('❌ Connection Failed');
    console.log('🚨 Error:', error.message.substring(0, 150));
    
    console.log('\n📋 TO FIX:');
    console.log('1. 🌐 Go to: https://cloud.mongodb.com');
    console.log('2. 🔐 Login to MongoDB Atlas');
    console.log('3. 🛡️ Click "Network Access" (left sidebar)');
    console.log('4. ➕ Click "Add IP Address"');
    console.log('5. 📝 Enter: 157.48.203.66');
    console.log('6. 💾 Click "Confirm"');
    console.log('7. ⏳ Wait 2-3 minutes');
    console.log('8. 🔄 Run this test again');
    
    console.log('\n✅ Website works perfectly without MongoDB too!');
  }
}

quickTest();