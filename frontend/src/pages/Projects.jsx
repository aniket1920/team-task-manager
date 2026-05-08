import { useEffect, useState } from 'react';
import API from '../api/axios';

function Projects() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {

      const token = localStorage.getItem('token');

      const res = await API.get('/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      await API.post(
        '/projects',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        name: '',
        description: '',
      });

      fetchProjects();

      alert('Project Created');

    } catch (error) {
      console.log(error);
      alert('Project Creation Failed');
    }
  };

  return (
    <div className="container mt-5 text-light">

      <h1 className="mb-4">Projects</h1>

      {user?.role === 'admin' && (
        <div className="card bg-dark text-light p-4 mb-4 border-secondary">

          <h2>Create Project</h2>

          <form onSubmit={createProject}>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              className="form-control mb-3 bg-black text-light border-secondary"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="form-control mb-3 bg-black text-light border-secondary"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary">
              Create Project
            </button>

          </form>
        </div>
      )}

      <div className="row">

        {projects.map((project) => (

          <div
            className="col-md-4 mb-4"
            key={project._id}
          >
            <div className="card bg-dark text-light p-3 h-100 border-secondary">

              <h3>{project.name}</h3>

              <p>{project.description}</p>

              <h5 className="mt-3">
                Team Members
              </h5>

              {project.members?.length > 0 ? (
                <ul>
                  {project.members.map((member) => (
                    <li key={member._id}>
                      {member.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No members assigned</p>
              )}

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;