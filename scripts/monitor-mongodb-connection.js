// Monitor MongoDB connection until IP is whitelisted
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';
const YOUR_IP = '157.48.203.66';

console.log('🔄 MongoDB Connection Monitor Started');
console.log('📍 Your IP:', YOUR_IP);
console.log('📋 Add this IP to MongoDB Atlas Network Access');
console.log('🌐 MongoDB Atlas: https://cloud.mongodb.com');
console.log('\n⏳ Checking connection every 15 seconds...');
console.log('💡 Press Ctrl+C to stop monitoring');

let attempts = 0;

async function checkConnection() {
  attempts++;
  const timestamp = new Date().toLocaleTimeString();
  
  try {
    console.log(`\n[${timestamp}] 🧪 Attempt ${attempts} - Testing connection...`);
    
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('🎉🎉🎉 SUCCESS! MongoDB Atlas Connected! 🎉🎉🎉');
    console.log('✅ Database:', connection.connection.db.databaseName);
    console.log('🌐 Host:', connection.connection.host);
    console.log('📊 Connection State:', connection.connection.readyState);
    
    // Test basic operations
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('📁 Collections found:', collections.length);
    
    await mongoose.disconnect();
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('1. 🔄 Restart your server: npm run dev');
    console.log('2. 🌐 Visit admin panel: http://localhost:3000/admin');
    console.log('3. 🧪 Test CRUD operations - now using real database!');
    console.log('4. 📊 Data will persist across server restarts');
    
    console.log('\n✅ MongoDB connection established successfully!');
    process.exit(0);
    
  } catch (error) {
    if (error.message.includes('IP')) {
      console.log(`❌ IP ${YOUR_IP} not whitelisted yet`);
      console.log('💡 Add IP to MongoDB Atlas Network Access');
    } else {
      console.log('❌ Connection failed:', error.message.substring(0, 100));
    }
    
    console.log('⏳ Retrying in 15 seconds...');
    setTimeout(checkConnection, 15000);
  }
}

// Start monitoring
checkConnection();