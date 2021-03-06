import React from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";

const ProfileItem = ({
                                   user = {
                                       name: "Name",
                                       username: "username",
                                       password: "",
                                       avatar_image: "../../../media/profileimage.jpg",
                                       header: "../../../media/fall.png",
                                       bio: "Hi! Welcome to my Bio!",
                                       followerCount: 1,
                                       followingCount: 1,
                                       followers: [],
                                       following: [],
                                       liked_tuits: [],
                                       verified: true,
                                       email: "user@yahoo.com",
                                       phoneNumber: "",
                                       admin: false
                                   }
                               }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const goToProfile = async () => {
        navigate(`/profile/${user.username}`, {state: {aUser: user, previous_path: location.pathname}})
    }

    return (
        <div className="row ps-3 pe-3 m-0">
            <div className="d-flex col-2 col-sm-1 p-0 justify-content-center">
                <img src={user['avatar-image']} className="wd-avatar-image wd-cursor-pointer" onClick={() => goToProfile()}/>
            </div>
            <div className="col-10 col-sm-11 ps-sm-4 pe-md-0 mb-2">
                <div className="d-inline-flex justify-content-between w-100 wd-cursor-pointer" onClick={() => goToProfile()}>
                    <h6 className="fw-bold m-0 ps-2">{user.name}
                        <span><i className={`${user.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span>
                    </h6>
                </div>
                <div>
                    <p className="fw-light text-secondary ps-2">
                        @{user.username}
                    </p>
                </div>
            </div>
            <hr/>
        </div>

    )
};

export default ProfileItem;