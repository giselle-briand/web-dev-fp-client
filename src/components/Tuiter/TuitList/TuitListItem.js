import React from "react";
import {useDispatch} from "react-redux";
import {deleteTuit} from "../actions/tuits-actions";

const TuitListItem = (
    {
        tuit = {
            "_id": "123",
            "topic": "Web Development",
            "username": "ReactJS",
            "liked": true,
            "verified": false,
            "handle": "ReactJS",
            "time": "2h",
            "title": "React.js is a component based front end library that makes it very easy to build Single Page Applications or SPAs",
            "tuit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "video": "unKvMC3Y1kI",
            "logo-image": "../../../images/react-blue.png",
            "avatar-image": "../../../images/react-blue.png",
            "tuits": "122K",
            "comments": 123,
            "likes": 345
        }
    }
) => {
    const dispatch = useDispatch();
    return(
        <>
            <div className="wd-float-left wd-avatar-width">
                <img src={tuit["avatar-image"]} className="wd-avatar-image" alt={tuit["avatar-image"]}/>
            </div>
            <div className="wd-float-right wd-tuit-width">
                <i className="fas fa-remove float-end" onClick={() => deleteTuit(dispatch, tuit)}/>
                <div className="wd-tuits-list-home wd-float-left">
                    {tuit.username}
                    <i className={`${tuit.verified ? "fa-solid fa-circle-check wd-verified-check" : ""}`}/>
                </div>
                <div className={`${tuit.verified ? "wd-tuit-account-handle-home-verified wd-float-left" : "wd-tuit-account-handle-home-unverified wd-float-left"}`}>
                    @{tuit.handle} -  {tuit.time}
                </div>
                <div className="wd-tuit-itself wd-float-done">
                    {tuit.tuit}
                </div>
                <img src={`${tuit.hasOwnProperty("image") ? tuit.image : ""}`}
                     className={`${tuit.hasOwnProperty("image") ? "wd-tuit-image-home" : "wd-no-display"}`}/>
                <iframe width="500" height="300" src={`${tuit.hasOwnProperty("video") ? tuit.video : ""}`}
                        className={`${tuit.hasOwnProperty("video") ? "wd-tuit-image-home" : "wd-no-display"}`}
                        title="Video" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </div>
        </>
    );
}
export default TuitListItem;