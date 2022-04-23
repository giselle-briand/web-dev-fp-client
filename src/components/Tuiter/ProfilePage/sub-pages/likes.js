import React, {useEffect, useState} from "react";
import axios from "axios";
import {useProfile} from "../../../../contexts/profile-context";
import {findLikedTuitsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";

const Likes = () => {
    const {profile} = useProfile()
    const [likes, setLikes] = useState([])

    const findMyLikes = async () => {
        const likes = await findLikedTuitsByUserId(profile._id)
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
