import React, {useRef} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import {useNavigate} from "react-router";

const LoginPage = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signin} = useProfile()
    const handleSigninBtn = async () => {
        try {
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            )
            navigate('/profile')
        } catch (e) {
            alert('oops')
        }
    }

    return(
        <div className="container-fluid">
            <h5>Look's like you're not logged in! Log in to unlock more actions and features.</h5>
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
            <button type="button" onClick={handleSigninBtn} className="btn btn-primary">Sign in</button>
            <div>
                Don't have an account? <Link to="/signup"> Sign Up</Link>
            </div>
        </div>
    );
}

export default LoginPage;