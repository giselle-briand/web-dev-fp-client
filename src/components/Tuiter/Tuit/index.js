import React, {useEffect, useState} from "react";
import {deleteTuit, updateTuit} from "../actions/tuits-actions";
import {createTuit} from "../../services/tuits-service";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {createUser} from "../actions/users-actions";
import axios from "axios";
import SecureContent from "../../secure-content";
import {findUser, findUserByCredentials} from "../../services/users-service";
import {updateUser} from "../actions/users-actions";

const Tuit = ({
    tuit = {
        tuit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, laoreet vitae massa eget, elementum gravida mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        likes: 14,
        dislikes: 0,
        comments: 0,
        retuits: 3,
        liked_users: [],
        "api-post-id": "",
        name: "A Name",
        username: "handle",
        creator: [],
        date: {
            day: "14",
            month: "Sep",
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

    //TODO create a statement that updates profile with that of database on referesh

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
            if (tuit._id === undefined) {
                // try {
                //     user = await findUserByCredentials(user);
                // } catch (e) {
                //     const response = await api.post("http://localhost:4000/api/signup", user)
                //     user = response.data
                // }
                tuit = await createTuit(user._id, tuit)
            }

            await updateTuit(dispatch, {
                ...tuit,
                likes: tuit.likes + 1,
                liked_users: [...tuit.liked_users, profile._id]
            })

            console.log(profile.liked_tuits)

            const newUser = {
                ...profile,
                liked_tuits: [...profile.liked_tuits, tuit._id]
            }
            console.log(newUser)

            await updateUser(dispatch, newUser);
            setProfile({...newUser})
            //setProfile("heee")
            console.log(profile)
        }
    }
    const unlikeIt = async () => {

        await updateTuit(dispatch, {
            ...tuit,
            likes: tuit.likes - 1,
            liked_users: tuit.liked_users.filter(a_user => a_user !== profile._id)
        })
        const newUser = {
            ...profile,
            liked_tuits: profile.liked_tuits.filter(a_tuit => a_tuit !== tuit._id)
        }

        await updateUser(dispatch, newUser);

        setProfile({...newUser})
        //setProfile("yolo")
    }
    const isLiked = () => {
        console.log(profile)
        return tuit.liked_users.includes(profile._id) && profile.liked_tuits.includes(tuit._id);
    }
    const isUnliked = () => {
        return !profile.liked_tuits.includes(tuit._id)
    }
    const isBookmarked = () => {
        return tuit.bookmarked_users.includes(profile._id);
    }
    //console.log("TUIT PASSED INTO TUIT/INDEX.JS:")
    //console.log(tuit)

    return (
        <div className="row ps-3 pe-3">
            <div className="col-1">
            <img src={tuit["avatar-image"]} className="wd-avatar-image"/>
            </div>
            <div className="col-11 mb-2">
                <div className="d-inline-flex justify-content-between w-100">
                    <h6 className="fw-bold m-0" onClick={goToProfile}>{tuit.name}
                    <span><i className={`${tuit.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span>
                    <span className="fw-light text-secondary ps-2">@{tuit.username} · {tuit.date.month + "-" + tuit.date.day}</span></h6>
                    {
                        profile.admin && <h6 className="text-secondary m-0"><i className="fas fa-remove float-end" onClick={() => deleteTuit(dispatch, tuit)}/></h6>
                    }
                </div>
                <div onClick={() => goToDetails(tuit)}>
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
                    <h6 className="text-secondary m-0">
                        <i className="fa-regular fa-comment"/>
                        <span className="ps-3">{tuit.comments}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        <i className="fa-solid fa-retweet"/>
                        <span className="ps-3">{tuit.retuits}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        {
                            isLiked() && <i className="fa-solid fa-heart" onClick={unlikeIt}/>
                        }
                        {
                            !isLiked() && <i className="fa-regular fa-heart" onClick={likeIt}/>
                        }
                        <span className="ps-3">{tuit.likes}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        {/*//TODO: uncomment when bookmark logic is implemented*/}
                        {/*{*/}
                        {/*    isBookmarked() && <i className="fa-solid fa-bookmark"/>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    !isBookmarked() && <i className="fa-regular fa-bookmark"/>*/}
                        {/*}*/}
                        <i className="fa-regular fa-bookmark"/>
                    </h6>
                </div>
            </div>
            <hr/>

        </div>
        
    )
}

export default Tuit