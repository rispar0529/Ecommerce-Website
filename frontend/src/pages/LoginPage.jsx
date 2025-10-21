import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth';
import { LoginForm } from '@features/auth';
import './AuthPages.css';

export const LoginPage = () => {
  const { isAuthenticated, isError, message, handleLogin, resetAuthState } = useAuth();
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

  const onSubmit = (credentials) => {
    handleLogin(credentials);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue shopping</p>
          </div>
          
          <LoginForm onSubmit={onSubmit} />
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <div className="auth-link">
            Don't have an account? <Link to="/register">Create one now</Link>
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
