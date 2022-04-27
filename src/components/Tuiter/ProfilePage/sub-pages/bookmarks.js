import React, {useEffect, useState} from "react";
import {useProfile} from "../../../../contexts/profile-context";
import {findBookmarksByUserId} from "../../../services/users-service";
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
        setBookmarks(bookmarks)
    }

    useEffect(() => {
        findMyBookmarks()
    }, [])


    return(
        <ul className="list-group">
            {
                bookmarks && bookmarks.map(bookmark =>
                    <li className="list-group-item">
                        <Tuit tuit={bookmark}/>
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

export default Bookmarks;
