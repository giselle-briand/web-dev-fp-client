import React, {useEffect, useState} from "react";
import {useProfile} from "../../../../contexts/profile-context";
//import {findCommentsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {Link} from "react-router-dom";

const Bookmarks = () => {
    const {profile} = useProfile()
    const [bookmarks, setBookmarks] = useState([])

  /*  const findMyComments = async () => {
        const comments = await findCommentsByUserId(profile._id)
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
