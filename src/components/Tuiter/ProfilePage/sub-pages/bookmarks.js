import React, {useEffect, useState} from "react";
import {useProfile} from "../../../../contexts/profile-context";
//import {findCommentsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {Link, useLocation} from "react-router-dom";

const Bookmarks = ({
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
                           liked_tuits: [],
                           verified: true,
                           email: "rosanwang@yahoo.com",
                           phoneNumber: String
                       }
                   }) => {
    const {profile} = useProfile()
    const [bookmarks, setBookmarks] = useState([])
    const location = useLocation()
    const s = location.state

    if (location.pathname === "/profile/bookmarks") {
        user = profile;
    } else {
        user = s.aUser;
    }

  /*  const findMyComments = async () => {
        const comments = await findCommentsByUserId(user._id)
        setComments(comments)
    }

    useEffect(() => {
        findMyComments()
    }, [])*/


    return(
        <ul className="list-group">
            bookmarks
        </ul>

    )
};

export default Bookmarks;
