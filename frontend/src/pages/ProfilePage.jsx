import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth';
import { Spinner } from '@components/ui';
import { formatDate } from '@utils/helpers';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { user, isLoading, handleGetProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    navigate('/login');
    return;
  }
  
  if (!user.fullname) {
    handleGetProfile();
  }
}, [user]); // Remove navigate

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="container-profile">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="avatar-circle">
              {user.fullname?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="avatar-badge">✓</div>
          </div>
          <div className="profile-header-info">
            <h1>{user.fullname || 'User'}</h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-badges">
              <span className="badge-item">
                <span className="badge-icon">⭐</span>
                Premium Member
              </span>
              <span className="badge-item">
                <span className="badge-icon">📅</span>
                Member since {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="card-header">
              <h3>Personal Information</h3>
              <button className="btn btn-outline btn-sm">Edit Profile</button>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user.fullname || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Type</span>
                <span className="info-value">
                  <span className="type-badge">{user.isAdmin ? 'Admin' : 'Customer'}</span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since</span>
                <span className="info-value">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="profile-actions-grid">
            <button className="action-card" onClick={() => navigate('/orders')}>
              <span className="action-icon">📦</span>
              <h4>My Orders</h4>
              <p>View and track orders</p>
            </button>

            <button className="action-card" onClick={() => navigate('/products/my-products')}>
              <span className="action-icon">🏪</span>
              <h4>My Products</h4>
              <p>Manage your listings</p>
            </button>

            <button className="action-card" onClick={() => navigate('/cart')}>
              <span className="action-icon">🛒</span>
              <h4>Shopping Cart</h4>
              <p>View cart items</p>
            </button>

            <button className="action-card">
              <span className="action-icon">⚙️</span>
              <h4>Settings</h4>
              <p>Account preferences</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
