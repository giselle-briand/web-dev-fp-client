import {useProfile} from "../../../contexts/profile-context";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {findFollowingByUserId} from "../../services/users-service";
import ProfileItem from "./profileitem";
import {useNavigate} from "react-router";

const Following = () => {
    const {profileState} = useProfile()
    const [profile, ] = profileState
    const navigate = useNavigate()
    const [followings, setFollowings] = useState([])
    const location = useLocation()
    const s = location.state
    let user
    if (location.pathname === "/profile/following") {
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