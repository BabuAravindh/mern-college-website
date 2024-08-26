const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Router = express.Router();

const {
  getAllCourse,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getAllEvents,
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getAllTestimonials,
  createTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/college');



// Routes for courses
Router.route('/courses')
  .get(getAllCourse)
  .post(createCourse);

Router.route('/courses/:id')
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

// Routes for events
Router.route('/events')
  .get(getAllEvents)
  .post(createEvent);

Router.route('/events/:id')
  .get(getEvents)
  .patch(updateEvent)
  .delete(deleteEvent);

// Routes for testimonials
Router.route('/testimonials')
  .get(getAllTestimonials) // Fetch all testimonials
  .post(createTestimonial); // Create a new testimonial

Router.route('/testimonials/:id')
  .get(getTestimonial) // Fetch a specific testimonial
  .patch(upload.single('image'), updateTestimonial) // Update a specific testimonial
  .delete(deleteTestimonial); // Delete a specific testimonial

// Routes for contacts
Router.route('/contacts')
  .get(getAllContacts) // Fetch all contacts
  .post(createContacts); // Create a new contact

Router.route('/contacts/:id')
  .get(getContact) // Fetch a specific contact
  .patch(updateContact) // Update a specific contact
  .delete(deleteContact); // Delete a specific contact

module.exports = Router;
