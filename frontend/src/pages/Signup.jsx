import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      console.log('Sending:', formData);

      const res = await API.post(
        '/auth/signup',
        formData
      );

      console.log(res.data);

      alert('Signup Successful');

      navigate('/login');
    } catch (error) {
      console.log(
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          'Signup Failed'
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto shadow"
        style={{
          maxWidth: '700px',
          backgroundColor: '#111827',
          color: 'white',
          border: '1px solid #374151',
        }}
      >
        <h1 className="mb-4">Signup</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="form-control mb-3"
            value={formData.role}
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

        <p className="mt-3 text-center">
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