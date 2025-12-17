import mongoose from 'mongoose';

const LoanApplicationSchema = new mongoose.Schema({
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
  address: {
    type: String,
  },
  loanDetails: {
    loanType: String,
    loanAmount: Number,
    tenure: String,
    purpose: String,
  },
  documents: [{
    type: String,
    url: String,
  }],
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected'],
    default: 'pending',
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

export default mongoose.models.LoanApplication || mongoose.model('LoanApplication', LoanApplicationSchema);