import {
  useEffect,
  useState,
} from 'react';

import API from '../api/axios';

function Tasks() {
  const role =
    localStorage.getItem('role');

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: '',
      description: '',
      dueDate: '',
      project: '',
      assignedTo: '',
    });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchMembers();
  }, []);

  const token =
    localStorage.getItem('token');

  const fetchTasks = async () => {
    const res = await API.get(
      '/tasks',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks(res.data);
  };

  const fetchProjects =
    async () => {
      const res = await API.get(
        '/projects',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);
    };

  const fetchMembers =
    async () => {
      const res = await API.get(
        '/users/members',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMembers(res.data);
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

    await API.post(
      '/tasks',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      project: '',
      assignedTo: '',
    });
  };

  const updateStatus = async (
    id,
    status
  ) => {
    await API.put(
      `/tasks/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();
  };

  return (
    <div className="container mt-5">

      <h1>Tasks</h1>

      {role === 'admin' && (
        <div className="card p-4 shadow mt-4">

          <h3>Create Task</h3>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control mb-3"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              className="form-control mb-3"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dueDate"
              className="form-control mb-3"
              value={formData.dueDate}
              onChange={handleChange}
            />

            <select
              name="project"
              className="form-control mb-3"
              value={formData.project}
              onChange={handleChange}
            >
              <option value="">
                Select Project
              </option>

              {projects.map(
                (project) => (
                  <option
                    key={project._id}
                    value={
                      project._id
                    }
                  >
                    {project.name}
                  </option>
                )
              )}
            </select>

            <select
              name="assignedTo"
              className="form-control mb-3"
              value={
                formData.assignedTo
              }
              onChange={handleChange}
            >
              <option value="">
                Assign Member
              </option>

              {members.map(
                (member) => (
                  <option
                    key={member._id}
                    value={
                      member._id
                    }
                  >
                    {member.name}
                  </option>
                )
              )}
            </select>

            <button className="btn btn-primary">
              Create Task
            </button>

          </form>
        </div>
      )}

      <div className="row mt-4">

        {tasks.map((task) => (
          <div
            className="col-md-4"
            key={task._id}
          >
            <div className="card p-3 shadow mb-3">

              <h4>{task.title}</h4>

              <p>
                {task.description}
              </p>

              <p>
                <strong>
                  Project:
                </strong>{' '}
                {task.project?.name}
              </p>

              <p>
                <strong>
                  Assigned To:
                </strong>{' '}
                {
                  task.assignedTo
                    ?.name
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{' '}
                {task.status}
              </p>

              <select
                className="form-control"
                value={task.status}
                onChange={(e) =>
                  updateStatus(
                    task._id,
                    e.target.value
                  )
                }
              >
                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="done">
                  Done
                </option>
              </select>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Tasks;