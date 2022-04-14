import React from "react";
import '../../../css/profile.css'
import TuitList from "../../Tuiter/TuitList";
import {useSelector} from "react-redux";

const ProfilePage = () => {
    //const who = useSelector((state) => state.who)
    return(
        <div className="container-fluid">
            <div className="up-down-padding row">
                <div className="col-1 d-flex align-items-center">
                    <i className="fa-solid fa-arrow-left ps-3 col-1 white-text"/>
                </div>
                <div className="ps-5 inline col-11">
                    <div className="bold white-text">rosan wang</div>
                    <div className="white-text">0 tweets</div>
                </div>
            </div>
            <img className="background-pic" src="../../../media/fall.png"/>
            <img className="pfp" src="../../../media/profileimage.jpg"/>

            <div className="username-text-align bold">rosan wang</div>
            <div className="username-text-align">@WangRosan</div>
            <div className="username-text-align up-down-padding">Hi! Welcome to my Bio!</div>
            <div className="username-text-align">
                <span> <span className="bold">1</span> Following</span>
                <span> <span className="bold">1</span> Follower</span>
            </div>

            <div className="nav nav-tabs nav-fill" >
                <div className="nav-item">
                    <a className="nav-link active" href="for-you.html">Tweets</a>
                </div>
                <div className="nav-item col-3">
                    <a className="nav-link" href="trending.html">Tweets & replies</a>
                </div>
                <div className="nav-item col-3">
                    <a className="nav-link" href="news.html">Media</a>
                </div>
                <div className="nav-item col-3">
                    <a className="nav-link" href="sports.html">Likes</a>
                </div>
            </div>

            <TuitList/>
        </div>
    );
}
//Add filter operation based on link selected
export default ProfilePage;
//<WhoToFollowListItem who={who}/>