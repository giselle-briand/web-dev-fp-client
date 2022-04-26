import axios from "axios";
import React from "react";
import Tuit from "../Tuit";
import TuitStats from "../TuitStats/TuitStats";
import TuitListItem from "../TuitList/TuitListItem";
import {useLocation, useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {findUserByCredentials} from "../../services/users-service";
import {createTuit} from "../../services/tuits-service";
import {updateTuit} from "../actions/tuits-actions";
import {updateUser} from "../actions/users-actions";
import {useDispatch} from "react-redux";

const api = axios.create({
    withCredentials: true
  });

const Details = ({
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
                     },
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
    const {profile} = useProfile()
    const {state} = useLocation()
    const dispatch = useDispatch()
    tuit = state[0] || {};
    previous_path = state[1]
    user = state[2]
    const goBack = () => {
        navigate(previous_path);
    }
    const likeIt = async () => {
        if (profile === "init") {
            navigate('/login')
        } else {
            if (tuit._id === undefined) {
                try {
                    user = await findUserByCredentials(user);
                } catch (e) {
                    const response = await api.post("http://localhost:4000/api/signup", user)
                    user = response.data
                }
                tuit = await createTuit(user._id, tuit)
            }
            await updateTuit(dispatch, {
                ...tuit,
                likes: tuit.likes + 1,
                liked_users: [...tuit.liked_users, profile._id]
            })
            await updateUser(dispatch, {
                ...profile,
                liked_tuits: [...profile.liked_tuits, tuit._id]
            });
        }
    }
    const unlikeIt = async () => {
        await updateTuit(dispatch, {
            ...tuit,
            likes: tuit.likes - 1,
            liked_users: tuit.liked_users.filter(a_user => a_user !== profile._id)
        })
        await updateUser(dispatch, {
            ...profile,
            liked_tuits: profile.liked_tuits.filter(a_tuit => a_tuit !== tuit._id)
        });
    }
    const isLiked = () => {
        return tuit.liked_users.includes(profile._id);
    }
    const isBookmarked = () => {
        return tuit.bookmarked_users.includes(profile._id);
    }
    return (
        <div >
            <div className="row">
                <div className="col-1 d-flex align-items-center">
                    <i className="fa-solid fa-arrow-left ps-3 text-white" onClick={goBack}/>
                </div>
                <div className="col-11 m-0 ps-4">
                    <h5 className="m-0 fw-bold">Tuit</h5>
                </div> 
            </div>
            <div >
                {/* Profile image and handle */}
                <div className="mt-4 row">
                    <div className="col-1">
                        <img src={tuit["avatar-image"]} className="wd-avatar-image"/>
                    </div>
                    <div className="col-11 d-flex align-items-center">
                        <div className="d-inline-flex justify-content-between w-100">
                            <div className="ps-4 ps-md-2">
                                <div className="m-0 ">
                                    <h6 className="fw-bold m-0">{tuit.name} 
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
                                <h6 className="fw-bold m-0">{tuit.retuits} <span className="text-secondary fw-normal">Retuits</span></h6>
                            </div>
                            <div>
                                <h6 className="ms-4 fw-bold m-0">{tuit.likes} <span className="text-secondary fw-normal">Likes</span></h6>
                            </div>
                            <div>
                                <h6 className="ms-4 fw-bold m-0">{tuit.comments} <span className="text-secondary fw-normal">Comments</span></h6>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-inline-flex justify-content-between w-100 ps-5 pe-5">
                            <h6 className="text-secondary m-0"><i className="fa-regular fa-comment fa-lg"/></h6>
                            <h6 className="text-secondary m-0"><i className="fa-solid fa-retweet fa-lg"/></h6>
                            <h6 className="text-secondary m-0">
                                {
                                    isLiked() && <i className="fa-solid fa-heart fa-lg" onClick={unlikeIt}/>
                                }
                                {
                                    !isLiked() && <i className="fa-regular fa-heart fa-lg" onClick={likeIt}/>
                                }
                            </h6>
                            <h6 className="text-secondary m-0">
                                {/*//TODO: uncomment when bookmark logic is implemented*/}
                                {/*{*/}
                                {/*    isBookmarked() && <i className="fa-solid fa-bookmark fa-lg"/>*/}
                                {/*}*/}
                                {/*{*/}
                                {/*    !isBookmarked() && <i className="fa-regular fa-bookmark fa-lg"/>*/}
                                {/*}*/}
                                <i className="fa-regular fa-bookmark fa-lg"/>
                            </h6>
                        </div>
                        <hr/>
                        <div className={`${tuit.comments.length > 0 ? "" : "wd-no-display"} `}>
                            {
                                tuit.comments.map && tuit.comments.map(comment =>
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