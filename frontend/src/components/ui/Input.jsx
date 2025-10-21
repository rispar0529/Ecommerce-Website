import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input className={`form-control ${error ? 'error' : ''} ${className}`} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
