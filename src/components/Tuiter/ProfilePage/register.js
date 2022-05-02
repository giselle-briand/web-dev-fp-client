import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createUser} from "../actions/users-actions";
import '../../../css/profile.css'
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";

const Register = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate()
    const test = useProfile()
    const [alertStatus, setAlertStatus] = useState(false)
    const [user, setUser] = useState({
            name: "",
            username: "",
            password: "",
            bio: "",
            email: "",
            phoneNumber:"",
            admin: false
    });

    const createUserClickHandler = async () => {
        try {
            await test.signup(user)
            navigate('/profile')
        } catch (e) {
            setAlertStatus(true)
        }
    }

    const adminResponse = (e) => {
        const adminValue = (e.target.value === "yes");
        setUser({
            ...user,
            admin: adminValue
        })
    }
    const goBack = () => {
        navigate("/login")
    }
    return(
        <div>
            <div className="mb-3 row">
                <div className="col-sm-2 col-form-label">
                    <i className="fa-solid fa-arrow-left ps-3 col-1 white-text" onClick={goBack}/>
                </div>
                <div className="col-sm-10">
                    <h5>Register</h5>
                </div>
            </div>
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

            <div className="mb-3 row">
                <p className="col-sm-2 col-form-label">Admin</p>
                <div className="col-sm-10"
                     onChange={(e) => adminResponse(e)}>
                    <label htmlFor="yes">Yes</label>
                    <input type="radio" className="space-radio" name="adminselection" id="yes" value="yes"/>
                    <label htmlFor="no">No</label>
                    <input type="radio" className="space-radio" name="adminselection" id="no" value="no"/>
                </div>
            </div>
            {
                alertStatus && <div className="color-red mt-2">Registering failed. The email provided is already associated with another account.</div>
            }

            <button type="button" className="btn btn-primary wd-rounded-button" onClick={createUserClickHandler}>
                Create User
            </button>
        </div>
    );
}

export default Register;