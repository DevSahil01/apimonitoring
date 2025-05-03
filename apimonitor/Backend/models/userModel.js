import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  apiKey: { type: String, unique: true }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Generate API key for monitoring
UserSchema.pre('save', function(next) {
  if (!this.apiKey) {
    this.apiKey = crypto.randomBytes(32).toString('hex');
  }
  next();
});

export default  mongoose.model('User', UserSchema);