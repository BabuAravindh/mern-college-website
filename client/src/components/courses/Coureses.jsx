import { useState,useEffect } from 'react';
import '../../app.css'
import Header from "../Header/Header"
import axios from 'axios';
const Coureses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/courses');
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
      fetchCourses();
    }, []);
  return (
    <>
    <Header/>
    <section className="course">
      <h1>Our Highlights</h1>
      <p>Get ahead in your career with our industry-driven courses that are designed to help you build in-demand skills and advance your professional goals. Our courses are taught by industry experts and are updated regularly to keep pace with the latest trends and technologies.</p>
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="course-page">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
             <h4>Duration</h4><p>{course.duration}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Coureses
