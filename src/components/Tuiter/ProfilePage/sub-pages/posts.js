import React, {useEffect, useState} from "react";
import {findCommentsByUserId} from "../../../services/users-service";
import Tuit from "../../Tuit";
import {Link, useLocation, useOutletContext} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findAllTuits} from "../../actions/tuits-actions";

const Posts = ({
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

    const [comments, setComments] = useState([])
/*    const location = useLocation()
    const s = location.state
    if (location.pathname === "/profile") {
        user = profile;
    } else {
        user = s.aUser;
    }*/
    // let posts = useSelector((state) => state.tuits);
    // const dispatch = useDispatch();
    // useEffect(() => findAllTuits(dispatch, profile), []);

    user = useOutletContext()
    // const comments = useSelector((state) => state)
    const findMyComments = async () => {
        const comments = await findCommentsByUserId(user._id)
        comments.reverse()
        setComments(comments)
    }

    useEffect(() => {
        // findCommentsByUserId(user._id)
        findMyComments()
    }, [])


    return(
        <ul className="list-group">
            {
                comments.length === 0 && <h6 className="fw-bold m-6">No posts yet.</h6>
            }
            {
                comments && comments.map(comment =>
                    <Tuit givenTuit={comment}/>
                )
            }
        </ul>
    )
};

export default Posts;
