import { REGISTER_USER, LOGIN_USER } from "../actions/authActions";

const initialState = {
    user: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
            }
    
        default:
            return state
    }
}