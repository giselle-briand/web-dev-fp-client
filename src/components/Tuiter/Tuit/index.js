import React, {useEffect, useState} from "react";
import {updateTuit} from "../actions/tuits-actions";
import {createTuit} from "../../services/tuits-service";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {createUser} from "../actions/users-actions";
import axios from "axios";
import SecureContent from "../../secure-content";
import {findUser, findUserByCredentials} from "../../services/users-service";

const Tuit = ({

    tuit = {
        "tuit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, laoreet vitae massa eget, elementum gravida mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "likes": 14,
        "dislikes": 0,
        "comments": 0,
        "retuits": 3,
        "liked": true,
        "disliked": false,
        "name": "A Name",
        "username": "handle",
        "verified": false,
        "time": "Just now",
        "date": {
            "day": "14",
            "month": "Sep",
            "year": "2022",
            "time": "08:11 PM"
        },
        "title": "",
        "topic": "",
        "image": "",
        "video": "",
        "avatar-image": "../media/emptypp.webp"
    }, user ={
                      name: "",
                      username: "",
                      password: "",
                      bio: "",
                      email: "",
                      phone_num:"",
                      "avatar-image":""
                  }
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLiked, setIsLiked] = useState(false);
    const test = useProfile();
    const goToProfile = async () => {
        const tuitUser = await findUser(tuit.creator);
        navigate(`/profile/${tuit.username}`, {state: [tuitUser, location.pathname]})
    }
    const goToDetails = async (post) => {
        if (post._id === undefined) {
            navigate(`/search/details/${post["api-post-id"]}`, {state: [post, location.pathname]});
        } else {
            navigate(`/search/details/${post._id}`, {state: [post, location.pathname]});
        }
    }
    const api = axios.create({
        //withCredentials: false
        withCredentials: true
    })
    const {checkLoggedIn} = useProfile()
    const [loggedIn, setLoggedIn] = useState(false)
    const check = async () => {
        try {
            await checkLoggedIn()
            setLoggedIn(true)
        } catch (e) {
            setLoggedIn(false)
        }
    }
    useEffect(() => { check() }, [])
    const likeIt = async () => {
        if(loggedIn) {
            if (tuit.liked === true) {
                updateTuit(dispatch, {
                    ...tuit,
                    likes: tuit.likes - 1,
                    liked: false
                });
                setIsLiked(false);
                //document.getElementById("heart").style.color = "transparent";
            } else {
                if (tuit._id === undefined) {
                    try {
                        const isUser = await findUserByCredentials(user);
                        user = isUser
                    } catch (e) {
                        const response = await api.post("http://localhost:4000/api/signup", user)
                        const createdUser = response.data
                        user = createdUser
                    }
                    const responseTuit = await createTuit(user._id, tuit)
                    // tuit = responseTuit;
                }
                updateTuit(dispatch, {
                    ...tuit,
                    likes: tuit.likes + 1,
                    liked: true
                })
                console.log("updated tuit")
                setIsLiked(true);
                //document.getElementById("heart").style.color = "red";
            }
        }
        else {
            navigate('/login')
        }
    }
    return (
        <div className="row ps-3 pe-3">
            <div className="col-1">
            <img src={tuit['avatar-image']} className="wd-avatar-image"/>
            </div>
            <div className="col-11 mb-2">
                <div className="d-inline-flex justify-content-between w-100">
                    <h6 className="fw-bold m-0" onClick={goToProfile}>{tuit.name}
                    <span><i className={`${tuit.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span>
                    <span className="fw-light text-secondary ps-2">@{tuit.username} · {tuit.date.month + "-" + tuit.date.day}</span></h6>
                    <h6 className="text-secondary m-0"><i className="fa-solid fa-ellipsis"/></h6>
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
                        <i id="heart" className={`fa-regular fa-heart ${isLiked ? "fa-solid" : "fa-regular"}`}
                           onClick={likeIt}/>
                        <span className="ps-3">{tuit.likes}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        <i className="fa-regular fa-bookmark"/>
                    </h6>
                </div>
            </div>
            <hr/>

        </div>
        
    )
}

export default Tuit