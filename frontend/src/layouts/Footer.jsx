import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};
