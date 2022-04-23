import React from "react";
import {Link, useLocation} from "react-router-dom";

const ProfileNavigation = (
    {
        active = '',
        user = {
            name: "rosan wang",
            username: "WangRosan",
            password: "",
            avatar_image: "../../../media/profileimage.jpg",
            header: "../../../media/fall.png",
            bio: "Hi! Welcome to my Bio!",
            followerCount: 1,
            followingCount: 1,
            followers: [],
            following: [],
            loggedIn: Boolean,
            tuits: [],
            comments: [],
            tuitsCount: 0,
            likes: [],
            email: "rosanwang@yahoo.com",
            phoneNumber: String
        },
        previous_path = ""
    }
) => {
    const location = useLocation()
    active = location.pathname;
    const highlight = (id) => {
        const selectedDiv = document.getElementById(id);
        const postsDiv = document.getElementById("posts");
        const commentsDiv = document.getElementById("comments");
        const likesDiv = document.getElementById("likes");
        if (id === "comments") {
            selectedDiv.style.backgroundColor = "#2a9fd6";
            postsDiv.style.backgroundColor = "transparent";
            likesDiv.style.backgroundColor = "transparent";
        }
        else if (id === "posts") {
            selectedDiv.style.backgroundColor = "#2a9fd6";
            commentsDiv.style.backgroundColor = "transparent";
            likesDiv.style.backgroundColor = "transparent";
        }
        else {
            selectedDiv.style.backgroundColor = "#2a9fd6";
            postsDiv.style.backgroundColor = "transparent";
            commentsDiv.style.backgroundColor = "transparent";
        }
    }
    let comments_path;
    let tuits_path;
    let likes_path;
    if (previous_path === "/profile") {
        comments_path = "profile/comments";
        tuits_path = "profile/";
        likes_path = "profile/likes";
    }
    else {
        comments_path = previous_path.concat("/comments");
        tuits_path = previous_path;
        likes_path = previous_path.concat("/likes");;
    }

    return(
        <>
            <div className="nav nav-tabs nav-fill" >
                <div  className={`nav-item col-3`}>
                    <Link id="posts" className={`nav-link ${active === "/profile" ? "active" : ""}`} to={"/profile"} onClick={() => {highlight("posts")}}>Tuits</Link>
                </div>
                <div className={`nav-item col-3 `}>
                    <Link id="comments" className="nav-link" to={"/profile/comments"} onClick={() => {highlight("comments")}}>Comments</Link>
                </div>
                <div className={`nav-item col-3`}>
                    <Link id="likes" className="nav-link" to={"/profile/likes"} onClick={() => {highlight("likes")}}>Likes</Link>
                </div>
            </div>
        </>
    );
}
export default ProfileNavigation;
