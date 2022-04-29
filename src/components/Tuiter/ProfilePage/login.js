import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {useNavigate} from "react-router";
import '../../../css/profile.css'

const LoginPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signin} = useProfile()
    const [alertStatus, setAlertStatus] = useState(false);
    const handleSigninBtn = async () => {
        try {
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            )
            navigate('/');
        } catch (e) {
            setAlertStatus(true);
        }
    }

    return(
        <div className="container-fluid">
            <h5>Looks like you're not logged in! Log in to access your profile and interact with other users.</h5>
            <br/>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Email</label>
                <input type="text" className="form-control"
                       id="exampleFormControlInput1"
                       placeholder="youremail@email.com"
                       ref={emailRef}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea2" className="form-label">Password</label>
                <input type="password" className="form-control"
                       id="exampleFormControlInput2" ref={passwordRef}/>
            </div>
            <button type="button" onClick={handleSigninBtn} className="btn btn-primary wd-rounded-button">Sign in</button>
            <div>
                Don't have an account? <Link to="/register"> Register here.</Link>
            </div>
            {
                alertStatus && <div className="color-red">Invalid credentials. Email and/or password are incorrect. If you don't have an account, please click the register link to create one.</div>
            }
        </div>
    );
}

export default LoginPage;