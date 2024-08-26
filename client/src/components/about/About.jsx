import Footer from '../footer/Footer'
import Header from '../Header/Header'
import aboutIMG from '../../images/about.png'

import '../../app.css'
const About = () => {
  return (
    <>
    <Header/>
    <section className="about-us">
    <div className="row">
        <div className="about-col">
            <h1>we are the largest university</h1>
            <p>Welcome to the future , a leading institution of higher education dedicated to academic excellence, innovation, and social responsibility.

                Founded in [Year], our college has a rich history of providing students with the knowledge, skills, and experiences they need to succeed in their chosen fields. Our mission is to empower students to become ethical leaders and global citizens who are prepared to tackle the complex challenges of the 21st century.
                
                At [College Name], we offer a wide range of academic programs and degrees designed to meet the needs of students with diverse interests and career goals. Our faculty members are experts in their fields and are committed to providing students with an exceptional educational experience that emphasizes hands-on learning, critical thinking, and problem-solving skills.
                
                In addition to our academic programs, we offer a vibrant campus life that includes a wide range of student organizations, clubs, and athletic teams. Our campus is home to state-of-the-art facilities, including modern classrooms, labs, and athletic facilities, as well as comfortable housing and dining options.
                
                We are also proud of our commitment to research and innovation, which is reflected in our partnerships with industry leaders and other research institutions. Our students and faculty are engaged in cutting-edge research and development initiatives that are helping to address some of the world's most pressing challenges.
                
                We are proud of our alumni network, which includes thousands of successful professionals who are making a difference in their communities and around the world. Our graduates are leaders in fields such as business, education, healthcare, engineering, and the arts.
                
                Thank you for considering [College Name] for your educational journey. We look forward to helping you achieve your academic and career goals.
                </p>
            <a href="" className="home-btn red-btn">EXPLORE NOW</a>
        </div>
        <div className="about-col">
            <img src={aboutIMG}/>
        </div>
    </div>
</section>
<Footer/>
</>
  )
}

export default About
