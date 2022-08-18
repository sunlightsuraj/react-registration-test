import { useState } from 'react';

export default function useRefreshToken() {
    const getRefreshToken = () => {
        const _refresh_token = localStorage.getItem('refresh_token');
        return _refresh_token;
    }

    const [refreshToken, setRefreshToken] = useState(getRefreshToken());

    const saveRefreshToken = (_refresh_token) => {
        if (_refresh_token) {
            localStorage.setItem('refresh_token', _refresh_token);
        } else {
            if (localStorage.getItem('refresh_token')) {
                localStorage.removeItem('refresh_token');
            }
        }
        setRefreshToken(_refresh_token);
    }

    return {
        setRefreshToken: saveRefreshToken,
        refreshToken
    };
}