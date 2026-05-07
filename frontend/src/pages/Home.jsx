import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="dark-section">

      {/* HERO */}
      <div className="container py-5 text-center">

        <h1 className="display-3 fw-bold">
          Team Task Manager
        </h1>

        <p className="lead mt-4 text-secondary">
          Manage projects, assign tasks,
          collaborate with teams and track
          progress efficiently.
        </p>

        <div className="mt-5">

          <Link
            to="/signup"
            className="btn btn-info btn-lg me-3"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="btn btn-outline-light btn-lg"
          >
            Login
          </Link>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Key Features
          </h2>

          <p className="text-secondary mt-3">
            Everything your team needs
            to manage workflow efficiently.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card feature-card shadow p-4 text-center h-100">

              <h1>📁</h1>

              <h3 className="mt-3">
                Project Management
              </h3>

              <p className="text-secondary mt-3">
                Create projects, manage
                teams and organize work
                efficiently.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow p-4 text-center h-100">

              <h1>✅</h1>

              <h3 className="mt-3">
                Task Assignment
              </h3>

              <p className="text-secondary mt-3">
                Assign tasks to members,
                track progress and deadlines.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow p-4 text-center h-100">

              <h1>📊</h1>

              <h3 className="mt-3">
                Analytics Dashboard
              </h3>

              <p className="text-secondary mt-3">
                Monitor completed,
                pending and overdue tasks.
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* ROLE SECTION */}
      <div className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Role-Based Access
          </h2>

        </div>

        <div className="row g-4">

          {/* ADMIN */}
          <div className="col-md-6">

            <div className="card shadow p-4 h-100">

              <h2 className="text-info">
                Admin
              </h2>

              <ul className="mt-4">

                <li>Create projects</li>

                <li>
                  Assign team members
                </li>

                <li>
                  Create and assign tasks
                </li>

                <li>
                  Track team progress
                </li>

                <li>
                  Delete tasks/projects
                </li>

              </ul>

            </div>
          </div>

          {/* MEMBER */}
          <div className="col-md-6">

            <div className="card shadow p-4 h-100">

              <h2 className="text-success">
                Member
              </h2>

              <ul className="mt-4">

                <li>
                  View assigned projects
                </li>

                <li>
                  View assigned tasks
                </li>

                <li>
                  Update task progress
                </li>

                <li>
                  Track deadlines
                </li>

                <li>
                  Collaborate with teams
                </li>

              </ul>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-4 text-center">

        <h5>
          Team Task Manager
        </h5>

        <p className="text-secondary mt-2">
          Built with React, Node.js,
          Express and MongoDB.
        </p>

      </footer>
    </div>
  );
}

export default Home;