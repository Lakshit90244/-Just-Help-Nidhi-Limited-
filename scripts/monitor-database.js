// Real-time database monitor
// Run this with: node scripts/monitor-database.js

const mongoose = require('mongoose');
const config = require('../backend/config/database');

// MongoDB connection
const MONGODB_URI = config.mongodb.uri;

// Schemas
const UserSchema = new mongoose.Schema({}, { strict: false });
const ProductSchema = new mongoose.Schema({}, { strict: false });
const BlogSchema = new mongoose.Schema({}, { strict: false });
const LoanQuerySchema = new mongoose.Schema({}, { strict: false });
const LoanApplicationSchema = new mongoose.Schema({}, { strict: false });
const SupportSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const LoanQuery = mongoose.model('LoanQuery', LoanQuerySchema);
const LoanApplication = mongoose.model('LoanApplication', LoanApplicationSchema);
const Support = mongoose.model('Support', SupportSchema);

let previousCounts = {};

async function checkDatabase() {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const blogs = await Blog.countDocuments();
    const loanQueries = await LoanQuery.countDocuments();
    const loanApplications = await LoanApplication.countDocuments();
    const supportTickets = await Support.countDocuments();

    const currentCounts = {
      users,
      products,
      blogs,
      loanQueries,
      loanApplications,
      supportTickets
    };

    // Check for changes
    let hasChanges = false;
    for (const [key, count] of Object.entries(currentCounts)) {
      if (previousCounts[key] !== count) {
        hasChanges = true;
        break;
      }
    }

    if (hasChanges || Object.keys(previousCounts).length === 0) {
      console.clear();
      console.log('🔄 DATABASE MONITOR - Live Updates');
      console.log('=' .repeat(50));
      console.log(`📊 Database: finance-website`);
      console.log(`🕒 Last Update: ${new Date().toLocaleTimeString()}`);
      console.log('=' .repeat(50));
      console.log(`👥 Users: ${users} records`);
      console.log(`📦 Products: ${products} records`);
      console.log(`📝 Blogs: ${blogs} records`);
      console.log(`💰 Loan Queries: ${loanQueries} records`);
      console.log(`📋 Loan Applications: ${loanApplications} records`);
      console.log(`🎧 Support Tickets: ${supportTickets} records`);
      console.log('=' .repeat(50));
      
      if (Object.keys(previousCounts).length > 0) {
        console.log('🆕 CHANGES DETECTED:');
        for (const [key, count] of Object.entries(currentCounts)) {
          if (previousCounts[key] !== count) {
            const change = count - (previousCounts[key] || 0);
            const emoji = change > 0 ? '📈' : '📉';
            console.log(`   ${emoji} ${key}: ${previousCounts[key] || 0} → ${count} (${change > 0 ? '+' : ''}${change})`);
          }
        }
        console.log('=' .repeat(50));
      }
      
      console.log('💡 Monitoring... Press Ctrl+C to stop');
      console.log('🌐 Admin Panel: http://localhost:3000/admin');
      console.log('🔗 API Users: http://localhost:3000/api/users');
      
      previousCounts = currentCounts;
    }

  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  }
}

async function startMonitoring() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB - Starting Monitor...\n');
    
    // Initial check
    await checkDatabase();
    
    // Check every 2 seconds
    setInterval(checkDatabase, 2000);
    
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Stopping database monitor...');
  await mongoose.disconnect();
  console.log('📤 Disconnected from MongoDB');
  process.exit(0);
});

// Start monitoring
startMonitoring();