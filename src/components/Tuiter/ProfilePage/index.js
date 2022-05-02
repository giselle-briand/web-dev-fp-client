import React, {useState} from "react";
import '../../../css/profile.css'
import {useProfile} from "../../../contexts/profile-context";
import {useDispatch} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import ProfileNavigation from "./sub-pages"
import {deleteUser, updateUser, updateOtherUser} from "../actions/users-actions";
import SecureContent from "../../secure-content";
import {
    findBookmarksByUserId,
    findCommentsByUserId,
    findFollowersByUserId,
    findFollowingByUserId, findLikedTuitsByUserId,
    findUser
} from "../../services/users-service";
import {deleteTuit, updateTuit} from "../actions/tuits-actions";
import {findTuitById} from "../../services/tuits-service";

const ProfilePage = (
    {
                         givenuser = {
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
                         }
                     }
                     ) => {

    const {profileState, signout} = useProfile()
    const [profile, setProfile] = profileState
    const navigate = useNavigate()
    const dispatch = useDispatch();

    let parent_path, tuit;
    const location = useLocation()
    const s = location.state

    if (location.pathname === "/profile") {
        givenuser = profile
    }
    else {
        try {
            givenuser = s.aUser
            parent_path = s.previous_path;
            tuit = s.thePost;
        } catch (e) {
            console.log("s in propage is")
            console.log(s)
        }
    }

    const [user, setUser] = useState(givenuser)
    const LOGGED_IN_USER_PROFILE_PATHS = ["/profile", "/profile/bookmarks", "/profile/likes"];
    const OTHER_USER_PROFILE_PATHS = [`/profile/${user.username}`, `/profile/${user.username}/bookmarks`, `/profile/${user.username}/likes`]

    const goBack = () => {
        if (LOGGED_IN_USER_PROFILE_PATHS.includes(parent_path)) {
            navigate(parent_path, {state: {aUser: profile, previous_path: parent_path, thePost: tuit}});
        } else {
            navigate(parent_path, {state: {aUser: user, previous_path: parent_path, thePost: tuit}});
        }
    }
    const logout = async () => {
        try {
            await signout()
            navigate('/')
        } catch (e) {
            alert("logout failed")
        }

    }
    const editProfile = async () => {
        navigate("/profile/edit")
    }
    const checkIfFollowing = () => {
        try {
            return user.followers.includes(profile._id) && profile.following.includes(user._id);
        }
        catch (e) {
            return false;
        }
    }
    const followUser = async () => {
        const newU = {
            ...profile,
            following: [...profile.following, user._id],
            followingCount: profile.followingCount + 1
        }
        await updateUser(dispatch, newU);
        setProfile({...newU})

        const otherUser = {
            ...user,
            followers: [...user.followers, profile._id],
            followerCount: user.followerCount + 1
        }

        await updateOtherUser(dispatch, otherUser);
        setUser({...otherUser})
    }
    const unfollowUser = async () => {
        const newU = {
            ...profile,
            following: profile.following.filter(a_user => a_user !== user._id),
            followingCount: profile.followingCount - 1
        }

        await updateUser(dispatch, newU);
        setProfile({...newU})

        const otherUser = {
            ...user,
            followers: user.followers.filter(a_user => a_user !== profile._id),
            followerCount: user.followerCount - 1
        }

        await updateOtherUser(dispatch, otherUser);
        setUser({...otherUser})
    }
    const deletePostsByUser = async () => {

        const posts = await findCommentsByUserId(user._id)
        if (posts.length !== 0) {
            for (let i=0; i<posts.length; i++) {
                if (posts[i].parent_path !== undefined) {
                    const parentTuit = await findTuitById(posts[i].parent_path)
                    const newParentTuit = {
                        ...parentTuit,
                        comments: parentTuit.comments - 1,
                        commented_users: parentTuit.commented_users.filter(a_user => a_user._id !== user._id)
                    }
                    await updateTuit(dispatch, newParentTuit);
                }
                if (posts[i].likes > 0) {
                    posts[i].liked_users.map( async(id) => {
                        const userLiked = await findUser(id);
                        const newU = {
                            ...userLiked,
                            liked_tuits: userLiked.liked_tuits.filter(t => t !== posts[i]._id)
                        }
                        console.log(newU)
                        await updateUser(dispatch, newU);

                    })
                }
                if (posts[i].bookmarked_users.length > 0) {
                    posts[i].bookmarked_users.map( async(id) => {
                        const userBookmarked = await findUser(id);
                        const newU = {
                            ...userBookmarked ,
                            bookmarks: userBookmarked.bookmarks.filter(t => t !== posts[i]._id)
                        }
                        await updateUser(dispatch, newU);

                    })
                }
                await deleteTuit(dispatch, posts[i])
            }
        }
        console.log("just deleted all their tuits")
    }
    const deleteUserFromFollowersAndFollowingLists = async () => {
        const listOfFollowing = await findFollowingByUserId(user._id)
        const listOfFollowers = await findFollowersByUserId(user._id)
        console.log("list of following:")
        console.log(listOfFollowing)
        console.log("list of followers:")
        console.log(listOfFollowers)
        if (listOfFollowing.length !== 0) {
            for (let i = 0; i < listOfFollowing.length; i++) {
                // const userFollowing = await findUser(listOfFollowing[i]._id);
                const newUserFollowing = {
                    ...listOfFollowing[i],
                    followers: listOfFollowing[i].followers.filter(a_user => a_user !== user._id)
                    // followerCount: listOfFollowing[i].followerCount - 1
                }
                await updateUser(dispatch, newUserFollowing);
                const userFollowingNew = {
                    ...listOfFollowing[i],
                    followerCount: listOfFollowing[i].followerCount - 1
                }
                await updateUser(dispatch, userFollowingNew);
            }
        }
        if (listOfFollowers.length !== 0) {
            for (let i=0; i<listOfFollowers.length; i++) {
                const userFollower = await findUser(listOfFollowers[i]._id);
                const newUserFollower = {
                    ...userFollower,
                    following: userFollower.following.filter(a_user => a_user !== user._id),
                    followingCount: userFollower.followingCount - 1
                }
                await updateUser(dispatch, newUserFollower);
                const userFollowerNew = {
                    ...userFollower,
                    followerCount: userFollower.followerCount - 1
                }
                await updateUser(dispatch, userFollowerNew);
            }
        }
        console.log("just finished going through followers/following")
    }
    const deleteFromBookmarksAndLikedTuits = async () => {
        const bookmarkedTuits = await findBookmarksByUserId(user._id);
        const likedTuits = await findLikedTuitsByUserId(user._id);
        console.log("bookmarkedTuits:")
        console.log(bookmarkedTuits)
        console.log(bookmarkedTuits.length)
        console.log("likedTuits:")
        console.log(likedTuits)
        console.log(likedTuits.length)
        if (bookmarkedTuits.length !== 0) {
            for (let i=0; i<bookmarkedTuits.length; i++) {
                // const bookmarkedTuit = await findTuitById(bookmarkedTuits[i])
                const newBookmarkedTuit = {
                    ...bookmarkedTuits[i],
                    bookmarked_users: bookmarkedTuits[i].bookmarked_users.filter(a_user => a_user !== user._id)
                }
                await updateTuit(dispatch, newBookmarkedTuit)
            }
        }
        if (likedTuits.length !== 0) {
            for (let i=0; i<likedTuits.length; i++) {
                // const likedTuit = await findTuitById(likedTuits[i]._id)
                const newLikedTuit = {
                    ...likedTuits[i],
                    liked_users: likedTuits[i].liked_users.filter(a_user => a_user !== user._id)
                }
                await updateTuit(dispatch, newLikedTuit)
                const newLikesCount = {
                    ...likedTuits[i],
                    likes: likedTuits[i].likes - 1
                }
                await updateTuit(dispatch, newLikesCount);
            }
        }
    }
    const deleteAccount = async () => {
        await deletePostsByUser();
        await deleteUserFromFollowersAndFollowingLists();
        await deleteFromBookmarksAndLikedTuits();
        await deleteUser(dispatch, user)
        navigate("/")
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
                    OTHER_USER_PROFILE_PATHS.includes(location.pathname) && <div className="col-1 d-flex align-items-center"><i className="fa-solid fa-arrow-left ps-3 col-1 white-text wd-cursor-pointer" onClick={() => goBack()}/></div>
                }
                <div className="inline col-11">
                    <div className="bold white-text">{user.name}</div>
                    {
                        (LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) || profile.admin) && <div className="white-text sizing">{user.email} {`${user.phoneNumber ? "·" + user.phoneNumber : ""}`}</div>
                    }

                </div>
            </div>
            <img className="background-pic" src={user.header}/>
            <img className="pfp" src={user["avatar-image"]}/>
            {
                LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && <button type="button" onClick={() => logout()} className="btn btn-primary wd-float-right space-button wd-rounded-button">Logout</button>
            }
            {
                LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && <button type="button" onClick={() => editProfile()} className="btn btn-primary wd-float-right space-button wd-rounded-button">Edit Profile</button>
            }
            {
                (OTHER_USER_PROFILE_PATHS.includes(location.pathname) && !checkIfFollowing()) && <SecureContent><button type="button" onClick={() => followUser()} className="btn btn-primary wd-float-right space-button wd-rounded-button">Follow</button></SecureContent>
            }
            {
                (OTHER_USER_PROFILE_PATHS.includes(location.pathname) && checkIfFollowing()) && <SecureContent><button type="button" onClick={() => unfollowUser()} className="btn btn-primary wd-float-right space-button wd-rounded-button">Following</button></SecureContent>
            }
            {
                (profile.admin && !LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname)) && <button type="button" onClick={() => deleteAccount()} className="btn btn-primary wd-float-right space-button wd-rounded-button">Delete Account</button>
            }
            <div className="username-text-align bold">{user.name}</div>
            <div className="username-text-align">@{user.username}</div>
            <div className="username-text-align up-down-padding">{user.bio}</div>
            <div className="username-text-align">
                <span className="wd-cursor-pointer" onClick={() => goToFollowing()}> <span className="bold">{user.followingCount}</span> Following</span>
                <span className="wd-cursor-pointer" onClick={() => goToFollowers()}> <span className="ps-3 bold">{user.followerCount}</span> Follower</span>
            </div>
            <ProfileNavigation user={user} previous_path={location.pathname} parent_path={parent_path}/>
            <Outlet context={user}/>
        </div>
    );
}

export default ProfilePage;
