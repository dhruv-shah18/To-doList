import React, { useState } from 'react';
import './UserRegister.css';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useFetchHook } from '../../API/useFetchHook';
import { API } from '../../API/APIRoute';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { fetchData } = useFetchHook();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData({ API_URL : API.USER_REGISTER, METHOD_TYPE : 'POST', PAYLOAD : formData});
    if ( response.user && response.user.email) {
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Create Your Account 📝</h1>
        <p>Register to start managing your tasks effortlessly</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <div className="extra-links">
          <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
