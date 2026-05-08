import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      // SAVE TOKEN
      localStorage.setItem(
        'token',
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      alert('Login Successful');

      navigate('/dashboard');

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        'Login Failed'
      );
    }
  };

  return (
    <div className="container mt-5 text-light">

      <div className="card bg-dark text-light border-secondary p-5">

        <h1 className="mb-4">
          Login
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control bg-black text-light border-secondary mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control bg-black text-light border-secondary mb-4"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <p className="mt-4 text-center">

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