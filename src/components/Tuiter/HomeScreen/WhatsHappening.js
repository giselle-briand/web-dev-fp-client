import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createTuit} from "../actions/tuits-actions";
import {useProfile} from "../../../contexts/profile-context";

const WhatsHappening = () => {
    const {profile} = useProfile()

    const dispatch = useDispatch();
    const [newTuit, setNewTuit] = useState({tuit: 'New tuit'});

    return (
        <div>
            <div className="wd-float-left wd-write-tuit-avatar-width">
                <img src={`${profile["avatar-image"]}`} className="wd-avatar-image wd-write-tuit-avatar"/>
            </div>
            <div className="wd-float-right wd-tuit-texarea-width">
                <textarea className="wd-tuit-textarea-home"
                          placeholder="What's happening?"
                          onChange={(e) =>
                              setNewTuit({
                                  ...newTuit,
                                  tuit: e.target.value
                              })}/>
                <hr/>
                <div className="wd-float-left">
                    <a href="#"><i className="fa fa-image wd-icon-spacing"/></a>
                    <a href="#" ><i className="fa fa-chart-bar wd-icon-spacing"/></a>
                    <a href="#"><i className="fa fa-grin wd-icon-spacing"/></a>
                    <a href="#"><i className="fa fa-calendar wd-icon-spacing"/></a>
                </div>
                    <button className="btn btn-primary wd-tuit-override-button-home col-12"
                            onClick={() => createTuit(dispatch, profile._id, newTuit)}>
                        Tuit
                    </button>
                </div>
        </div>
    );
}
export default WhatsHappening;