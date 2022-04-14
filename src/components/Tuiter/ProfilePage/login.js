import React from "react";
import {useSelector} from "react-redux";

const LoginPage = () => {

    return(
        <div className="container-fluid">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Tuiter Username</label>
                <input type="text" className="form-control"
                       id="exampleFormControlInput1"
                       placeholder="username"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea2" className="form-label">Password</label>
                <input type="password" className="form-control"
                       id="exampleFormControlInput2"/>
            </div>
            <button type="button"  className="btn btn-primary">Sign in</button>
            <div>
                Don't have an account? <a href="/signup"> Sign Up</a>
            </div>
        </div>
    );
}

export default LoginPage;