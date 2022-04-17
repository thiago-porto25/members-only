const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 50 },
  isMember: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
