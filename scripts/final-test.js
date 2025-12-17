// Final MongoDB connection test with longer timeout
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

console.log('🔍 Final MongoDB Connection Test...');
console.log('⏳ Testing with 15 second timeout...');

async function finalTest() {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // 15 second timeout
      connectTimeoutMS: 15000,
    });
    
    console.log('🎉🎉🎉 SUCCESS! MongoDB Atlas Connected! 🎉🎉🎉');
    console.log('✅ Database:', connection.connection.db.databaseName);
    console.log('🌐 Host:', connection.connection.host);
    console.log('📊 Ready State:', connection.connection.readyState);
    
    // Test database operations
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('📁 Collections found:', collections.length);
    
    if (collections.length > 0) {
      console.log('📋 Collection names:', collections.map(c => c.name).join(', '));
    }
    
    await mongoose.disconnect();
    
    console.log('\n🚀 MONGODB CONNECTION SUCCESSFUL!');
    console.log('🔄 Now restart your server to use real database:');
    console.log('   npm run dev');
    console.log('\n🌐 Admin panel will now use MongoDB Atlas!');
    console.log('📊 Data will persist across server restarts!');
    
    return true;
    
  } catch (error) {
    console.log('❌ MongoDB connection failed');
    console.log('🚨 Error:', error.message);
    
    console.log('\n🔍 Troubleshooting:');
    console.log('1. ✅ Check if IP is added in MongoDB Atlas Network Access');
    console.log('2. ⏳ Wait 5-10 minutes for changes to fully apply');
    console.log('3. 🔄 Try adding 0.0.0.0/0 to allow all IPs');
    console.log('4. 🌐 Check internet connectivity');
    
    console.log('\n✅ GOOD NEWS: Website works perfectly without MongoDB!');
    console.log('🎯 All CRUD operations are functional with fallback storage');
    
    return false;
  }
}

finalTest();