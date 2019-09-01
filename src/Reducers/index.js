import {combineReducers} from 'redux';
import AuthReducer from "./authreducers";

export default combineReducers({
    auth: AuthReducer
})