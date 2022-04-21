import axios from "axios";
import React from "react";
import Tuit from "../Tuit";
import TuitStats from "../TuitStats/TuitStats";

const api = axios.create({
    withCredentials: true
  });

const Details = ({
    tuit = {
        tuit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque augue quam, ornare id pellentesque at, ultrices nec erat. Mauris euismod placerat lacus, interdum elementum dui dictum in. Etiam tempor id est porttitor viverra. Etiam sed scelerisque mauris.",
        likes: 14,
        dislikes: 0,
        comments: 1,
        retuits: 3,
        liked: true,
        disliked: false,
        name: "Stray Kids",
        username: "stray_kids",
        verified: false,
        time: "Just now",
        date: {
            day: "14",
            month: "Sep",
            year: "2022",
            time: "08:11 PM"
        },
        title: "",
        topic: "",
        "avatar-image": "../media/emptypp.webp"
    }
}) => {
    return (
        <div >
            <div className="row">
                <div className="col-1 d-flex align-items-center">
                    <i className="fa-solid fa-arrow-left ps-3 text-white"/>
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
                                <h6 className="text-secondary m-0"><i class="fa-solid fa-ellipsis"></i></h6>
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
                        <h6 className="text-secondary"><span>{tuit.date.time} · </span><span>{tuit.date.month + " " + tuit.date.day + ", " + tuit.date.year} · </span><span>Tuiter Web App</span></h6>
                        <hr/>
                        <div className="d-inline-flex justify-content-between" >
                            <div>
                                <h6 className="fw-bold m-0">{tuit.retuits} <span className="text-secondary fw-normal">Retweets</span></h6>
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
                            <h6 className="text-secondary m-0"><i class="fa-regular fa-comment fa-lg"></i></h6>
                            <h6 className="text-secondary m-0"><i class="fa-solid fa-retweet fa-lg"></i></h6>
                            <h6 className="text-secondary m-0"><i class="fa-regular fa-heart fa-lg"></i></h6>
                            <h6 className="text-secondary m-0"><i class="fa-solid fa-arrow-up-from-bracket fa-lg"></i></h6>
                        </div>
                        <hr/>
                        <div className={`${tuit.comments > 0 ? "" : "wd-no-display"} `}>
                            <Tuit />
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