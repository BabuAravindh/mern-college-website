const Course = require('../model/courseModel');
const Event = require('../model/eventModel');
const Testimonial = require('../model/testimonialModel');  
const Contact = require('../model/Contact')

// Course Controllers
const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create course' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

// Event Controllers
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getEvents = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

  const createEvent = async (req, res) => {
      try {
        const { name, date, location } = req.body;
    
        // Validate request data
        if (!name || !date || !location) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        // Ensure date is in a valid format
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({ error: 'Invalid date format' });
        }
    
        // Create event
        const event = await Event.create({ name, date, location });
        res.status(201).json(event);
      } catch (error) {
        console.error('Failed to create event:', error);
        res.status(500).json({ error: 'Failed to create event' });
      }
    };
    
    
  
  const updateEvent = async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update event' });
    }
  };
  
  const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  };



//Testimonials 
const getAllTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  };
  
  
const getTestimonial = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonial' });
    }
  };
  


const createTestimonial = async (req, res) => {
  try {
    const { name, department, feedback } = req.body;
  
    if (!name || !department || !feedback) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const testimonial = await Testimonial.create({ name, department, feedback });
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};


const updateTestimonial = async (req, res) => {
  try {
    const { name, department, feedback } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, department, feedback },
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update testimonial' });
  }
};


const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

const createContacts = async (req,res) => {
  try {
    const { name, email,subject,message} = req.body;
  
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const contact = await Contact.create({ name,email,subject,message});
    res.status(201).json(contact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
}

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, subject, message },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update contact' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact details deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact details' });
  }
};



module.exports = {
  getAllCourse,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllEvents,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllTestimonials,
  getTestimonial, 
  createTestimonial,
  updateTestimonial, 
  deleteTestimonial,
  getAllContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact 
};

