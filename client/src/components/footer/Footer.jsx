
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,  } from 'react-icons/fa';
import '../../app.css'
const Footer = () => {
  return (
    <section className="footer">
    <h4>About Us</h4>
    <p>Welcome to our company! We are dedicated to providing the best services to our customers.<br /> Our team consists of experienced professionals who are committed to meeting your needs and exceeding your expectations.</p>
    <div className="icons">
      <FaFacebook /><FaTwitter /><FaInstagram /><FaLinkedin />
    </div>
  </section>
  )
}

export default Footer
