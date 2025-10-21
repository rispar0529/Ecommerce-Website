import React, { useState } from 'react';
import { Button, Input } from '@components/ui';

export const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert('Passwords do not match');
      return;
    }
    const { password2, ...registerData } = formData;
    onSubmit(registerData);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <Input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={formData.password2}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};
