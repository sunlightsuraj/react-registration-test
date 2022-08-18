import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const _token = localStorage.getItem('token');
        return _token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = _token => {
        localStorage.setItem('token', _token);
        // if(_token) {
            
        // } else {
        //     if(localStorage.getItem('token')) {
        //         localStorage.removeItem('token');
        //     }
        // }
        setToken(_token);   
    }

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(undefined)
    }

    return {
        setToken: saveToken,
        removeToken: removeToken,
        token
    }
}