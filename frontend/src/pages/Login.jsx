import { useState } from 'react';

import API from '../api/axios';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        '/auth/login',
        formData
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'role',
        res.data.role
      );

      toast.success(
        'Login Successful'
      );

      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          'Login Failed'
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h1 className="mb-4">
          Login
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          New User?{' '}

          <Link to="/signup">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;