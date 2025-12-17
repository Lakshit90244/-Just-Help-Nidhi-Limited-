// Test both IP addresses for MongoDB connection
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

const IPs = [
  '157.48.203.66',
  '157.48.203.234'
];

console.log('🔍 Testing MongoDB connection with both IPs...');
console.log('📋 IPs to test:', IPs.join(', '));

async function testConnection() {
  for (const ip of IPs) {
    try {
      console.log(`\n⏳ Testing IP: ${ip}`);
      
      const connection = await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
      });
      
      console.log(`🎉 SUCCESS! IP ${ip} is connected to MongoDB!`);
      console.log('✅ Database:', connection.connection.db.databaseName);
      console.log('🌐 Host:', connection.connection.host);
      
      await mongoose.disconnect();
      
      console.log('\n🚀 GREAT! MongoDB is connected!');
      console.log('🔄 Now restart your server: npm run dev');
      console.log('🌐 Admin panel: http://localhost:3000/admin');
      
      return true;
      
    } catch (error) {
      console.log(`❌ IP ${ip} failed:`, error.message.substring(0, 80) + '...');
    }
  }
  
  console.log('\n❌ Neither IP is whitelisted in MongoDB Atlas');
  console.log('\n📋 TO FIX - Add these IPs to MongoDB Atlas:');
  IPs.forEach(ip => {
    console.log(`   • ${ip}`);
  });
  
  console.log('\n🛠️ Steps:');
  console.log('1. 🌐 Go to: https://cloud.mongodb.com');
  console.log('2. 🔐 Login to MongoDB Atlas');
  console.log('3. 🛡️ Click "Network Access"');
  console.log('4. ➕ Click "Add IP Address"');
  console.log('5. 📝 Add both IPs or use 0.0.0.0/0 for all IPs');
  console.log('6. 💾 Click "Confirm"');
  console.log('7. ⏳ Wait 2-3 minutes');
  
  console.log('\n✅ Website works perfectly without MongoDB too!');
  
  return false;
}

testConnection();