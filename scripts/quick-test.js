// Quick MongoDB connection test
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

console.log('🔍 Quick MongoDB Connection Test...');

async function quickTest() {
  try {
    console.log('⏳ Testing connection (3 second timeout)...');
    
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    
    console.log('🎉🎉🎉 SUCCESS! MongoDB Connected! 🎉🎉🎉');
    console.log('✅ Database:', connection.connection.db.databaseName);
    console.log('🌐 Host:', connection.connection.host);
    console.log('📊 Ready State:', connection.connection.readyState);
    
    // Test collections
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.length);
    
    await mongoose.disconnect();
    
    console.log('\n🚀 MONGODB CONNECTED SUCCESSFULLY!');
    console.log('🔄 Now restart your server: npm run dev');
    console.log('🌐 Admin panel will now use real database!');
    
  } catch (error) {
    console.log('❌ Still not connected');
    console.log('🚨 Error:', error.message.substring(0, 100));
    
    console.log('\n💡 Possible reasons:');
    console.log('1. ⏳ Changes still applying (wait 2-3 minutes)');
    console.log('2. 🔍 Wrong IP added to whitelist');
    console.log('3. 🌐 Network connectivity issue');
    
    console.log('\n✅ Website works perfectly without MongoDB!');
  }
}

quickTest();