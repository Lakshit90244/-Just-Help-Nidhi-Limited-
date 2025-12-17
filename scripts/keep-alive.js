// MongoDB Keep-Alive Script - Keeps connection active
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

console.log('🔄 MongoDB Keep-Alive Service Started');
console.log('⏰ Pinging database every 30 minutes to prevent sleep...');
console.log('💡 Press Ctrl+C to stop\n');

let pingCount = 0;
let successCount = 0;

async function keepAlive() {
  const timestamp = new Date().toLocaleTimeString();
  pingCount++;
  
  try {
    // Connect if not connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`[${timestamp}] 🔗 Reconnected to MongoDB`);
    }
    
    // Ping database
    await mongoose.connection.db.admin().ping();
    successCount++;
    
    console.log(`[${timestamp}] ✅ Keep-Alive Ping ${pingCount}: SUCCESS`);
    console.log(`   📊 Success Rate: ${(successCount / pingCount * 100).toFixed(1)}%`);
    console.log(`   🔄 Next ping in 30 minutes...\n`);
    
  } catch (error) {
    console.log(`[${timestamp}] ❌ Keep-Alive Ping ${pingCount}: FAILED`);
    console.log(`   🚨 Error: ${error.message.substring(0, 60)}...`);
    console.log(`   📉 Success Rate: ${(successCount / pingCount * 100).toFixed(1)}%`);
    console.log(`   🔄 Will retry in 30 minutes...\n`);
  }
}

// Initial ping
keepAlive();

// Schedule pings every 30 minutes (1800000 ms)
setInterval(keepAlive, 30 * 60 * 1000);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Keep-Alive Service Stopping...');
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
  process.exit(0);
});