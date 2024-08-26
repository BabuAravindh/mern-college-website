// src/components/NotFound/NotFound.js

import { useNavigate } from 'react-router-dom';
import './NotFount.css'; 

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={handleGoHome} className="go-home-button">
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
