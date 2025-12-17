// MongoDB Connection Health Monitor
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

console.log('🔍 MongoDB Connection Health Monitor');
console.log('📊 Monitoring connection status every 30 seconds...');
console.log('💡 Press Ctrl+C to stop monitoring\n');

let connectionCount = 0;
let failureCount = 0;

async function checkConnection() {
  const timestamp = new Date().toLocaleTimeString();
  connectionCount++;
  
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`[${timestamp}] ✅ Connection ${connectionCount}: SUCCESS`);
    console.log(`   📊 Database: ${connection.connection.db.databaseName}`);
    console.log(`   🌐 Host: ${connection.connection.host}`);
    console.log(`   📈 Success Rate: ${((connectionCount - failureCount) / connectionCount * 100).toFixed(1)}%`);
    
    await mongoose.disconnect();
    
  } catch (error) {
    failureCount++;
    console.log(`[${timestamp}] ❌ Connection ${connectionCount}: FAILED`);
    console.log(`   🚨 Error: ${error.message.substring(0, 80)}...`);
    console.log(`   📉 Failure Rate: ${(failureCount / connectionCount * 100).toFixed(1)}%`);
    
    if (error.message.includes('IP')) {
      console.log('   💡 Reason: IP not whitelisted (check Network Access)');
    } else if (error.message.includes('authentication')) {
      console.log('   💡 Reason: Authentication failed (check credentials)');
    } else {
      console.log('   💡 Reason: Network or server issue');
    }
  }
  
  console.log(`   🔄 Next check in 30 seconds...\n`);
  setTimeout(checkConnection, 30000);
}

console.log('🚀 Starting connection monitoring...');
checkConnection();