import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createTuit} from "../actions/tuits-actions";
import {useProfile} from "../../../contexts/profile-context";

const WhatsHappening = () => {
    const {profileState} = useProfile()
    const [profile, setProfile] = profileState
    const dispatch = useDispatch();
    const [newTuit, setNewTuit] = useState({tuit: 'New tuit'});

    const makeTuit = async () => {
        //await createTuit(dispatch, profile._id, newTuit)
        await createTuit(dispatch, profile._id, newTuit)
        const textbox = document.getElementById("textarea")
        textbox.value = "";
    }
    return (
        <div >
            {/* <div className="wd-float-left wd-write-tuit-avatar-width"> */}
            <div className="d-flex justify-content-between ps-3 pe-3">
                <div className="">
                    <img src={`${profile["avatar-image"]}`} className="wd-avatar-image"/>
                </div>
                <div className="w-100">
                    <textarea id="textarea"
                                className="bg-black w-100 ms-3 border-0 text-white"
                                placeholder="What's happening?"
                                onChange={(e) =>
                                    setNewTuit({
                                        ...newTuit,
                                        tuit: e.target.value
                                    })}/>
                </div>
            </div>
            <hr/>
            {/* <div className="wd-float-right wd-tuit-texarea-width"> */}
            <div className="ps-3 pe-3">
                <div className="wd-float-left">
                    <a href="#"><i className="fa fa-image wd-icon-spacing"/></a>
                    <a href="#" ><i className="fa fa-chart-bar wd-icon-spacing"/></a>
                    <a href="#"><i className="fa fa-grin wd-icon-spacing"/></a>
                    <a href="#"><i className="fa fa-calendar wd-icon-spacing"/></a>
                </div>
                    <button type="button" className="btn btn-primary wd-tuit-override-button-home col-12 wd-rounded-button"
                            onClick={() => makeTuit()}>

                        Tuit
                    </button>
            </div>
        </div>
    );
}
export default WhatsHappening;