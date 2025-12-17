import mongoose from 'mongoose';

const LoanQuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  loanType: {
    type: String,
    required: true,
    enum: ['personal', 'home', 'car', 'business', 'education', 'other'],
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  tenure: {
    type: Number,
  },
  income: {
    type: Number,
  },
  employmentType: {
    type: String,
    enum: ['salaried', 'self-employed', 'business', 'other'],
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'processing', 'approved', 'rejected', 'closed'],
    default: 'new',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LoanQuery || mongoose.model('LoanQuery', LoanQuerySchema);
