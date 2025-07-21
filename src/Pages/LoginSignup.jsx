import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Form submitted:', formData);
    // Redirect after successful login/signup
    navigate('/');
  };

  return (
    <div className='auth-container'>
      <div className="auth-card">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          {!isLogin && (
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                By continuing, I agree to the terms of use & privacy policy.
              </label>
            </div>
          )}
          
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Continue'}
          </button>
        </form>
        
        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Sign up here' : ' Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
