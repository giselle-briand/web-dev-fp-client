import React from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import '../../../../css/profile.css'
import {useProfile} from "../../../../contexts/profile-context";

const ProfileNavigation = (
    {
        active = '',
        user = {
            name: "Name",
            username: "username",
            password: "",
            avatar_image: "../../../media/profileimage.jpg",
            header: "../../../media/fall.png",
            bio: "Hi! Welcome to my Bio!",
            followerCount: 1,
            followingCount: 1,
            followers: [],
            following: [],
            liked_tuits: [],
            verified: true,
            email: "user@yahoo.com",
            phoneNumber: "",
            admin: false
        },
        previous_path = "",
        parent_path= ""
    }
) => {
    const {profileState} = useProfile()
    const [profile, ] = profileState
    const location = useLocation()
    active = location.pathname;

    let bookmarks_path;
    let tuits_path;
    let likes_path;
    const PREVIOUS_PATHS_FOR_LOGGED_IN_USER = ["/profile", "/profile/bookmarks", "/profile/likes"]
    if (PREVIOUS_PATHS_FOR_LOGGED_IN_USER.includes(previous_path)) {
        bookmarks_path = "/profile/bookmarks";
        tuits_path = "/profile";
        likes_path = "/profile/likes";
    }
    else {
        bookmarks_path = `/profile/${user.username}/bookmarks`;
        tuits_path = `/profile/${user.username}`;
        likes_path = `/profile/${user.username}/likes`;
    }
    //console.log("USER GIVEN TO SUBPAGES:")
    //console.log(user)

    const highlight = (id) => {
        const selectedDiv = document.getElementById(id);
        const postsDiv = document.getElementById("posts");
        const bookmarksDiv = document.getElementById("bookmarks");
        const likesDiv = document.getElementById("likes");
        if (id === "bookmarks") {
            selectedDiv.style.backgroundColor = "#2a9fd6";
            postsDiv.style.backgroundColor = "transparent";
            likesDiv.style.backgroundColor = "transparent";
        }
        else if (id === "posts") {
            selectedDiv.style.backgroundColor = "#2a9fd6";
            if (PREVIOUS_PATHS_FOR_LOGGED_IN_USER.includes(previous_path) || user.admin) {
                bookmarksDiv.style.backgroundColor = "transparent";
            }
            likesDiv.style.backgroundColor = "transparent";
        }
        else {
            selectedDiv.style.backgroundColor = "#2a9fd6";
            postsDiv.style.backgroundColor = "transparent";
            if (PREVIOUS_PATHS_FOR_LOGGED_IN_USER.includes(previous_path) || user.admin) {
                bookmarksDiv.style.backgroundColor = "transparent";
            }
        }
    }

    return(
        <>
            <div className="nav nav-tabs nav-fill spacing" >
                <div className={`nav-item col-3 `}>
                    <Link id="posts"
                          className={`nav-link ${active === "/profile" || active === `/profile/${user.username}` ? "active" : ""}`}
                          to={tuits_path}
                          state={{aUser: user, previous_path: parent_path}}
                          onClick={() => {highlight("posts")}}>Posts</Link>
                </div>
                <div className={`nav-item col-3`}>
                    <Link id="likes"
                          className="nav-link"
                          to={likes_path}
                          state={{aUser: user, previous_path: parent_path}}
                          onClick={() => {highlight("likes")}}>Likes</Link>
                </div>
                {
                    (PREVIOUS_PATHS_FOR_LOGGED_IN_USER.includes(previous_path) || profile.admin) &&
                        <div  className={`nav-item col-3`}>
                            <Link id="bookmarks"
                                  className="nav-link"
                                  to={bookmarks_path}
                                  state={{aUser: user, previous_path: parent_path}}
                                  onClick={() => {highlight("bookmarks")}}>Bookmarks</Link>
                        </div>
                }
            </div>
        </>
    );
}
export default ProfileNavigation;
