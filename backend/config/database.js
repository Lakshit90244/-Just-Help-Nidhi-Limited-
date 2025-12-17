// Backend Database Configuration
const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority',
    options: {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  collections: {
    users: 'users',
    products: 'products', 
    blogs: 'blogs',
    loanQueries: 'loanqueries',
    loanApplications: 'loanapplications',
    support: 'supports'
  }
};

module.exports = config;