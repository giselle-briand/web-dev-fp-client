import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";
import React, {useRef} from "react";

const EditProfile = () => {
    const navigate = useNavigate()
    const {profileState, editUser} = useProfile()
    const [profile,] = profileState;

    const refName = useRef(profile.name)
    const refUsername = useRef(profile.username)
    const refPassword = useRef(profile.password)
    const refBio = useRef(profile.bio)
    const refEmail = useRef(profile.email)
    const refPhone = useRef(profile.phoneNumber)

    const updateUserClickHandler = async () => {

        const user = {
            ...profile,
            name: refName.current.value,
            username: refUsername.current.value,
            password: refPassword.current.value,
            bio: refBio.current.value,
            email: refEmail.current.value,
            phoneNumber: refPhone.current.value,
        }

        try {
            await editUser(user)
            navigate('/profile')
        } catch (e) {
            alert("Updating User Failed. " +
                "If you updated your email, check to make sure you do not have " +
                "another account associated with new email.")
        }

    }

/*    const adminResponse = (e) => {
        const adminValue = (e.target.value === "yes");
       setProfile({
            ...profile,
            admin: adminValue
        })
    }*/
    const goBack = () => {
        navigate("/profile")
    }
    return(
        <div>
            <div className="mb-3 row">
                <div className="col-sm-2 col-form-label">
                    <i className="fa-solid fa-arrow-left ps-3 col-1 white-text" onClick={goBack}/>
                </div>
                <div className="col-sm-10">
                    <h5>Edit Your Account</h5>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name</label>
                <div className="col-sm-10">
                    <input ref={refName} type="text" className="form-control"
                           id="name" placeholder="John Appleseed" defaultValue={refName.current} required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="handle" className="col-sm-2 col-form-label">
                    Username</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="handle" placeholder="johnnyappleseed"
                           ref={refUsername} defaultValue={refUsername.current} required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password</label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control"
                           id="password" ref={refPassword}
                           defaultValue={refPassword.current} required/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="email1" className="col-sm-2 col-form-label">
                    Email</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="email1" placeholder="username@email.com"
                           ref={refEmail} defaultValue={refEmail.current} required/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="phonenum" className="col-sm-2 col-form-label">
                    Phone Number</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"
                           id="phonenum" placeholder="(xxx)xxx-xxxx"
                           ref={refPhone} defaultValue={refPhone.current} required/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="textarea1" className="col-sm-2 col-form-label">
                    Bio</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="textarea1" rows="3"
                               ref={refBio} defaultValue={refBio.current}/>
                </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={ updateUserClickHandler}>
                Update User
            </button>
        </div>
    );
}

export default EditProfile;