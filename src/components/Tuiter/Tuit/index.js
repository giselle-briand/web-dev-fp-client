import React from "react";
import {createTuit, updateTuit} from "../actions/tuits-actions";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

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
    }
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const goToDetails = async (post) => {
        navigate(`/search/details/${post["api-post-id"]}`, {state: [post, location.pathname]});
    }
    return (
        <div className="row ps-3 pe-3">

            <div className="col-1">
            <img src={tuit['avatar-image']} className="wd-avatar-image"/>
            </div>
            <div className="col-11 mb-2">
                <div className="d-inline-flex justify-content-between w-100">
                    <h6 className="fw-bold m-0">{tuit.name}
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
                        <i id="heart" className="fa-regular fa-heart"
                           onClick={() => {
                               console.log("clicked me <3")
                               if (tuit.liked === true) {
                                   // try {
                                   //     const id = tuit._id;
                                   // }
                                   // catch (Error) {
                                   //     createTuit(dispatch, tuit)
                                   // }
                                   updateTuit(dispatch, {
                                       ...tuit,
                                       likes: tuit.likes - 1,
                                       liked: false
                                   })
                                   document.getElementById("heart").style.color = "red";
                               } else {
                                   if (tuit._id === undefined) {
                                       console.log("hi")
                                       createTuit(dispatch, tuit)
                                   }
                                   updateTuit(dispatch, {
                                       ...tuit,
                                       likes: tuit.likes + 1,
                                       liked: true
                                   })
                                   document.getElementById("heart").style.color = "transparent";
                               }
                           }}/>
                        <span className="ps-3">{tuit.likes}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        <i className="fa-solid fa-arrow-up-from-bracket"/>
                    </h6>
                </div>
            </div>
            <hr/>

        </div>
        
    )
}

export default Tuit