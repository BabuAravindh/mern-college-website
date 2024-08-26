import { useState, useEffect } from 'react';
import axios from 'axios';
import './CRUDTestimonials.css'; // Create this CSS file for styling

const CRUDTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [feedback, setFeedback] = useState('');
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTestimonials(); // Fetch testimonials when component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('department', department);
    formData.append('feedback', feedback);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (selectedTestimonial) {
        // Update testimonial
        await axios.patch(`http://localhost:5000/api/v1/testimonials/${selectedTestimonial._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponseMessage('Testimonial updated successfully!');
      } else {
        // Create testimonial
        await axios.post('http://localhost:5000/api/v1/testimonials', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponseMessage('Testimonial created successfully!');
      }

      clearForm();
      fetchTestimonials(); // Re-fetch testimonials after creating/updating
    } catch (error) {
      console.error('Error creating/updating testimonial:', error.response?.data || error.message);
      setResponseMessage(`Error creating/updating testimonial: ${error.response?.data?.error || error.message}`);
    }
  };

  // Handle testimonial selection
  const handleSelect = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setName(testimonial.name);
    setDepartment(testimonial.department);
    setFeedback(testimonial.feedback);
    setImage(null); // Clear image
    setResponseMessage('');
  };

  // Handle testimonial deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/testimonials/${id}`);
      setResponseMessage('Testimonial deleted successfully!');
      setSelectedTestimonial(null);
      clearForm();
      fetchTestimonials(); // Re-fetch testimonials after deletion
    } catch (error) {
      console.error('Error deleting testimonial:', error.response?.data || error.message);
      setResponseMessage(`Error deleting testimonial: ${error.response?.data?.error || error.message}`);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setName('');
    setDepartment('');
    setFeedback('');
    setImage(null);
    setSelectedTestimonial(null);
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h2>{selectedTestimonial ? 'Update Testimonial' : 'Create New Testimonial'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              placeholder="Enter feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
         
          <button type="submit">{selectedTestimonial ? 'Update Testimonial' : 'Create Testimonial'}</button>
          {selectedTestimonial && <button type="button" onClick={clearForm}>Cancel</button>}
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
      <div className="testimonials-container">
        <h2>Testimonials</h2>
        {testimonials.length > 0 ? (
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial._id}>
                <h3>{testimonial.name}</h3>
                <p><strong>Department:</strong> {testimonial.department}</p>
                <p><strong>Feedback:</strong> {testimonial.feedback}</p>
           
                <div className="card-actions">
                  <button onClick={() => handleSelect(testimonial)}>Edit</button>
                  <button onClick={() => handleDelete(testimonial._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No testimonials available.</p>
        )}
      </div>
    </div>
  );
};

export default CRUDTestimonials;
