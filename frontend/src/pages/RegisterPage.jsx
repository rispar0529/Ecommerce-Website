import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth';
import { RegisterForm } from '@features/auth';
import './AuthPages.css';

export const RegisterPage = () => {
  const { isAuthenticated, isError, message, handleRegister, resetAuthState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      resetAuthState();
    };
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isError && message) {
      alert(message);
      resetAuthState();
    }
  }, [isError, message]);

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">✨</div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join our community today</p>
          </div>
          
          <RegisterForm onSubmit={onSubmit} />
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <div className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>

        <div className="auth-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};
