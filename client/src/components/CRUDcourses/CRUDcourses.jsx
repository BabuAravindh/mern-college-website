import { useState, useEffect } from 'react';
import axios from 'axios';
import './CRUDcourses.css';

const CRUDcourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCourses(); // Call fetchCourses when component mounts
  }, []);

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: courseName,
        description,
        duration,
      };

      if (selectedCourse) {
        // Update course
        const response = await axios.patch(`http://localhost:5000/api/v1/courses/${selectedCourse._id}`, payload);
        setMessage('Course updated successfully!');
        console.log('Course updated:', response.data);
      } else {
        // Create course
        const response = await axios.post('http://localhost:5000/api/v1/courses', payload);
        setMessage('Course created successfully!');
        console.log('Course created:', response.data);
      }

      clearForm();
      fetchCourses(); // Re-fetch courses after creating/updating
    } catch (error) {
      console.error('Error creating/updating course:', error.response?.data || error.message);
      setMessage(`Error creating/updating course: ${error.response?.data?.error || error.message}`);
    }
  };

  // Handle course selection
  const handleSelect = (course) => {
    setSelectedCourse(course);
    setCourseName(course.name);
    setDescription(course.description);
    setDuration(course.duration);
    setMessage('');
  };

  // Handle course deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/courses/${id}`);
      setMessage('Course deleted successfully!');
      setSelectedCourse(null);
      clearForm();
      fetchCourses(); // Re-fetch courses after deletion
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
      setMessage(`Error deleting course: ${error.response?.data?.error || error.message}`);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setCourseName('');
    setDescription('');
    setDuration('');
    setSelectedCourse(null);
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h2>{selectedCourse ? 'Update Course' : 'Create New Course'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              placeholder="Enter course duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <button type="submit">{selectedCourse ? 'Update Course' : 'Create Course'}</button>
          {selectedCourse && <button type="button" onClick={clearForm}>Cancel</button>}
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="courses-container">
        <h2>Courses</h2>
        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course._id}>
                <h3>{course.name}</h3>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <div className="card-actions">
                  <button onClick={() => handleSelect(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CRUDcourses;
