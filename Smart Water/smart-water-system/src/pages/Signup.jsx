import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: '', email: '', password: '', phone: '', address: '',
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/addUser', register);
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create an Account</h1>
        <p>Start saving water with our smart system!</p>

        <form onSubmit={handleSignup}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={register.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={register.password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={register.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </label>

          <label>
            Address
            <input
              type="text"
              name="address"
              value={register.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </label>

          <button className="lsbtn" type="submit">Sign Up</button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
