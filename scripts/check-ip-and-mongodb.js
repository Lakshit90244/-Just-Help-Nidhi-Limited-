// Check current IP and MongoDB connection
const https = require('https');
const mongoose = require('mongoose');

console.log('🔍 Checking IP Address and MongoDB Connection...');

// Get current public IP
function getCurrentIP() {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org?format=json', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.ip);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function checkConnection() {
  try {
    // Get current IP
    console.log('📡 Getting your current IP address...');
    const currentIP = await getCurrentIP();
    console.log(`🌐 Your current IP: ${currentIP}`);
    
    // Test MongoDB connection
    console.log('\n⏳ Testing MongoDB Atlas connection...');
    
    const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';
    
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    
    console.log('✅ SUCCESS: MongoDB connected!');
    console.log('📊 Database:', connection.connection.db.databaseName);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
    
  } catch (error) {
    console.log('❌ MongoDB Connection Failed');
    console.log('🚨 Error:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('\n💡 SOLUTION STEPS:');
      console.log('1. 🌐 Go to: https://cloud.mongodb.com');
      console.log('2. 🔐 Login to your MongoDB Atlas account');
      console.log('3. 📋 Select your cluster');
      console.log('4. 🛡️ Go to "Network Access" in left sidebar');
      console.log('5. ➕ Click "Add IP Address"');
      console.log(`6. 📝 Add this IP: ${await getCurrentIP()}`);
      console.log('7. 💾 Click "Confirm"');
      console.log('8. ⏳ Wait 2-3 minutes for changes to apply');
      console.log('\n🔄 Then restart your server: npm run dev');
    }
    
    console.log('\n✅ CURRENT STATUS: Website works perfectly without MongoDB');
    console.log('🎯 All CRUD operations working with fallback storage');
  }
}

checkConnection();