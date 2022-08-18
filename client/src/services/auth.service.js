import axios from 'axios';
const server = 'http://localhost:3002/';
const _url_register = server + 'users';
const _url_auth_login = server + 'auth/login';

export function register(data) {
    return axios.post(_url_register, data)
        .then((res) => {
            if (res && res.status === 201) {
                return res.data;
            }
        });
}

export function login(data) {
    return axios.post(_url_auth_login, data)
    .then((res) => {
        if(res && res.status === 200) {
            return res.data;
        }
    });
}