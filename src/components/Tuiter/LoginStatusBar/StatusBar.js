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
        <div className="row wd-inline justify-content-end">
        {
            isLoggedIn() && <div className="d-inline-flex w-50"><h6 className="fw-bold m-2">Hi, {profile.name}!</h6><img src={profile["avatar-image"]} className="wd-avatar-image-small" onClick={() => goToProfile()}/></div>
        }
        {
            !isLoggedIn() && <div className="d-inline-flex w-100 justify-content-end" ><button type="button" onClick={() => login()} className="btn btn-primary wd-signin-button mb-2">Log in</button></div>
        }
        </div>
    )
};

export default StatusBar;
