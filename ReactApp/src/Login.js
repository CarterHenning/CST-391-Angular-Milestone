import React, { useState } from 'react';
import './App.css';
import { useAuth } from './AuthContext';
import { data, useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (username && password) {
      const user = { username, password };
  
      try {
        const response = await dataSource.post('/login', user);
  
        if (response.status === 200) {
          login(response.data.user);
          navigate('/home');
        }
      } catch (error) {

        if (error.response && error.response.status === 401) {
          setErrorMessage('Invalid username or password. Please try again.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      }
    } else {
      setErrorMessage('Username and password are required.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
