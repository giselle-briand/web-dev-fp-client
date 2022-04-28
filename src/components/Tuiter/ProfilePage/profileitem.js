import {useProfile} from "../../../contexts/profile-context";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {updateUser} from "../actions/users-actions";
import {useDispatch} from "react-redux";
import {findUser} from "../../services/users-service";
import {useNavigate} from "react-router";

const ProfileItem = ({
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
                                       liked_tuits: [],
                                       verified: true,
                                       email: "rosanwang@yahoo.com",
                                       phoneNumber: "",
                                       admin: false
                                   }
                               }) => {
    const {profile} = useProfile()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookmarks, setBookmarks] = useState([])
    const [followButtonText, setFollowButtonText] = useState("Follow")
    const [followingButtonText, setFollowingButtonText] = useState("Following")
    const location = useLocation()
    // const s = location.state

    // if (location.pathname === "/profile/bookmarks") {
    //     user = profile;
    // } else {
    //     user = s.aUser;
    // }

    const followUser = async () => {
        const loggedInUser = profile
        await updateUser(dispatch, {
            ...loggedInUser,
            following: loggedInUser.following.push(user._id),
            followingCount: loggedInUser.following.length
        });
        await updateUser(dispatch, {
            ...user,
            followers: user.followers.push(loggedInUser._id),
            followersCount: user.followers.length
        });
        setFollowButtonText("Following");
    }
    const unfollowUser = async () => {
        const loggedInUser = profile
        const userToRemoveIndex = loggedInUser.following.indexOf(user._id)
        const otherUserToRemoveIndex = user.following.indexOf(loggedInUser._id)
        await updateUser(dispatch, {
            ...loggedInUser,
            following: loggedInUser.following.splice(userToRemoveIndex, 1),
            followingCount: loggedInUser.following.length
        });
        await updateUser(dispatch, {
            ...user,
            followers: user.followers.splice(otherUserToRemoveIndex, 1),
            followersCount: user.followers.length
        });
        setFollowButtonText("Follow");
    }
    const checkIfFollowing = () => {
        const loggedInUser = profile
        const otherUsersId = user._id
        return loggedInUser.following.includes(otherUsersId);
    }
    const goToProfile = async () => {
        navigate(`/profile/${user.username}`, {state: {aUser: user, previous_path: location.pathname}})
    }
    const LOGGED_IN_USER_PROFILE_PATHS = ["/profile/followers", "/profile/following"];
    const OTHER_USER_PROFILE_PATHS = [`/profile/${user.username}/followers`, `/profile/${user.username}/following`]

    return (
        <div className="row ps-3 pe-3">
            <div className="col-1">
                <img src={user['avatar-image']} className="wd-avatar-image"/>
            </div>
            <div className="col-11 mb-2">
                <div className="d-inline-flex justify-content-between w-100" onClick={() => goToProfile()}>
                    <h6 className="fw-bold m-0 ps-2">{user.name}
                        <span><i className={`${user.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        {
                            (OTHER_USER_PROFILE_PATHS.includes(location.pathname) && !checkIfFollowing()) && <button type="button" onClick={() => followUser()} className="btn btn-primary wd-float-right space-button">{followButtonText}</button>
                        }
                        {
                            (OTHER_USER_PROFILE_PATHS.includes(location.pathname) && checkIfFollowing()) && <button type="button" onClick={() => unfollowUser()} className="btn btn-primary wd-float-right space-button">{followingButtonText}</button>
                        }
                    </h6>
                </div>
                <div>
                    <p className="fw-light text-secondary ps-2">
                        @{user.username}
                    </p>
                </div>
            </div>
            <hr/>
        </div>

    )
};

export default ProfileItem;