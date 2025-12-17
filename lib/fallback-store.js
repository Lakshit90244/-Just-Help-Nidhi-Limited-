// In-memory storage for fallback data when database is unavailable
class FallbackStore {
  constructor() {
    this.data = {
      users: [
        {
          _id: 'admin_001',
          name: 'Pallav Joshi',
          email: 'pallavjoshi@gmail.com',
          password: 'pallav123',
          phone: '+91-9876543210',
          role: 'admin',
          status: 'active',
          createdAt: new Date()
        },
        {
          _id: 'user_001',
          name: 'Test User',
          email: 'test@gmail.com',
          password: 'test123',
          phone: '+91-9876543211',
          role: 'user',
          status: 'active',
          createdAt: new Date()
        },
        {
          _id: 'user_002',
          name: 'Demo User',
          email: 'demo@gmail.com',
          password: 'demo123',
          phone: '+91-9876543212',
          role: 'user',
          status: 'active',
          createdAt: new Date()
        }
      ],
      products: [
        {
          _id: 'prod_001',
          name: 'Premium Gold Loan',
          type: 'Gold Loan',
          description: 'Get instant cash against your gold ornaments with best rates',
          interestRate: 11.5,
          minAmount: 10000,
          maxAmount: 500000,
          tenure: '3-60 months',
          features: ['Instant approval', 'Transparent rates', 'Insurance coverage'],
          status: 'active',
          createdAt: new Date()
        },
        {
          _id: 'prod_002',
          name: 'Property Loan Plus',
          type: 'Property Loan',
          description: 'Secure loans against your residential or commercial property',
          interestRate: 9.5,
          minAmount: 500000,
          maxAmount: 5000000,
          tenure: '5-20 years',
          features: ['High LTV ratio', 'Competitive rates', 'Flexible tenure'],
          status: 'active',
          createdAt: new Date()
        },
        {
          _id: 'prod_003',
          name: 'Quick Cash Loan',
          type: 'Personal Loan',
          description: 'Get instant cash for your urgent needs with minimal documentation',
          interestRate: 12.5,
          minAmount: 25000,
          maxAmount: 300000,
          tenure: '6-48 months',
          features: ['No collateral required', 'Quick approval in 24 hours', 'Flexible repayment'],
          status: 'active',
          createdAt: new Date()
        }
      ],
      blogs: [
        {
          _id: 'blog_001',
          title: 'Understanding Gold Loan Benefits',
          content: 'Gold loans are one of the most popular secured loan options in India. They offer quick processing, minimal documentation, and competitive interest rates.',
          author: 'Finance Expert',
          category: 'Finance',
          status: 'published',
          publishedAt: new Date(),
          createdAt: new Date()
        },
        {
          _id: 'blog_002',
          title: 'Investment Tips for 2024',
          content: 'As we move into 2024, it is important to review your investment strategy. This guide covers the best investment options and risk management.',
          author: 'Investment Advisor',
          category: 'Investment',
          status: 'published',
          publishedAt: new Date(),
          createdAt: new Date()
        }
      ],
      loanQueries: [],
      loanApplications: [],
      supportTickets: []
    };
  }

  // Get all items of a type
  getAll(type) {
    return this.data[type] || [];
  }

  // Get single item by ID
  getById(type, id) {
    const items = this.data[type] || [];
    return items.find(item => item._id === id);
  }

  // Create new item
  create(type, item) {
    if (!this.data[type]) this.data[type] = [];
    
    const newItem = {
      _id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...item,
      createdAt: new Date()
    };
    
    this.data[type].push(newItem);
    return newItem;
  }

  // Update existing item
  update(type, id, updates) {
    const items = this.data[type] || [];
    const index = items.findIndex(item => item._id === id);
    
    if (index === -1) return null;
    
    const updatedItem = {
      ...items[index],
      ...updates,
      updatedAt: new Date()
    };
    
    this.data[type][index] = updatedItem;
    return updatedItem;
  }

  // Delete item
  delete(type, id) {
    if (!this.data[type]) return false;
    
    const index = this.data[type].findIndex(item => item._id === id);
    if (index === -1) return false;
    
    this.data[type].splice(index, 1);
    return true;
  }

  // Check if email exists (for users)
  emailExists(email, excludeId = null) {
    const users = this.data.users || [];
    return users.some(user => user.email === email && user._id !== excludeId);
  }
}

// Create singleton instance
const fallbackStore = new FallbackStore();

module.exports = fallbackStore;