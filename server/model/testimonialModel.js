const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  feedback: { type: String, required: true ,minlength:20 },
 
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
