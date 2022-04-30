import React, {useState} from "react";
import Tuit from "../Tuit";
import {useLocation, useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {findUser} from "../../services/users-service";
import {findAllTuits} from "../../services/tuits-service";
import {createTuit} from "../actions/tuits-actions";
import {updateTuit} from "../actions/tuits-actions";
import {updateUser} from "../actions/users-actions";
import {useDispatch} from "react-redux";

const Details = ({
    previous_path = "",
                     user ={
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
    const navigate = useNavigate()
    const {profileState} = useProfile();
    const [profile, setProfile] = profileState;
    const dispatch = useDispatch()
    const location = useLocation()
    const s = location.state
    const givenTuit = s.thePost
    previous_path = s.previous_path
    user = s.aUser

    const [commentsOnTuit, setCommentsOnTuit] = useState([])
    const [tuit, setTuit] = useState(givenTuit);
    const [newComment, setNewComment] = useState({tuit: 'New tuit', parent_tuit: "tuit id"});

    const goBack = () => {
        navigate(previous_path, {state: {aUser: user, previous_path: previous_path, thePost: tuit}});
    }
    const goToProfile = async () => {
        const tuitUser = await findUser(tuit.creator);
        if ((profile !== "init") && tuitUser.username === profile.username) {
            navigate(`/profile`, {state: {aUser: tuitUser, previous_path: location.pathname}})
        } else {
            navigate(`/profile/${tuit.username}`, {state: {aUser: tuitUser, previous_path: location.pathname}})
        }
    }
    const likeIt = async () => {
        if (profile === "init") {
            navigate('/login')
        } else {
            let newTuit
            let newUser
            if (tuit._id === undefined) {
                //TODO possibly change to dispatch?
                let createdTuit =  await createTuit(user._id, tuit)
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
        return tuit.liked_users.includes(profile._id) &&
            profile.liked_tuits.includes(tuit._id); //tuit.liked_users.includes(profile._id) &&
    }
    const bookmarkIt = async () => {
        if (profile === "init") {
            navigate('/login')
        } else {
            let newTuit
            let newUser
            if (tuit._id === undefined) {
                const createdTuit = await createTuit(dispatch, user._id, tuit)
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
    const commentOnIt = async () => {
        if (profile === "init") {
            navigate('/login')
        } else {
            const commentingBox = document.getElementById("comment");
            if (commentingBox.style.display === "none") {
                commentingBox.style.display = "block";
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
        const commentingBox = document.getElementById("comment");
        if (commentingBox.style.display !== "none") {
            commentingBox.style.display = "none";
        }
    }
    const getComments = async () => {
        const allTuits = await findAllTuits("init");
        const comments = allTuits.filter(aTuit => aTuit.parent_tuit === tuit._id);
        setCommentsOnTuit(comments);
    }
    return (
        <div >
            <div className="row">
                <div className="col-1 d-flex align-items-center">
                    <i className="fa-solid fa-arrow-left ps-3 text-white wd-cursor-pointer" onClick={goBack}/>
                </div>
                <div className="col-11 m-0 ps-4">
                    <h5 className="m-0 fw-bold">Tuit</h5>
                </div> 
            </div>
            <div >
                {/* Profile image and handle */}
                <div className="mt-4 row">
                    <div className="col-1">
                        <img src={tuit["avatar-image"]} className="wd-avatar-image wd-cursor-pointer" onClick={goToProfile}/>
                    </div>
                    <div className="col-11 d-flex align-items-center">
                        <div className="d-inline-flex justify-content-between w-100">
                            <div className="ps-4 ps-md-2">
                                <div className="m-0">
                                    <h6 className="fw-bold m-0 wd-cursor-pointer" onClick={goToProfile}>{tuit.name}
                                    <span><i className={`${tuit.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span></h6>
                                </div>
                                <div className="">
                                    <h6 className="text-secondary m-0">@{tuit.username}</h6>
                                </div>
                            </div>
                            <div>
                                <h6 className="text-secondary m-0"><i className="fa-solid fa-ellipsis"/></h6>
                            </div>
                        </div>
                       
                    </div>
                </div>
                {/* Tuit content */}
                <div className="mt-3">
                    {/* Tuit Text */}
                    <div>
                        <p className="fs-5 fw-bold text-white">{tuit.tuit}</p>
                    </div>
                    {/* Tuit Media */}
                    <div className=" mt-3">
                        <img src={`${tuit.hasOwnProperty("image") ? tuit.image : ""}`}
                            className={`${tuit.hasOwnProperty("image") ? "w-100 wd-tuit-image" : "wd-no-display"}`}/>
                        <iframe width="500" height="300" src={`${tuit.hasOwnProperty("video") ? tuit.video : ""}`}
                        className={`${tuit.hasOwnProperty("video") ? "w-100 wd-tuit-image" : "wd-no-display"}`}
                        title="Video" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                    </div>

                    {/* Tuit Details */}
                    <div className=" mt-3">
                        <h6 className="text-secondary"><span>{tuit.date.time} · </span><span>{tuit.date.month + "-" + tuit.date.day + "-" + tuit.date.year} · </span><span>Tuiter Web App</span></h6>
                        <hr/>
                        <div className="d-inline-flex justify-content-between" >
                            <div>
                                <h6 className="ms-4 fw-bold m-0">{tuit.likes} <span className="text-secondary fw-normal">Likes</span></h6>
                            </div>
                            <div>
                                <h6 className="ms-4 fw-bold m-0">{tuit.comments} <span className="text-secondary fw-normal">Comments</span></h6>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-inline-flex justify-content-between w-100 ps-5 pe-5">
                            <h6 className="text-secondary m-0"><i className="fa-regular fa-comment fa-lg wd-cursor-pointer" onClick={() => commentOnIt()}/></h6>
                            <h6 className="text-secondary m-0">
                                {
                                    isLiked() && <i className="fa-solid fa-heart fa-lg wd-red wd-cursor-pointer" onClick={unlikeIt}/>
                                }
                                {
                                    !isLiked() && <i className="fa-regular fa-heart fa-lg wd-cursor-pointer" onClick={likeIt}/>
                                }
                            </h6>
                            <h6 className="text-secondary m-0">
                                {
                                    isBookmarked() && <i className="fa-solid fa-bookmark fa-lg text-white wd-cursor-pointer" onClick={unbookmarkIt}/>
                                }
                                {
                                    !isBookmarked() && <i className="fa-regular fa-bookmark fa-lg wd-cursor-pointer" onClick={bookmarkIt}/>
                                }
                            </h6>
                        </div>
                        <hr/>
                        <div id="comment" className="w-100 display-none">
                            <textarea id="textarea"
                              className="bg-black w-100 ms-3 border-0 text-white"
                              placeholder="Comment"
                              onChange={(e) =>
                                  setNewComment({
                                      ...newComment,
                                      tuit: e.target.value,
                                      parent_tuit: tuit._id
                                  })}/>
                            <button type="button" className="btn btn-primary wd-tuit-override-button-home col-12 wd-rounded-button"
                                    onClick={() => makeTuit()}>
                                Comment
                            </button>
                        </div>
                        <div className={`${tuit.comments > 0 ? "" : "wd-no-display"} `}>
                            {
                                getComments() && commentsOnTuit.map(comment =>
                                    <Tuit tuit={comment}/>
                                )
                            }
                        </div>
                        <div>
                            <h5 className="ps-3 fw-bold mb-4">More Tuits</h5>
                        </div>
                        <Tuit/>
                        <Tuit/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Details;