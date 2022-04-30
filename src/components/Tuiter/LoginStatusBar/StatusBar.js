import React, {useEffect, useState} from "react";
import {useProfile} from "../../../contexts/profile-context";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import '../../../css/universal.css';
import SecureContent from "../../secure-content";

const StatusBar = () => {
    const {profileState} = useProfile()
    const profile = profileState[0]
    const navigate = useNavigate()
    const isLoggedIn = () => {
        return profile !== "init";
    }
    const goToProfile = () => {
        navigate(`/profile`)
    }
    const login = () => {
        navigate(`/login`)
    }
    return(
        <div className="mt-1">
        {
            isLoggedIn() && <div className="d-inline-flex w-100 justify-content-end align-items-center">
                    <h6 className="fw-bold m-0 me-2">Hi, {profile.name}!</h6>
                    <img src={profile["avatar-image"]} className="m-0 wd-avatar-image-small" onClick={() => goToProfile()}/>
                </div>
        }
        {
            !isLoggedIn() && <div className="d-flex w-100 justify-content-end" >
                <button type="button" onClick={() => login()} className="btn btn-primary wd-signin-button mb-2 wd-rounded-button">Log in</button>
                </div>
        }
        </div>
    )
};

export default StatusBar;
