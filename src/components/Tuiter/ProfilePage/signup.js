import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createUser} from "../actions/users-actions";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";

const api = axios.create({withCredentials: true})

const SignUp = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate()
    const test = useProfile()

    const [user, setUser] = useState({
            name: "",
            username: "",
            password: "",
            bio: "",
            email: "",
            phoneNumber:""
    });

    const createUserClickHandler = async () => {
        try {
            await test.signup(user)
            navigate('/profile')
        } catch (e) {
            alert('oops')
        }

    }

    return(
        <div>
            <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="name" placeholder="John Appleseed"
                           onChange={(e) =>
                               setUser({
                                   ...user,
                                   name: e.target.value
                               })} required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="handle" className="col-sm-2 col-form-label">
                    Username</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="handle" placeholder="johnnyappleseed"
                           onChange={(e) =>
                               setUser({
                                   ...user,
                                   username: e.target.value
                               })} required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password</label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control"
                           id="password"
                           onChange={(e) =>
                               setUser({
                                   ...user,
                                   password: e.target.value
                               })} required/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="email1" className="col-sm-2 col-form-label">
                    Email</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="email1" placeholder="username@email.com"
                           onChange={(e) =>
                               setUser({
                                   ...user,
                                   email: e.target.value
                               })} required/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="phonenum" className="col-sm-2 col-form-label">
                    Phone Number</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="phonenum" placeholder="(xxx)xxx-xxxx"
                           onChange={(e) =>
                               setUser({
                                   ...user,
                                   phoneNumber: e.target.value
                               })} required/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="textarea1" className="col-sm-2 col-form-label">
                    Bio</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="textarea1" rows="3"
                              onChange={(e) =>
                                  setUser({
                                      ...user,
                                      bio: e.target.value
                                  })}/>
                </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={createUserClickHandler}>
                Create User
            </button>
        </div>
    );
}

export default SignUp;