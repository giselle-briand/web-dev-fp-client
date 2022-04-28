import * as service from '../../services/tuits-service';
import {updateUser} from "./users-actions";

export const CREATE_TUIT = 'CREATE_TUIT';
export const FIND_ALL_TUITS = 'FIND_ALL_TUITS';
export const UPDATE_TUIT = 'UPDATE_TUIT';
export const DELETE_TUIT = 'DELETE_TUIT';

export const createTuit = async (dispatch, userId, tuit) => {
    const newTuit = await service.createTuit(userId, tuit);
    dispatch({
        type: CREATE_TUIT,
        newTuit
    });
}
export const findAllTuits = async (dispatch) => {
    const tuits = await service.findAllTuits();
    dispatch({
        type: FIND_ALL_TUITS,
        tuits: tuits.reverse()
    });
}
export const updateTuit = async (dispatch, tuit) => {
    const status = await service.updateTuit(tuit);
    dispatch({
        type: UPDATE_TUIT,
        tuit
    });
}

export const deleteTuit = async (dispatch, tuit) => {
    const response = await service.deleteTuit(tuit);
    dispatch({
        type: DELETE_TUIT,
        tuit
    })
}

/*
export const likeTuit = async (dispatch, tuit, user) => {
    let newTuit
    let newUser
    if (tuit._id === undefined) {
        const createdTuit = await createTuit(user._id, tuit)
        const createdTuitId = createdTuit._id
        setTuit({...createdTuit})
        newTuit = {
            ...tuit,
            likes: tuit.likes + 1,
            liked_users: [...tuit.liked_users, profile._id],
            _id: createdTuitId
        }
        newUser = {
            ...profile,
            liked_tuits: [...profile.liked_tuits, newTuit._id]
        }
    }
    else {
        newTuit = {
            ...tuit,
            likes: tuit.likes + 1,
            liked_users: [...tuit.liked_users, profile._id]
        }
        newUser = {
            ...profile,
            liked_tuits: [...profile.liked_tuits, tuit._id]
        }
    }
    await updateTuit(dispatch, newTuit);
    await updateUser(dispatch, newUser);
}*/
