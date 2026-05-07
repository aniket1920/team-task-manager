import {
  useEffect,
  useState,
} from 'react';

import API from '../api/axios';

function Projects() {
  const role =
    localStorage.getItem('role');

  const token =
    localStorage.getItem('token');

  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: '',
      description: '',
    });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects =
    async () => {
      try {
        const res = await API.get(
          '/projects',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        '/projects',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProjects();

      setFormData({
        name: '',
        description: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        Projects
      </h1>

      {/* ADMIN ONLY */}
      {role === 'admin' && (
        <div className="card p-4 shadow mb-5">

          <h2 className="mb-4">
            Create Project
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              className="form-control mb-4"
              value={formData.name}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              className="form-control mb-4"
              rows="4"
              value={
                formData.description
              }
              onChange={handleChange}
            />

            <button className="btn btn-primary">
              Create Project
            </button>

          </form>
        </div>
      )}

      {/* MEMBER MESSAGE */}
      {role === 'member' && (
        <div className="alert alert-info">
          You can only view projects
          assigned to you.
        </div>
      )}

      {/* PROJECT LIST */}
      <div className="row">

        {projects.length === 0 ? (
          <p>No Projects Found</p>
        ) : (
          projects.map((project) => (
            <div
              className="col-md-4 mb-4"
              key={project._id}
            >
              <div className="card p-4 shadow h-100">

                <h3>
                  {project.name}
                </h3>

                <p className="text-secondary mt-3">
                  {
                    project.description
                  }
                </p>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Projects;