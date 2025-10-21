import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth';
import { useCart } from '@features/cart';

export const Header = () => {
  const { user, isAuthenticated, handleLogout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  const displayName = user?.fullname || user?.email?.split('@')[0] || 'User';

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          ShopLogo
        </Link>

        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link">
                Cart
                {cartItemsCount > 0 && (
                  <span className="badge">{cartItemsCount}</span>
                )}
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="nav-link user-link">
                    <span className="user-icon">👤</span>
                    {displayName}
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogoutClick} className="logout-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="btn btn-primary btn-sm">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
