import axios from 'axios';

const API = axios.create({
  baseURL: 'team-task-manager-production-409b.up.railway.app',
});

export default API;