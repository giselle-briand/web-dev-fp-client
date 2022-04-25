import React, {useState} from "react";
import '../../../css/profile.css'
import {useProfile} from "../../../contexts/profile-context";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import ProfileNavigation from "./sub-pages"
import {updateUser} from "../actions/users-actions";
import SecureContent from "../../secure-content";

const ProfilePage = ({
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
                             phoneNumber: String
                         }
                     }) => {
    const {profile, signout} = useProfile()
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
        //
    }
    const followUser = () => {
        const loggedInUser = profile
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
        console.log("logged in User:")
        console.log(profile)
        console.log("otherUser:")
        console.log(user)
    }
    const unfollowUser = () => {
        const loggedInUser = profile
        const userToRemoveIndex = loggedInUser.following.indexOf(user._id)
        const otherUserToRemoveIndex = user.following.indexOf(loggedInUser._id)
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
        console.log(profile)
        console.log(user)
        setFollowingButtonText("Follow");
    }
    const checkIfFollowing = () => {
        try {
            const loggedInUser = profile
            console.log(loggedInUser)
            const otherUsersId = user._id
            console.log(user)
            // console.log(loggedInUser.following.includes(otherUsersId))
            return user.followers.includes(loggedInUser._id);
        }
        catch (e) {
            return false;
        }
    }
    let parent_path;
    const location = useLocation()
    const s = location.state
    // console.log(location.state)

    if (location.pathname === "/profile") {
        user = profile;
    } else {
        user = s.aUser;
        parent_path = s.previous_path;
        if (user === undefined) {
            user = s[0]
            parent_path = s[1]
        }
    }
    const LOGGED_IN_USER_PROFILE_PATHS = ["/profile", "/profile/bookmarks", "/profile/likes"];
    const OTHER_USER_PROFILE_PATHS = [`/profile/${user.username}`, `/profile/${user.username}/bookmarks`, `/profile/${user.username}/likes`]
    // console.log(user)
    const goBack = () => {
        navigate(parent_path);
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
            <div className="username-text-align bold">{user.name}</div>
            <div className="username-text-align">@{user.username}</div>
            <div className="username-text-align up-down-padding">{user.bio}</div>
            <div className="username-text-align">
                <span onClick={goToFollowing}> <span className="bold">{user.followingCount}</span> Following</span>
                <span onClick={goToFollowers}> <span className="bold">{user.followerCount}</span> Follower</span>
            </div>
            <ProfileNavigation user={user} previous_path={location.pathname} parent_path={parent_path}/>
            <Outlet/>
        </div>
    );
}

export default ProfilePage;
