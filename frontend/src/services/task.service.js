import api from './api';

const getAllTasks = () => {
    return api.get('/tasks/all');
}

const createTask = (data) => {
    return api.post('/tasks/create', data);
}

const updateTask = (taskId, data) => {
    return api.put(`/tasks/update/${taskId}`, data);
}

const deleteTask = (taskId) => {
    return api.delete(`/tasks/delete/${taskId}`);
}   

export default { createTask, getAllTasks, updateTask, deleteTask };