
import { NavLink, useLocation } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';
import '../../app.css'
const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/about':
        return 'About Us';
      case '/courses':
        return 'Our Courses';
      case '/contact':
        return 'Contact Us';
      case '/login':
        return 'Login';
      default:
        return 'Home';
    }
  };

  return (
    <section className={location.pathname === '/' ? 'header' : 'sub-header'}>
      <nav>
        <div className="nav-links" id="navLinks">
          <FaTimes className="fa fa-times" />
          <ul>
            <li><NavLink to='/'>HOME</NavLink></li>
            <li><NavLink to='/about'>ABOUT</NavLink></li>
            <li><NavLink to='/courses'>COURSE</NavLink></li>
            <li><NavLink to='/contact'>CONTACT</NavLink></li>
            <li><NavLink to='/login'>LOGIN</NavLink></li>
            <li><NavLink to='/register'>REGISTER</NavLink></li>
          </ul>
        </div>
        <FaBars className="fa fa-bars" id="bars" />
      </nav>

      {location.pathname === '/' ? (
        <div className="text-box">
          <h1>The Central College</h1>
          <p>
            Education is the most powerful weapon which you can use to change the world
            <br />- Nelson Mandela
          </p>
          <a href="#" className="home-btn">Visit Us to Know More</a>
        </div>
      ) : (
        <h1>{getTitle()}</h1>
      )}
    </section>
  );
};

export default Header;
