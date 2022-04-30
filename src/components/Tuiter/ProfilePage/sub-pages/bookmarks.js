import React, {useEffect, useState} from "react";
import {useProfile} from "../../../../contexts/profile-context";
import {findBookmarksByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {useLocation} from "react-router-dom";

const Bookmarks = ({
                       user = {
                           name: "Name",
                           username: "username",
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
                           email: "user@yahoo.com",
                           phoneNumber: String
                       }
                   }) => {
    const {profileState} = useProfile()
    const [profile,] = profileState
    const [bookmarks, setBookmarks] = useState([])
    const location = useLocation()
    const s = location.state

    if (location.pathname === "/profile/bookmarks") {
        user = profile;
    } else {
        user = s.aUser;
    }

    const findMyBookmarks = async () => {
        const bookmarks = await findBookmarksByUserId(user._id)
        bookmarks.reverse()
        setBookmarks(bookmarks)
    }

    useEffect(() => {
        findMyBookmarks()
    }, [])

    return(

        <ul className="list-group">
            {
                bookmarks.length === 0 && <h6 className="fw-bold m-6">No bookmarks yet.</h6>
            }
            {
                bookmarks && bookmarks.map(bookmark =>
                        <Tuit givenTuit={bookmark}/>
                )
            }
        </ul>

    )
};

export default Bookmarks;
