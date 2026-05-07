import { useEffect, useState } from 'react';

import API from '../api/axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token =
        localStorage.getItem('token');

      const res = await API.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'done'
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== 'done'
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) <
        new Date() &&
      task.status !== 'done'
  ).length;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem(
              'token'
            );

            localStorage.removeItem(
              'role'
            );

            window.location.href =
              '/login';
          }}
        >
          Logout
        </button>
      </div>

      <div className="row mt-4">

        <div className="col-md-3">
          <div className="card p-4 shadow text-center">
            <h5>Total Tasks</h5>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-4 shadow text-center">
            <h5>Completed</h5>
            <h2>{completedTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-4 shadow text-center">
            <h5>Pending</h5>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-4 shadow text-center border border-danger">
            <h5>Overdue</h5>
            <h2>{overdueTasks}</h2>
          </div>
        </div>

      </div>

      <div className="card p-4 shadow mt-5">
        <h3>Recent Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div
              key={task._id}
              className="border-bottom py-3"
            >
              <h5>{task.title}</h5>

              <p>{task.description}</p>

              <span className="badge bg-primary">
                {task.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;