
import { Link } from 'react-router-dom';
import './home.css'; // Ensure you have this file in your src directory
import { FaTimes, FaBars } from 'react-icons/fa';
const Header = () => {
  return (
    
<section className="header">
  <nav>
    <div className="nav-links" id="navLinks">
      <FaTimes className="fa" onClick={hideMenu} />
      <ul>
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/course">COURSE</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        <li><Link to="/blog">BLOG</Link></li>
        <li><Link to="/students/login">LOGIN</Link></li>
        <li><Link to="/admin/admin_login">ADMIN</Link></li>
      </ul>
    </div>
    <FaBars className="fa" onClick={showMenu} id="bars" />
  </nav>
  <div className="text-box">
    <h1>Brookshire College</h1>
    <p>Education is the most powerful weapon which you can use to change the world.<br />- Nelson Mandela</p>
    <Link to="/contact" className="home-btn">Visit Us to Know More</Link>
  </div>
</section>
  )
  function showMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.left = "0";
  }

  function hideMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.left = "-200px";
  }
}

export default Header
