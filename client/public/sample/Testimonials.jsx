
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import pagination styles
import { Pagination } from 'swiper/modules';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h1>What Our Students Say</h1>
      <p>Our students feedback</p>
      <Swiper
        modules={[Pagination]} // Use the Pagination module
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="testimonials-col">
            <img src="../images/user1.jpg" alt="Student 1" />
            <div>
              <p>
                This college is amazing! The professors are so knowledgeable and passionate about their subjects. I feel like Im really learning a lot here.
                The facilities here are top-notch. The library has everything I need, and the classrooms are always clean and comfortable.
              </p>
              <h3>Abi</h3>
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonials-col">
            <img src="../images/user2.jpg" alt="Student 2" />
            <div>
              <p>
                The extracurricular activities here are so much fun. Theres always something going on, whether its a sports game or a club meeting.
                The administration here is really helpful. Whenever Ive had a problem, theyve been quick to respond and offer solutions.
              </p>
              <h3>Henry</h3>
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Add more SwiperSlides for additional testimonials */}
      </Swiper>
    </section>
  );
};

export default Testimonials;
