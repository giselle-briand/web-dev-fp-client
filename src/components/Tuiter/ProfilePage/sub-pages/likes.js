import React, {useEffect, useState} from "react";
import axios from "axios";
import {findLikedTuitsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import { useOutletContext} from "react-router-dom";

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
                       liked_tuits: [],
                       verified: true,
                       email: "rosanwang@yahoo.com",
                       phoneNumber: "",
                       admin: false
                   }
               }) => {

    const [likes, setLikes] = useState([])

    user = useOutletContext()

/*    const findUser = async () => {
        if (typeof username === "undefined") {
            const {profile} = useProfile()
            return profile;
        } else {
            return await findUserByCredentials(username);
        }
    }*/

    const findMyLikes = async () => {
        const likes = await findLikedTuitsByUserId(user._id)
        setLikes(likes)
        console.log(likes)
    }

    useEffect(() => {
        findMyLikes()
    }, [])


    return(
        <ul className="list-group">
            {
                likes && likes.slice(0).reverse().map(like =>
                    <Tuit givenTuit={like}/>
                )
            }
        </ul>
    )
}

export default Likes;
