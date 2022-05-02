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
    // const [isLoggedInUser, setIsLoggedInUser] = useState(false)
    const location = useLocation()
    const s = location.state
    let user
    if (location.pathname === "/profile/following") {
        user = profile;
        // setIsLoggedInUser(true)
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
        <div className="up-down-padding ps-3 pe-3 row">
            <div className="col-1 d-flex align-items-center"><i className="fa-solid fa-arrow-left ps-3 col-1 white-text wd-cursor-pointer" onClick={goBack}/></div>
            <div className="ps-3 inline col-11">
                <div className="bold white-text">Users you follow</div>
            </div>
        
            <hr className="mt-3"/>
            <ul className="list-group">
                {
                    (LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && followings.length === 0) && <h6 className="fw-bold mt-2 text-center text-secondary">You are not following anyone.</h6>
                }
                {
                    (!LOGGED_IN_USER_PROFILE_PATHS.includes(location.pathname) && followings.length === 0) && <h6 className="fw-bold mt-2 text-center text-secondary">{user.name} is not following anyone.</h6>
                }
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