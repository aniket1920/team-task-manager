import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log('MongoDB Connected')
  )
  .catch((err) =>
    console.log(err)
  );

app.get('/', (req, res) => {
  res.send('Server Running');
});

app.use('/api/auth', authRoutes);

app.use(
  '/api/projects',
  projectRoutes
);

app.use('/api/tasks', taskRoutes);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});