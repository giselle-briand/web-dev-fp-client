import React from "react";
import {useSelector} from "react-redux";

const SignUp = () => {

    return(
        <div>
            <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="name" placeholder="John Appleseed"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="handle" className="col-sm-2 col-form-label">
                    Username</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="handle" placeholder="johnnyappleseed"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password</label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control"
                           id="password"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="email1" className="col-sm-2 col-form-label">
                    Email</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="email1" placeholder="username@email.com"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="textarea1" className="col-sm-2 col-form-label">
                    Bio</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="textarea1" rows="3"/>
                </div>
            </div>

            <button type="button" className="btn btn-primary">Create User</button>
        </div>
    );
}

export default SignUp;