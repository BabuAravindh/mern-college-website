import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../app.css'
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Add state for email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        name,
        email,  // Include email in the request
        password,
      });
      
      console.log(response.data.message);
      
      navigate('/admin');
    } catch (error) {
      console.error('Error during registration:', error.response?.data?.message || error.message);
    }
  };

  return (
    <section className='register'>
      <div className="center">
        <h1>Register</h1>
        <form onSubmit={handleRegister} autoComplete="off">
          <div className="txt_field">
            <input
              style={{ color: 'white' }}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
            <span></span>
          </div>
          <div className="txt_field">
            <input
              style={{ color: 'white' }}
              type="email"  // Update input to email
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <span></span>
          </div>
          <button type="submit" className="button" name="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
