import {useProfile} from "../../../contexts/profile-context";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {findFollowersByUserId} from "../../services/users-service";
import ProfileItem from "./profileitem";
import {useNavigate} from "react-router";

const Followers = () => {
    const {profileState} = useProfile()
    const [profile, setProfile] = profileState
    const navigate = useNavigate()
    const [followers, setFollowers] = useState([])
    const location = useLocation()
    const s = location.state
    let user
    if (location.pathname === "/profile/followers") {
        user = profile;
    } else {
        user = s.aUser;
    }

    const findFollowers = async () => {
          const followers = await findFollowersByUserId(user._id)
          setFollowers(followers)
    }

    useEffect(() => {
          findFollowers()
    }, [])

    const LOGGED_IN_USER_PROFILE_PATHS = "/profile/followers";
    const OTHER_USER_PROFILE_PATHS = `/profile/${user.username}/followers`

    const goBack = () => {
        if (LOGGED_IN_USER_PROFILE_PATHS === location.pathname) {
            navigate("/profile", {state: {aUser: user}});
        } else {
            navigate(`/profile/${user.username}`, {state: {aUser: user}})
        }
    }
    return(
        <div className="up-down-padding row">
            <div className="col-1 d-flex align-items-center"><i className="fa-solid fa-arrow-left ps-3 col-1 white-text wd-cursor-pointer" onClick={goBack}/></div>
            <div className="ps-2 inline col-11">
                <div className="bold white-text">Users who follow {user.name}</div>
            </div>
            <br/>
            <hr/>
            <ul className="list-group">
                {
                    followers.length === 0 && <h6 className="fw-bold m-6">No followers yet.</h6>
                }
                {
                    followers && followers.map(follower =>
                        <ProfileItem user={follower}/>
                    )
                }
            </ul>
        </div>

    )
};

export default Followers;