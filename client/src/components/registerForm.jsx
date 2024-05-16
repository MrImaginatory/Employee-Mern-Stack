import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registerForm.css';

function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting to login page...');
        setTimeout(() => {
         navigate('/login');
        }, 3000);
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card">
        <div className="card-header">Register Yourself<span>{message}</span></div>

        <div className="card-body">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="cols-sm-2 control-label">Your Name</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
            </div>
            <div className="form-group">
              <span>
                <Link to="/login">SignIn to Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default RegisterForm;
