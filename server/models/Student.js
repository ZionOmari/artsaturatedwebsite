const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  
  // Parent/Guardian Information (for students under 18)
  parentFirstName: {
    type: String,
    trim: true
  },
  parentLastName: {
    type: String,
    trim: true
  },
  parentEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  parentPhone: {
    type: String,
    trim: true
  },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  
  // Dance Information
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  interestedStyles: [{
    type: String,
    enum: ['breaking', 'popping', 'locking', 'funk']
  }],
  
  // Waiver and Legal
  waiverSigned: {
    type: Boolean,
    default: false
  },
  waiverSignedDate: Date,
  waiverSignedBy: String, // Name of person who signed
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'free_trial'],
    default: 'pending'
  },
  membershipType: {
    type: String,
    enum: ['monthly', 'trial', 'private_only'],
    default: 'trial'
  },
  lastPaymentDate: Date,
  nextPaymentDue: Date,
  
  // Class Tracking
  hasAttendedFirstClass: {
    type: Boolean,
    default: false
  },
  firstClassDate: Date,
  totalClassesAttended: {
    type: Number,
    default: 0
  },
  classesAttended: [{
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    date: Date,
    instructor: String
  }],
  
  // Sponsorship Information
  isSponsored: {
    type: Boolean,
    default: false
  },
  sponsorInfo: {
    sponsorName: String,
    sponsorEmail: String,
    sponsorshipType: {
      type: String,
      enum: ['full', 'partial', 'dance_bag']
    },
    sponsorshipAmount: Number,
    sponsorshipStartDate: Date,
    sponsorshipEndDate: Date
  },
  
  // Scholarship Information
  hasScholarship: {
    type: Boolean,
    default: false
  },
  scholarshipInfo: {
    type: {
      type: String,
      enum: ['full', 'partial']
    },
    percentage: Number, // e.g., 50 for 50% scholarship
    approvedDate: Date,
    reason: String
  },
  
  // Account Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending_approval'],
    default: 'pending_approval'
  },
  
  // Communication Preferences
  emailOptIn: {
    type: Boolean,
    default: true
  },
  smsOptIn: {
    type: Boolean,
    default: false
  },
  
  // Notes
  notes: String,
  
  // System Fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
StudentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for full name
StudentSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
StudentSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for determining if student is a minor
StudentSchema.virtual('isMinor').get(function() {
  return this.age < 18;
});

// Index for efficient queries
StudentSchema.index({ email: 1 });
StudentSchema.index({ status: 1 });
StudentSchema.index({ paymentStatus: 1 });
StudentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Student', StudentSchema); 