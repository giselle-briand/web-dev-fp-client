import axios from 'axios';
// const TUITS_API = 'http://localhost:4000/api/tuits'; <-- to run locally
// const TUITS_API = 'https://web-dev-server-nu.herokuapp.com/api/tuits';
const API_BASE = process.env.REACT_APP_API_BASE;
const TUITS_API = `${API_BASE}/tuits`;

const api = axios.create({
    withCredentials: true
});

export const createTuit = async (userId ,tuit) => {
    const response = await api.post(`${TUITS_API}/users/${userId}`, tuit)
    return response.data;
}
export const findAllTuits = async () => {
    const response = await api.get(TUITS_API);
    const tuits = response.data;
    return tuits;
}
export const deleteTuit = async (tuit) => {
    const response = await api.delete(`${TUITS_API}/${tuit._id}`);
    return response.data;
}

export const updateTuit = async (tuit) => {
    const response = await api.put(`${TUITS_API}/${tuit._id}`, tuit);
    return response.data;
}
