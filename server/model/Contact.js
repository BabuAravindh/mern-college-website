const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    minlength: 3,
    maxlength: 50
  },
  subject: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  message: {
    type: String,
    minlength: 3,
    required: true
  },
  
},);

module.exports = mongoose.model('Contact', ContactSchema);
