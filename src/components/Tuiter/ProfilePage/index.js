import React from "react";
import '../../../css/profile.css'
import TuitList from "../../Tuiter/TuitList";
import {useProfile} from "../../../contexts/profile-context";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProfilePage = ({
/*                         user = {
                             name: "rosan wang",
                             username: "WangRosan",
                             password: "",
                             avatar_image: "../../../media/profileimage.jpg",
                             header: "../../../media/fall.png",
                             bio: "Hi! Welcome to my Bio!",
                             followerCount: 1,
                             followingCount: 1,
                             followers: "idk",
                             following: "idk",
                             loggedIn: Boolean,
                             tuits: "idk",
                             tuitsCount: 0,
                             likes: "idk",
                             email: "rosanwang@yahoo.com",
                             phoneNumber: String
                         }*/
                     }) => {
    //const who = useSelector((state) => state.who)
    const {profile, signout} = useProfile()
    const navigate = useNavigate()

    //TODO implement logout button
    const logout = async () => {
        try {
            await signout()
        } catch (e) {

        }
        navigate('/signup')
    }


    const user = profile

    return(
        <div className="container-fluid">
            <div className="up-down-padding row">
                <div className="col-1 d-flex align-items-center">
                    <i className="fa-solid fa-arrow-left ps-3 col-1 white-text"/>
                </div>
                <div className="ps-5 inline col-11">
                    <div className="bold white-text">{user.name}</div>
                    <div className="white-text">{user.tuitsCount} tweets</div>
                </div>
            </div>
            <img className="background-pic" src={user.header}/>
            <img className="pfp" src={user.avatar_image}/>

            <div className="username-text-align bold">{user.name}</div>
            <div className="username-text-align">@{user.username}</div>
            <div className="username-text-align up-down-padding">{user.bio}</div>
            <div className="username-text-align">
                <span> <span className="bold">{user.followingCount}</span> Following</span>
                <span> <span className="bold">{user.followerCount}</span> Follower</span>
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