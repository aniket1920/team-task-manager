import {
  Link,
  useNavigate,
} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-black navbar-expand-lg px-4 py-3 shadow">

      <Link
        to="/"
        className="navbar-brand fw-bold text-info"
      >
        Team Task Manager
      </Link>

      <div className="ms-auto d-flex align-items-center gap-2">

        {!token ? (
          <>
            <Link
              to="/login"
              className="btn btn-outline-light"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn btn-info text-dark fw-bold"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="btn btn-outline-info"
            >
              Dashboard
            </Link>

            <Link
              to="/projects"
              className="btn btn-outline-info"
            >
              Projects
            </Link>

            <Link
              to="/tasks"
              className="btn btn-outline-info"
            >
              Tasks
            </Link>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;