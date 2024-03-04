import axios from 'axios';

const urlBack = 'http://localhost:8000/';

const AccountsApi = axios.create({
    baseURL: urlBack+"accounts/"

});

export const getAllAccounts = () => AccountsApi.get('users/')

export const registerUser = (userData) => AccountsApi.post('register/', userData);

export const loginUser = (userData) => AccountsApi.post('login/', userData);

export const updateUser = (userData, username) => AccountsApi.patch(`user/${username}/`, userData);
