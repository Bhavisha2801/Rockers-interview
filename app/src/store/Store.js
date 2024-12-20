import { authReducer } from "./reducers/authReducers";
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer);

export default store;