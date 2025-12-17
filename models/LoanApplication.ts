import mongoose from 'mongoose';

const LoanApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  loanDetails: {
    loanType: {
      type: String,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    tenure: Number,
    purpose: String,
  },
  employmentInfo: {
    employmentType: String,
    companyName: String,
    designation: String,
    monthlyIncome: Number,
    workExperience: Number,
  },
  documents: [{
    name: String,
    url: String,
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under-review', 'approved', 'rejected', 'disbursed'],
    default: 'draft',
  },
  remarks: String,
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
