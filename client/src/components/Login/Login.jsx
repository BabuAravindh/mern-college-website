import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../app.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password,
      });
  
      // Assuming the backend sends a token
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token
  
      console.log('Login successful:', response.data.message);
      navigate('/admin-dashboard'); // Redirect to a dashboard or another page upon success
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className='login'>
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="txt_field">
            <input
            type="email"
              style={{ color: 'white' }}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
            <span></span>
          </div>
          <div className="txt_field">
            <input
              type="password"
              style={{ color: 'white' }}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <span></span>
          </div>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          
          <button type="submit" className="button" name="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
