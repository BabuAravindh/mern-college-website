import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ onSelect, selected }) => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li
          onClick={() => onSelect('events')}
          className={selected === 'events' ? 'active' : ''}
        >
          Events
        </li>
        <li
          onClick={() => onSelect('courses')}
          className={selected === 'courses' ? 'active' : ''}
        >
          Courses
        </li>
        <li
          onClick={() => onSelect('testimonials')}
          className={selected === 'testimonials' ? 'active' : ''}
        >
          Testimonials
        </li>
        <li 
        onClick={() => onSelect('contacts')}
        className={selected === 'contacts' ? 'active' : ''}
     >
      Contacts
     </li>
        <li
          onClick={handleLogout}
          className={selected === 'logout' ? 'active' : ''}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
