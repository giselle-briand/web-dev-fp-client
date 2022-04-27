import React, {useEffect, useState} from "react";
import {findCommentsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {Link, useLocation, useOutletContext} from "react-router-dom";

const Posts = ({
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

    const [comments, setComments] = useState([])
/*    const location = useLocation()
    const s = location.state
    if (location.pathname === "/profile") {
        user = profile;
    } else {
        user = s.aUser;
    }*/

    user = useOutletContext()

    const findMyComments = async () => {
        const comments = await findCommentsByUserId(user._id)
        comments.reverse()
        setComments(comments)
    }

    useEffect(() => {
        findMyComments()
    }, [])


    return(
        <ul className="list-group">
            {
                comments && comments.map(comment =>
                    <Tuit tuit={comment}/>
                )
            }
        </ul>
    )
};

export default Posts;
