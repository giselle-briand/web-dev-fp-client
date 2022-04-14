import React from "react";
import '../../../css/profile.css'
import TuitList from "../../Tuiter/TuitList";
import {useSelector} from "react-redux";

const ProfilePage = () => {
    //const who = useSelector((state) => state.who)
    return(
        <div className="container-fluid">
            <div className="up-down-padding">
                <i class="fa-solid fa-arrow-left fa-lg left-padding-small col-1"> </i>
                    <div className="left-padding-big inline col-2">
                        <div className="bold white-text">rosan wang</div>
                        <div className="bold white-text"> rosan wang</div>
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

            <ul className="full-width nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="for-you.html">Tweets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="trending.html">Tweets & replies</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="news.html">Media</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="sports.html">Likes</a>
                </li>
            </ul>

            <TuitList/>
        </div>
    );
}
//Add filter operation based on link selected
export default ProfilePage;
//<WhoToFollowListItem who={who}/>