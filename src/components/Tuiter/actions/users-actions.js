import * as service from '../../services/users-service';

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const createUser = async (dispatch, user) => {
    const newUser = await service.createUser(user);
    dispatch({
        type: CREATE_USER,
        newUser
    });
}

export const updateUser = async (dispatch, user) => {
    const status = await service.updateUser(user);
    alert(status)
    dispatch({
        type: UPDATE_USER,
        user
    });
}

export const deleteUser = async (dispatch, user) => {
    const response = await service.deleteUsers(user);
    dispatch({
        type: DELETE_USER,
        user
    })
}
