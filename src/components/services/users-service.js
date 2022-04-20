import axios from 'axios';
// const TUITS_API = 'http://localhost:4000/api/tuits'; <-- to run locally
// const TUITS_API = 'https://web-dev-server-nu.herokuapp.com/api/tuits';
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

export const createUser = async (user) => {
    const response = await axios.post(USERS_API, user)
    return response.data;
}

export const deleteUsers = async (user) => {
    const response = await axios.delete(`${USERS_API}/${user._id}`);
    return response.data;
}

export const updateUser = async (user) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
}
