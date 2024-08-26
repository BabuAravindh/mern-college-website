import {useState,useEffect} from 'react';
import axios from 'axios';
import  Madurai from '../../images/madurai.png'
import  Chennai from '../../images/chennai.png'
import  Coimbatore from '../../images/coimbatore.png'
import Library from '../../images/library.png'
import Playground from '../../images/basketball.png'
import Cafeteria from '../../images/cafeteria.png'
import User1 from '../../images/user1.jpg'
import User2 from  '../../images/user2.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; 
import { Pagination } from 'swiper/modules';
import Footer from '../footer/Footer';
import Header from '../Header/Header';
const HomeScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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
          <div key={course._id} className="course-col">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
             <h4>Duration</h4><p>{course.duration}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="events">
      <h2>Upcoming Events</h2>
      <p>Join us for these exciting events on campus and online!</p>
      <div className="row1">
        {events.map((event) => (
          <div key={event._id} className="course-col1">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
          </div>
        ))}
      </div>
    </section>

      <section className="campus">
        <h1>Our College Campus</h1>
        <p>Discover our vibrant campus community</p>
        <div className="row">
          <div className="campus-col">
            <img src={Madurai} alt="Madurai" />
            <div className="layer"><h3>MADURAI</h3></div>
          </div>
          <div className="campus-col">
            <img src={Chennai} alt="Coimbatore" />
            <div className="layer"><h3>COIMBATORE</h3></div>
          </div>
          <div className="campus-col">
            <img src={Coimbatore} alt="Chennai" />
            <div className="layer"><h3>CHENNAI</h3></div>
          </div>
        </div>
      </section>

      <section className="facilities">
        <h1>Facilities</h1>
        <p>Facilities that foster creativity and innovation</p>
        <div className="row">
          <div className="facilities-col">
            <img src={Library} alt="Library" />
            <h3>First-Class Library</h3>
            <p>The college library is truly impressive. It boasts a vast collection of books, journals, and research papers on a variety of subjects. The library is well-maintained and has ample space for students to study in peace. The librarians are friendly and always willing to help students find the resources they need.</p>
          </div>
          <div className="facilities-col">
            <img src={Playground} alt="Playground" />
            <h3>Largest Playground</h3>
            <p>The college has a great playground where students can engage in sports and other physical activities. The grounds are well-maintained and offer plenty of space for students to play soccer, basketball, and other sports. The playground is a great place for students to unwind and have fun after a long day of classes.</p>
          </div>
          <div className="facilities-col">
            <img src={Cafeteria} alt="Cafeteria" />
            <h3>Tasty and Healthy</h3>
            <p>The college canteen is a popular spot for students to grab a bite to eat in between classes. The food is delicious and affordable, and there are plenty of options to choose from. The canteen is always clean and well-organized, and the staff is friendly and welcoming. It's a great place for students to socialize and catch up with friends over a meal.</p>
          </div>
        </div>
      </section>

     <Testimonials/>

      <section className="cta">
        <h1>Enroll for our various online courses from Anywhere</h1>
        <a href="#" className="home-btn" onClick={() => window.location.href = 'contact.php'}>CONTACT US</a>
      </section>

     <Footer/>
    </>
  );

}


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error.response?.data || error.message);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials">
      <h1>What Our Students Say</h1>
      <p>Our students feedback</p>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial._id}>
            <div className="testimonials-col">
              <div>
                <p>{testimonial.feedback}</p>
                <h3>{testimonial.name}</h3>
                <p><strong>Department:</strong> {testimonial.department}</p>
             
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};


export default HomeScreen;
