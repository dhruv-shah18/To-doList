import React, { useState } from 'react';
import './UserLogin.css';
import { Link } from 'react-router';
import { useFetchHook } from '../../API/useFetchHook';
import { API } from '../../API/APIRoute';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { setAuthToken, setUser, setRole } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const { fetchData } = useFetchHook();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetchData({API_URL : API.USER_LOGIN, METHOD_TYPE :'POST', PAYLOAD : credentials });
    if(response.access_token){
      setAuthToken(response.access_token);
      setUser(response.user.email);
      setRole(response.user.role || 'user');
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('user', response.user.email);
      localStorage.setItem('role', response.user.role || 'user');
      response?.user?.role === "admin" ? navigate('/admin') : navigate('/alltasks');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome Back 👋</h1>
        <p>Login to manage your tasks efficiently</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Task Manager Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <div className="extra-links">
          <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          <p><a href="#">Forgot password?</a></p>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
