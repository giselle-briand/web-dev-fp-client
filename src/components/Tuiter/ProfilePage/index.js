import React from "react";
import '../../../css/profile.css'
import TuitList from "../../Tuiter/TuitList";
import {useProfile} from "../../../contexts/profile-context";
import {useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import ProfileNavigation from "./sub-pages"

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
                             loggedIn: Boolean,
                             tuits: [],
                             comments: [],
                             tuitsCount: 0,
                             likes: [],
                             email: "rosanwang@yahoo.com",
                             phoneNumber: String
                         }
                     }) => {

    const {profile, signout} = useProfile()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signout()
            navigate('/login')
        } catch (e) {
            alert("logout failed")
        }

    }
    const location = useLocation()
    console.log(location)
    const s = location.state
    // const location = useLocation()
    // const {loggedIn} = location.state;
    // const {giveUser} = location.state.giveUser;
    user = profile;
    console.log(s);
    return(
        <div className="container-fluid">
            <div className="up-down-padding row">
                {/*<div className="col-1 d-flex align-items-center">*/}
                {/*    <i className="fa-solid fa-arrow-left ps-3 col-1 white-text"/>*/}
                {/*</div>*/}
                <div className="ps-5 inline col-11">
                    <div className="bold white-text">{user.name}</div>
                    <div className="white-text">{user.tuits.length} tuits</div>
                </div>
            </div>
            <img className="background-pic" src={user.header}/>
            <img className="pfp" src={user["avatar-image"]}/>

            <button type="button" onClick={logout} className="btn btn-primary wd-float-right">Logout</button>

            <div className="username-text-align bold">{user.name}</div>
            <div className="username-text-align">@{user.username}</div>
            <div className="username-text-align up-down-padding">{user.bio}</div>
            <div className="username-text-align">
                <span> <span className="bold">{user.followingCount}</span> Following</span>
                <span> <span className="bold">{user.followerCount}</span> Follower</span>
            </div>

            <ProfileNavigation user={user} previous_path={location.pathname}/>
            <Outlet/>
        </div>
    );
}
//Add filter operation based on link selected
export default ProfilePage;
//<WhoToFollowListItem who={who}/>