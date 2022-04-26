import React, {useState} from "react";
import '../../../css/profile.css'
import {useProfile} from "../../../contexts/profile-context";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import ProfileNavigation from "./sub-pages"
import {deleteUser, updateUser} from "../actions/users-actions";
import SecureContent from "../../secure-content";

const ProfilePage = (
    {
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
                     }
                     ) => {

    const {profileState, signout} = useProfile()
    const [profile, ] = profileState
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [followButtonText, setFollowButtonText] = useState("Follow")
    const [followingButtonText, setFollowingButtonText] = useState("Following")

    const logout = async () => {
        try {
            await signout()
            navigate('/')
        } catch (e) {
            alert("logout failed")
        }

    }
    const editProfile = async () => {
        // TODO: add edit profile ability
    }
    const deleteAccount = () => {
        deleteUser(dispatch, user)
        navigate("/")
    }
    const followUser = () => {
        updateUser(dispatch, {
            ...profile,
            following: [...profile.following, user._id],
            followingCount: profile.followingCount + 1
        });
        updateUser(dispatch, {
            ...user,
            followers: [...user.followers, profile._id],
            followersCount: user.followersCount + 1
        });
        setFollowButtonText("Following");
        console.log("LOGGED IN USER JSON AND OTHER USER JSON AFTER THE ACTION IN FOLLOWUSER() IN PROFILEPAGE/INDEX.JS")
        console.log(profile)
        console.log(user)
    }
    const unfollowUser = () => {
        updateUser(dispatch, {
            ...profile,
            following: profile.following.filter(a_user => a_user._id !== user._id),
            followingCount: profile.followingCount - 1
        });
        updateUser(dispatch, {
            ...user,
            followers: user.following.filter(a_user => a_user._id !== profile._id),
            followersCount: user.followersCount - 1
        });
        console.log("LOGGED IN USER JSON AND OTHER USER JSON AFTER THE ACTION IN UNFOLLOWUSER() IN PROFILEPAGE/INDEX.JS")
        console.log(profile)
        console.log(user)
        setFollowingButtonText("Follow");
    }
    const checkIfFollowing = () => {
        try {
            console.log("LOGGED IN USER JSON AND OTHER USER JSON IN CHECKIFFOLLOWING() IN PROFILEPAGE/INDEX.JS")
            console.log(profile)
            console.log(user)
            return user.followers.includes(profile._id) && profile.following.includes(user._id);
        }
        catch (e) {
            return false;
        }
    }
    let parent_path, tuit;
    const location = useLocation()
    const s = location.state

    if (location.pathname === "/profile") {
        user = profile
    } else {
            try {
                user = s.aUser
                parent_path = s.previous_path;
                tuit = s.thePost;
            } catch (e) {
                console.log("s in propage is")
                console.log(s)
            }
        // if (user === undefined) {
        //     user = s[0]
        //     parent_path = s[1]
        // }
    }
    const LOGGED_IN_USER_PROFILE_PATHS = ["/profile", "/profile/bookmarks", "/profile/likes"];
    const OTHER_USER_PROFILE_PATHS = [`/profile/${user.username}`, `/profile/${user.username}/bookmarks`, `/profile/${user.username}/likes`]
    const goBack = () => {
        navigate(parent_path, {state: {aUser: user, previous_path: parent_path, thePost: tuit}});
    }
    const goToFollowing = () => {
        if (LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname)) {
            navigate("/profile/following", {state: {aUser: user}});
        } else {
            navigate(`/profile/${user.username}/following`, {state: {aUser: user}})
        }
    }
    const goToFollowers = () => {
        if (LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname)) {
            navigate("/profile/followers", {state: {aUser: user}});
        } else {
            navigate(`/profile/${user.username}/followers`, {state: {aUser: user}})
        }
    }
    return(
        <div className="container-fluid">
            <div className="up-down-padding row">
                {
                    OTHER_USER_PROFILE_PATHS.includes(location.pathname) && <div className="col-1 d-flex align-items-center"><i className="fa-solid fa-arrow-left ps-3 col-1 white-text" onClick={goBack}/></div>
                }
                <div className="ps-5 inline col-11">
                    <div className="bold white-text">{user.name}</div>
                    {
                        LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && <div className="white-text sizing">{user.email} · {user.phoneNumber}</div>
                    }

                </div>
            </div>
            <img className="background-pic" src={user.header}/>
            <img className="pfp" src={user["avatar-image"]}/>
            {
                LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && <button type="button" onClick={logout} className="btn btn-primary wd-float-right space-button">Logout</button>
            }
            {
                LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && <button type="button" onClick={editProfile} className="btn btn-primary wd-float-right space-button">Edit Profile</button>
            }
            {
                (OTHER_USER_PROFILE_PATHS.includes(location.pathname) && !checkIfFollowing()) && <SecureContent><button type="button" onClick={followUser} className="btn btn-primary wd-float-right space-button">{followButtonText}</button></SecureContent>
            }
            {
                (OTHER_USER_PROFILE_PATHS.includes(location.pathname) && checkIfFollowing()) && <SecureContent><button type="button" onClick={unfollowUser} className="btn btn-primary wd-float-right space-button">{followingButtonText}</button></SecureContent>
            }
            {
                profile.admin && <button type="button" onClick={deleteAccount} className="btn btn-primary wd-float-right space-button">Delete Account</button>
            }
            <div className="username-text-align bold">{user.name}</div>
            <div className="username-text-align">@{user.username}</div>
            <div className="username-text-align up-down-padding">{user.bio}</div>
            <div className="username-text-align">
                <span onClick={goToFollowing}> <span className="bold">{user.followingCount}</span> Following</span>
                <span onClick={goToFollowers}> <span className="bold">{user.followerCount}</span> Follower</span>
            </div>
            <ProfileNavigation user={user} previous_path={location.pathname} parent_path={parent_path}/>
            <Outlet context={user}/>
        </div>
    );
}

export default ProfilePage;
