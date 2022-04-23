import React, {useEffect, useState} from "react";
import {useProfile} from "../../../../contexts/profile-context";
import {findCommentsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {Link} from "react-router-dom";

const Comments = () => {
    const {profile} = useProfile()
    const [comments, setComments] = useState([])

    const findMyComments = async () => {
        const comments = await findCommentsByUserId(profile._id)
        setComments(comments)
    }

    useEffect(() => {
        findMyComments()
    }, [])


    return(
        <ul className="list-group">
            {
                comments && comments.map(comment =>
                    <li className="list-group-item">
                        <Tuit tuit={comment}/>
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

export default Comments;
