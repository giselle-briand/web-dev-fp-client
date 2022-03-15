import React, {useState} from "react";
import {useDispatch} from "react-redux";

const WhatsHappening = () => {
    let [whatsHappening, setWhatsHappening]
        = useState('');
    const dispatch = useDispatch();
    const tuitClickHandler = () => {
        dispatch({type: 'create-tuit',
            tuit: whatsHappening
        });
    }
    return (
        <div>
            <div className="wd-float-left wd-write-tuit-avatar-width">
                <img src="../../../media/profileimage.jpg" className="wd-avatar-image wd-write-tuit-avatar"/>
            </div>
            <div className="wd-float-right wd-tuit-texarea-width">
                <textarea className="wd-tuit-textarea-home"
                          placeholder="What's happening?"
                          value={whatsHappening}
                          onChange={(event) => setWhatsHappening(event.target.value)}/>
                <hr/>
                <div className="wd-float-left">
                    <a href="#"><i className="fa fa-image wd-icon-spacing"/></a>
                    <a href="#" ><i className="fa fa-chart-bar wd-icon-spacing"/></a>
                    <a href="#"><i className="fa fa-grin wd-icon-spacing"/></a>
                    <a href="#"><i className="fa fa-calendar wd-icon-spacing"/></a>
                </div>
                <button className="btn btn-primary wd-tuit-override-button-home col-12"
                    onClick={tuitClickHandler}>
                    Tuit
                </button>
            </div>
        </div>
    );
}
export default WhatsHappening;