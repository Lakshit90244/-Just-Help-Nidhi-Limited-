// MongoDB Health Check & Auto-Recovery Script
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority';

console.log('🏥 MongoDB Health Check Service');
console.log('🔍 Monitoring connection health every 2 minutes...');
console.log('🔄 Auto-recovery enabled');
console.log('💡 Press Ctrl+C to stop\n');

let healthChecks = 0;
let healthyChecks = 0;
let recoveryAttempts = 0;

async function healthCheck() {
  const timestamp = new Date().toLocaleTimeString();
  healthChecks++;
  
  try {
    // Check if connected
    if (mongoose.connection.readyState !== 1) {
      console.log(`[${timestamp}] ⚠️ Connection lost - attempting recovery...`);
      await recoverConnection();
      return;
    }
    
    // Ping database
    const startTime = Date.now();
    await mongoose.connection.db.admin().ping();
    const responseTime = Date.now() - startTime;
    
    healthyChecks++;
    console.log(`[${timestamp}] ✅ Health Check ${healthChecks}: HEALTHY`);
    console.log(`   ⚡ Response Time: ${responseTime}ms`);
    console.log(`   📊 Health Rate: ${(healthyChecks / healthChecks * 100).toFixed(1)}%`);
    console.log(`   🔄 Next check in 2 minutes...\n`);
    
  } catch (error) {
    console.log(`[${timestamp}] ❌ Health Check ${healthChecks}: UNHEALTHY`);
    console.log(`   🚨 Error: ${error.message.substring(0, 60)}...`);
    console.log(`   🔄 Attempting recovery...\n`);
    await recoverConnection();
  }
}

async function recoverConnection() {
  recoveryAttempts++;
  const timestamp = new Date().toLocaleTimeString();
  
  try {
    console.log(`[${timestamp}] 🔧 Recovery Attempt ${recoveryAttempts}: Starting...`);
    
    // Disconnect if connected
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    // Reconnect with robust options
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      retryReads: true,
    });
    
    console.log(`[${timestamp}] ✅ Recovery Successful!`);
    console.log(`   🎯 Connection restored`);
    console.log(`   📊 Total Recovery Attempts: ${recoveryAttempts}\n`);
    
  } catch (error) {
    console.log(`[${timestamp}] ❌ Recovery Failed`);
    console.log(`   🚨 Error: ${error.message.substring(0, 60)}...`);
    console.log(`   🔄 Will retry in next health check...\n`);
  }
}

// Initial health check
healthCheck();

// Schedule health checks every 2 minutes (120000 ms)
setInterval(healthCheck, 2 * 60 * 1000);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Health Check Service Stopping...');
  console.log(`📊 Final Stats:`);
  console.log(`   Total Health Checks: ${healthChecks}`);
  console.log(`   Healthy Checks: ${healthyChecks}`);
  console.log(`   Recovery Attempts: ${recoveryAttempts}`);
  console.log(`   Health Rate: ${(healthyChecks / healthChecks * 100).toFixed(1)}%`);
  
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
  process.exit(0);
});