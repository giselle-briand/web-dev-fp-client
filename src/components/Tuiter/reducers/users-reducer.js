import {UPDATE_USER, CREATE_USER, DELETE_USER, UPDATE_OTHER_USER} from "../actions/users-actions";

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case DELETE_USER:
            return state.filter(user => user._id !== action.user._id);
        case CREATE_USER:
            return [
                action.newUser,
                ...state
            ];
        case UPDATE_USER:
            return state.map(
                user => user._id === action.user._id ? action.user : user);
        case UPDATE_OTHER_USER:
            return state.map(
                user => user._id === action.user._id ? action.user : user);
        default:
            return state;
    }
}

export default usersReducer;