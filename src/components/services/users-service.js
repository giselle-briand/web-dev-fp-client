import axios from 'axios';
// const TUITS_API = 'http://localhost:4000/api/tuits'; <-- to run locally
// const TUITS_API = 'https://web-dev-server-nu.herokuapp.com/api/tuits';
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const api = axios.create({
    withCredentials: true
});

export const findUserByCredentials = async (user) => {
    const response = await api.post(`${USERS_API}/credentials`, user);
    return response.data;
}

export const findUser = async (userId) => {
    const response = await api.get(`${USERS_API}/${userId}`)
    return response.data;
}

export const createUser = async (user) => {
    const response = await api.post(USERS_API, user)
    return response.data;
}

export const deleteUsers = async (user) => {
    const response = await api.delete(`${USERS_API}/${user._id}`);
    return response.data;
}

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_API}/${user._id}`, user);
    return response.data;
}

export const findCommentsByUserId = async (userid) => {
    const response = await api.get(`${USERS_API}/${userid}/tuits`)
    return response.data
}

export const findLikedTuitsByUserId = async (userid) => {
    const response = await api.get(`${USERS_API}/${userid}/likes/tuits`)
    return response.data
}

export const findFollowersByUserId = async (userid) => {
    const response = await api.get(`${USERS_API}/${userid}/followers`)
    return response.data
}

export const findFollowingByUserId = async (userid) => {
    const response = await api.get(`${USERS_API}/${userid}/following`)
    return response.data
}