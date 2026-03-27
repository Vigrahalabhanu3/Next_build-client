import api from './api.js';

const generateCode = async (projectId, prompt) => {
    const response = await api.post(`/generate/${projectId}`, { prompt });
    return response.data.data;
};

export { generateCode };