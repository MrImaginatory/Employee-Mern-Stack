import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you're using fetch to send a POST request to your backend API
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect or perform any action upon successful login
        console.log('Login successful');
        setTimeout(() => {
          navigate('/employeeData');
        },2000);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className='login-form'>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    {/* <span>{message}</span> */}
    <label htmlFor="email">Email address</label>
    <input
      type="email"
      className="form-control"
      id="email"
      aria-describedby="emailHelp"
      placeholder="Enter email"
      value={email}
      name='email'
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      placeholder="Password"
      value={password}
      name='password'
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <div className="form-group">
    <span>
      <Link to="/register">Create An Account</Link>
    </span>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </section>
  );
}

export default LoginForm;