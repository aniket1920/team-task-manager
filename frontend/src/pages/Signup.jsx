import { useState } from 'react';

import API from '../api/axios';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      role: 'member',
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
        '/auth/signup',
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
        'Signup Successful'
      );

      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          'Signup Failed'
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h1 className="mb-4">
          Signup
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            onChange={handleChange}
          />

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

          <select
            name="role"
            className="form-control mb-3"
            onChange={handleChange}
          >
            <option value="member">
              Member
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button className="btn btn-success w-100">
            Signup
          </button>

        </form>

        <p className="text-center mt-4">
          Already have account?{' '}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;