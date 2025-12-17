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
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'completed', 'rejected'],
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