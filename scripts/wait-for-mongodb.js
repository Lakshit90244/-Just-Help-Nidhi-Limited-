// Wait for MongoDB connection to be established
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority&appName=finance-website';

console.log('⏳ Waiting for MongoDB Atlas connection...');
console.log('📋 Make sure you have added IP: 157.48.203.234 to Network Access');
console.log('🌐 MongoDB Atlas: https://cloud.mongodb.com');
console.log('\n🔄 Testing connection every 10 seconds...');

let attempts = 0;
const maxAttempts = 30; // 5 minutes total

async function testConnection() {
  attempts++;
  
  try {
    console.log(`\n🧪 Attempt ${attempts}/${maxAttempts} - Testing connection...`);
    
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    
    console.log('🎉 SUCCESS! MongoDB Atlas Connected!');
    console.log('✅ Database:', connection.connection.db.databaseName);
    console.log('🌐 Host:', connection.connection.host);
    console.log('📊 Ready State:', connection.connection.readyState);
    
    // Test database operations
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.length);
    
    await mongoose.disconnect();
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('1. 🔄 Restart your server: npm run dev');
    console.log('2. 🌐 Visit: http://localhost:3000/admin');
    console.log('3. 🧪 Test CRUD operations - they will now use real database!');
    
    process.exit(0);
    
  } catch (error) {
    if (attempts >= maxAttempts) {
      console.log('\n❌ Max attempts reached. Connection failed.');
      console.log('💡 Please check:');
      console.log('   1. IP 106.200.206.173 is added to Network Access');
      console.log('   2. MongoDB Atlas cluster is running');
      console.log('   3. Credentials are correct');
      console.log('\n✅ Website still works with fallback storage');
      process.exit(1);
    }
    
    console.log(`❌ Attempt ${attempts} failed: ${error.message.substring(0, 100)}...`);
    
    if (error.message.includes('IP')) {
      console.log('💡 Add IP 157.48.203.234 to MongoDB Atlas Network Access');
    }
    
    console.log('⏳ Retrying in 10 seconds...');
    setTimeout(testConnection, 10000);
  }
}

// Start testing
testConnection();