import React, {useEffect, useState} from "react";
import {deleteTuit, updateTuit} from "../actions/tuits-actions";
import {createTuit} from "../actions/tuits-actions";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {findUser, findUserByCredentials} from "../../services/users-service";
import {updateUser} from "../actions/users-actions";
import '../../../css/profile.css'

const Tuit = ({
    givenTuit = {
        tuit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, laoreet vitae massa eget, elementum gravida mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        likes: 14,
        dislikes: 0,
        comments: 0,
        liked_users: [],
        "api-post-id": "",
        name: "A Name",
        username: "handle",
        creator: "",
        date: {
            day: "14",
            month: "09",
            year: "2022",
            time: "08:11 PM"
        },
        title: "",
        topic: "",
        image: "",
        video: "",
        "avatar-image": "../media/emptypp.webp"
    }, user ={
                      name: "",
                      username: "",
                      password: "",
                      bio: "",
                      email: "",
                      phoneNumber:"",
                      "avatar-image":"",
                      admin: false
                  }
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {profileState} = useProfile();
    const [profile, setProfile] = profileState;
    const [tuit, setTuit] = useState(givenTuit);
    const [newComment, setNewComment] = useState({tuit: 'New tuit', parent_tuit: "tuit id"});

    const goToProfile = async () => {
        const tuitUser = await findUser(tuit.creator);
        if ((profile !== "init") && tuitUser.username === profile.username) {
            navigate(`/profile`, {state: {aUser: tuitUser, previous_path: location.pathname, thePost: tuit}})
        } else {
            navigate(`/profile/${tuit.username}`, {state: {aUser: tuitUser, previous_path: location.pathname, thePost: tuit}})
        }
    }
    const goToDetails = async (post) => {
        const tuitUser = await findUser(tuit.creator);
        if (post._id === undefined) {
            navigate(`/details/${post["api-post-id"]}`, {state: {thePost: post, previous_path: location.pathname, aUser: tuitUser}});
        } else {
            navigate(`/details/${post._id}`, {state: {thePost: post, previous_path: location.pathname, aUser: tuitUser}});
        }
    }
    const likeIt = async () => {
        if (profile === "init") {
            navigate('/login')
        } else {
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
            setTuit({...newTuit})
            await updateUser(dispatch, newUser);
            setProfile({...newUser})
        }
    }

    const unlikeIt = async () => {
        const newTuit = {
            ...tuit,
            likes: tuit.likes - 1,
            liked_users: tuit.liked_users.filter(a_user => a_user !== profile._id)
        }
        const newUser = {
            ...profile,
            liked_tuits: profile.liked_tuits.filter(a_tuit => a_tuit !== tuit._id)
        }
        await updateTuit(dispatch, newTuit)
        setTuit({...newTuit})
        await updateUser(dispatch, newUser);
        setProfile({...newUser})
    }
    const isLiked = () => {
        if (profile === "init") {
            return false
        }
        return tuit.liked_users.includes(profile._id) && profile.liked_tuits.includes(tuit._id);
    }

    const bookmarkIt = async () => {
        if (profile === "init") {
            navigate('/login')
        } else {
            let newTuit
            let newUser
            if (tuit._id === undefined) {
                const createdTuit = await createTuit(user._id, tuit)
                const createdTuitId = createdTuit._id
                setTuit({...createdTuit})
                newTuit = {
                    ...tuit,
                    bookmarked_users: [...tuit.bookmarked_users, profile._id],
                    _id: createdTuitId
                }
                newUser = {
                    ...profile,
                    bookmarks: [...profile.bookmarks, newTuit._id]
                }
            }
            else {
                newTuit = {
                    ...tuit,
                    bookmarked_users: [...tuit.bookmarked_users, profile._id]
                }
                newUser = {
                    ...profile,
                    bookmarks: [...profile.bookmarks, newTuit._id]
                }
            }
            await updateTuit(dispatch, newTuit);
            setTuit({...newTuit})
            await updateUser(dispatch, newUser);
            setProfile({...newUser})
        }
    }

    const unbookmarkIt = async () => {
        const newTuit = {
            ...tuit,
            bookmarked_users: tuit.bookmarked_users.filter(a_user => a_user !== profile._id)
        }
        const newUser = {
            ...profile,
            bookmarks: profile.bookmarks.filter(a_tuit => a_tuit !== tuit._id)
        }
        await updateTuit(dispatch, newTuit)
        setTuit({...newTuit})
        await updateUser(dispatch, newUser);
        setProfile({...newUser})
    }

    const isBookmarked = () => {
        if (profile === "init") {
            return false
        }
        return profile.bookmarks.includes(tuit._id) && tuit.bookmarked_users.includes(profile._id);
    }
    const deleteIt = async () => {
        await deleteTuit(dispatch, tuit)
    }
    const commentOnIt = () => {
        if (profile === "init") {
            navigate('/login')
        } else {
            const commentingBox = document.getElementById(tuit._id);
            if (commentingBox.style.display === "none") {
                commentingBox.style.display = "block";
            } else {
                commentingBox.style.display = "none";
            }
        }
    }
    const makeTuit = async () => {
        let updatedCurrentTuit;
        await createTuit(dispatch, profile._id, newComment)
        if (tuit._id === undefined) {
            const createdTuit = await createTuit(user._id, tuit)
            const createdTuitId = createdTuit._id
            setTuit({...createdTuit})
            updatedCurrentTuit = {
                ...tuit,
                comments: tuit.comments + 1,
                commented_users: [...tuit.commented_users, profile._id],
                _id: createdTuitId
            }
        } else {
            updatedCurrentTuit = {
                ...tuit,
                comments: tuit.comments + 1,
                commented_users: [...tuit.commented_users, profile._id]
            }
        }
        await updateTuit(dispatch, updatedCurrentTuit);
        setTuit({...updatedCurrentTuit})
        const textArea = getTextArea();
        textArea.value = "";
        const commentingBox = document.getElementById(tuit._id);
        if (commentingBox.style.display === "block") {
            commentingBox.style.display = "none";
        }
    }
    const getTextArea = () => document.getElementsByTagName('textarea')[0]; 
    return (
        <div className="row ps-3 pe-3 m-0">
            <div className="d-flex col-2 col-sm-1 p-0 justify-content-center">
                <img src={tuit["avatar-image"]} className="wd-avatar-image wd-cursor-pointer" onClick={() => goToProfile()}/>
            </div>
            <div className="col-10 col-sm-11 ps-sm-4 pe-md-0 mb-2">
                <div className="d-inline-flex justify-content-between w-100">
                    <h6 className="fw-bold m-0 wd-cursor-pointer" onClick={() => goToProfile()}>{tuit.name}
                    <span><i className={`${tuit.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span>
                    <span className="fw-light text-secondary ps-2">@{tuit.username} · {tuit.date.month + "/" + tuit.date.day}</span></h6>
                    {
                        profile.admin && <h6 className="text-secondary m-0"><i className="fas fa-remove float-end" onClick={() => deleteIt()}/></h6>
                    }
                </div>
                <div className="wd-cursor-pointer" onClick={() => goToDetails(tuit)}>
                    <p className="text-white">
                        {tuit.tuit}
                    </p>
                    <div>
                        <img src={`${tuit.hasOwnProperty("image") ? tuit.image : ""}`}
                            className={`${tuit.hasOwnProperty("image") ? "w-100 wd-tuit-image" : "wd-no-display"}`}/>
                        <iframe width="500" height="300" src={`${tuit.hasOwnProperty("video") ? tuit.video : ""}`}
                        className={`${tuit.hasOwnProperty("video") ? "w-100 wd-tuit-image" : "wd-no-display"}`}
                        title="Video" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                    </div>
                </div>
                <div className="d-inline-flex justify-content-between w-75 mt-3 pe-5">
                    <h6 className="text-secondary m-0 wd-cursor-pointer">
                        <i className="fa-regular fa-comment" onClick={() => commentOnIt()}/>
                        <span className="ps-3">{tuit.comments}</span>
                    </h6>

                    <h6 className="text-secondary m-0 wd-cursor-pointer">
                        {
                            isLiked() && <i className="fa-solid fa-heart wd-red" onClick={() => unlikeIt()}/>
                        }
                        {
                            !isLiked() && <i className="fa-regular fa-heart" onClick={() => likeIt()}/>
                        }
                        <span className="ps-3">{tuit.likes}</span>
                    </h6>
                    <h6 className="text-secondary m-0 wd-cursor-pointer">
                        {
                            isBookmarked() && <i className="fa-solid fa-bookmark text-white" onClick={unbookmarkIt}/>
                        }
                        {
                            !isBookmarked() && <i className="fa-regular fa-bookmark" onClick={bookmarkIt}/>
                        }
                    </h6>
                </div>
            </div>
            <hr/>
            <div id={tuit._id} className="p-0" style={{display:"none"}}>
                <div className="d-flex flex-column align-items-center mb-3">
                    <textarea className="bg-black w-100 ps-2 pt-1 text-white"
                        placeholder="Comment"
                        onChange={(e) =>
                            setNewComment({
                                ...newComment,
                                tuit: e.target.value,
                                parent_tuit: tuit._id
                            })}/>
                    <button type="button" className="btn btn-primary mt-3 w-25 wd-rounded-button"
                            onClick={() => makeTuit()}>
                        Comment
                    </button>
                </div>
                <hr/>
            </div>
        </div>  
    )
}

export default Tuit