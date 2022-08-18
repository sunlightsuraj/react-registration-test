export const set = (token) => {
    return {
        type: 'SET',
        payload: token
    }
};

export const remove = () => {
    return {
        type: 'REMOVE'
    }
}