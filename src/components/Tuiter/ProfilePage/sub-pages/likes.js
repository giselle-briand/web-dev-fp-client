import React, {useEffect, useState} from "react";
import axios from "axios";
import {useProfile} from "../../../../contexts/profile-context";
import {findLikedTuitsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {useLocation} from "react-router-dom";

const Likes = ({
                   user = {
                       name: "rosan wang",
                       username: "WangRosan",
                       password: "",
                       avatar_image: "../../../media/profileimage.jpg",
                       header: "../../../media/fall.png",
                       bio: "Hi! Welcome to my Bio!",
                       followerCount: 1,
                       followingCount: 1,
                       followers: [],
                       following: [],
                       loggedIn: Boolean,
                       tuits: [],
                       comments: [],
                       tuitsCount: 0,
                       likes: [],
                       email: "rosanwang@yahoo.com",
                       phoneNumber: String
                   }
               }
) => {
    const {profile} = useProfile()
    const [likes, setLikes] = useState([])
    const location = useLocation()
    const s = location.state

    if (location.pathname === "/profile/likes") {
        user = profile;
    } else {
        user = s.aUser;
    }

    const findMyLikes = async () => {
        const likes = await findLikedTuitsByUserId(user._id)
        setLikes(likes)
    }

    useEffect(() => {
        findMyLikes()
    }, [])


    return(
        <ul className="list-group">
            {
                likes && likes.map(likes =>
                    <li className="list-group-item">
                        <Tuit tuit={likes}/>
                        {/*                        <Link to={`/omdb/details/${comment.imdbID}`}>
                            {comment && comment.comment}
                            {comment.imdbID}
                        </Link>*/}
                    </li>
                )
            }
        </ul>
    )
};

export default Likes;
