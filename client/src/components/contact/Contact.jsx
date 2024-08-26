import Header from '../Header/Header';
import '../../app.css';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [testimonialData, setTestimonialData] = useState({
    name: '',
    department: '',
    feedback: ''
  });

  const handleChange = (e, form) => {
    if (form === 'contact') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else if (form === 'testimonial') {
      setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    try {
      let response;
      if (form === 'contact') {
        response = await axios.post('http://localhost:5000/api/v1/contacts', formData);
        if (response.status !== 201) {
          throw new Error('Failed to send message');
        }
        toast.success('Message sent successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (form === 'testimonial') {
        response = await axios.post('http://localhost:5000/api/v1/testimonials', testimonialData);
        if (response.status !== 201) {
          throw new Error('Failed to submit testimonial');
        }
        toast.success('Testimonial submitted successfully');
        setTestimonialData({ name: '', department: '', feedback: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      toast.error('There was an error submitting your form.');
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section className="location">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.175405830232!2d78.16238387478286!3d9.835630975841957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00fab2102cf835%3A0x64e0dd01744bf1f5!2sK.L.N.%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1724566120563!5m2!1sen!2sin" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="College Location"
        ></iframe>
      </section>
      <section className="contact-us">
        <h2>Contact Form</h2>
        <div className="row">
          <div className="contact-col">
            <form onSubmit={(e) => handleSubmit(e, 'contact')}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e, 'contact')}
                placeholder="Enter your name"
                aria-label="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e, 'contact')}
                placeholder="Enter email address"
                aria-label="Your Email"
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={(e) => handleChange(e, 'contact')}
                placeholder="Enter your subject"
                aria-label="Subject"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => handleChange(e, 'contact')}
                rows="8"
                placeholder="Message"
                aria-label="Your Message"
                required
              ></textarea>
              <button
                type="submit"
                className="home-btn red-btn"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="contact-col">
            <h2>Feedback Form</h2>
            <form onSubmit={(e) => handleSubmit(e, 'testimonial')}>
              <input
                type="text"
                name="name"
                value={testimonialData.name}
                onChange={(e) => handleChange(e, 'testimonial')}
                placeholder="Enter your name"
                aria-label="Your Name"
                required
              />
              <input
                type="text"
                name="department"
                value={testimonialData.department}
                onChange={(e) => handleChange(e, 'testimonial')}
                placeholder="Enter your department"
                aria-label="Your Department"
                required
              />
              <textarea
                name="feedback"
                value={testimonialData.feedback}
                onChange={(e) => handleChange(e, 'testimonial')}
                rows="8"
                placeholder="Your feedback"
                aria-label="Your Feedback"
                required
              ></textarea>
              <button
                type="submit"
                className="home-btn red-btn"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
