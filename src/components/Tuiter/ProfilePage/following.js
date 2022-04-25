import {useProfile} from "../../../contexts/profile-context";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {findFollowersByUserId, findFollowingByUserId} from "../../services/users-service";
import Tuit from "../Tuit";
import ProfileItem from "./profileitem";
import {useNavigate} from "react-router";

const Following = ({
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
    const {profile} = useProfile()
    const navigate = useNavigate()
    const [followings, setFollowings] = useState([])
    const location = useLocation()
    const s = location.state

    if (location.pathname === "/profile/followers") {
        user = profile;
    } else {
        user = s.aUser;
    }

    const findFollowing = async () => {
        const following = await findFollowingByUserId(user._id)
        setFollowings(following)
    }

    useEffect(() => {
        findFollowing()
    }, [])

    const LOGGED_IN_USER_PROFILE_PATHS = "/profile/following";
    const OTHER_USER_PROFILE_PATHS = `/profile/${user.username}/following`

    const goBack = () => {
        if (LOGGED_IN_USER_PROFILE_PATHS === location.pathname) {
            navigate("/profile", {state: {aUser: user}});
        } else {
            navigate(`/profile/${user.username}`, {state: {aUser: user}})
        }
    }

    return(
        <div className="up-down-padding row">
            <div className="col-1 d-flex align-items-center"><i className="fa-solid fa-arrow-left ps-3 col-1 white-text" onClick={goBack}/></div>
            <div className="ps-5 inline col-11">
                <div className="bold white-text">Users who {user.name} follows</div>
            </div>
            <br/>
            <hr/>
            <ul className="list-group">
                {
                    followings && followings.map(f =>
                        <ProfileItem user={f}/>
                    )
                }
            </ul>
        </div>
    )
};

export default Following;