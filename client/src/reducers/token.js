const initialToken = localStorage.getItem('token') || {}
const tokenReducer = (state = initialToken, action) => {
    switch(action.type) {
        case "SET":
            const payload = action.payload;
            localStorage.setItem('token', payload);
            return state = payload;
        case "REMOVE":
            localStorage.removeItem('token');
            return state = {};
        default:
            return state;
    }
}

export default tokenReducer;