import React, {useEffect, useRef, useState} from "react";
import PostSummaryList from "../PostSummaryList";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Tuit from "../Tuit";
import {findUserByCredentials} from "../../services/users-service";
import axios from "axios";
const tumblr = require('tumblr.js');

const Search = () => {
    const [posts, setPosts] = useState([])
    const {searchString} = useParams()
    const tagRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const client = tumblr.createClient({ consumer_key: 'aVWxuentDtiSQRwKjIv7rJtkeWRuslHqOMe5Sqkgubo2cyZ2No' });
    const api = axios.create({
        withCredentials: true
    })
    const checkProfpic = (updatedPost) => {
        try {
            return updatedPost.trail[0].blog.theme.header_image;
        }
        catch (TypeError){
            return "../media/emptypp.webp";
        }
    }
    const getName = (updatedPost) => {
        if (updatedPost.blog.title === "") {
            return updatedPost.blog.name;
        } else {
            return updatedPost.blog.title;
        }
    }
    const updatePost = (apiPost, profpic, profname, newUser) => {
        const duplicatePost = apiPost
        apiPost = {}
        apiPost.tuit = duplicatePost.summary;
        apiPost.likes = duplicatePost.note_count;
        apiPost.dislikes = 0;
        apiPost.comments = 0;
        apiPost.retuits = 0;
        apiPost.liked_users = [];
        apiPost.bookmarked_users = [];
        apiPost.commented_users = [];
        apiPost["api-post-id"] = duplicatePost.id_string;
        apiPost.name = profname
        apiPost.username = duplicatePost.blog.name;
        apiPost.creator = newUser._id;
        apiPost.date = {}
        apiPost.date.day = duplicatePost.date.substring(8,10);
        apiPost.date.month = duplicatePost.date.substring(5, 7);
        apiPost.date.year = duplicatePost.date.substring(0, 4);
        apiPost.date.time = duplicatePost.date.substring(11, 16);
        apiPost["avatar-image"] = profpic;
        if (duplicatePost.type === "photo") {
            apiPost.image = duplicatePost.photos[0].original_size.url;
        }
        return apiPost
    }
    const convertAPIpostToTuitAndMakeUser = async (apiPost) => {
        const profpic = checkProfpic(apiPost);
        const profname = getName(apiPost)
        const user = {
            email: apiPost.blog_name.concat("@mail.com"),
            password: apiPost.reblog_key,
            username: apiPost.blog.name,
            "avatar-image": profpic,
            bio: apiPost.blog.description,
            name: profname,
            phoneNumber: "123-456-7890",
            admin: false,
        };
        let newUser
        try {
            newUser = await findUserByCredentials(user);
        } catch (e) {
            const response = await api.post("http://localhost:4000/api/signup", user)
            newUser = response.data
        }
        const updatedPost = updatePost(apiPost, profpic, profname, newUser)
        setPosts(oldPosts =>([...oldPosts, {post: updatedPost, u: user}]));
    }
    const searchPostsByKeyword = async () => {
        try {
            client.taggedPosts(tagRef.current.value, function (err, data) {
                setPosts([]);
                const filteredData = data.filter(postToCheck => postToCheck.summary !== "");
                filteredData.map(apiPost => convertAPIpostToTuitAndMakeUser(apiPost))
                navigate(`/search/${tagRef.current.value}`);
                const landingContentDiv = document.getElementById("landing-content");
                const searchContentDiv = document.getElementById("search-content");
                if (landingContentDiv.style.display !== "none") {
                    landingContentDiv.style.display = "none";
                    searchContentDiv.style.display = "block";
                }
            })
        }
        catch (e) {
            navigate('/search')
        }
    }
    useEffect(() => {
        if(searchString) {
            tagRef.current.value = searchString
            searchPostsByKeyword()
        }
    }, [])
    return(
        <div>
            <div className="wd-search-div">
                <label className="wd-search-bar mb-2">
                    <i className="fa-solid fa-magnifying-glass wd-search-icon"/>
                    <input ref={tagRef} className="wd-search-bar-content wd-search-bar" placeholder="Search Tuiter"/>
                </label>
                <button
                    onClick={searchPostsByKeyword}
                    className="btn btn-primary float-end">
                    Search
                </button>
            </div>
            <div id="landing-content">
                <div>
                    <img src="../../../media/starship.jpg" className="wd-explore-image"/>
                    <h3 className="wd-covere-image-title">SpaceX's Starship</h3>
                </div>
                <PostSummaryList/>
            </div>
            <div id="search-content" className="list-group">
                {
                    posts.map(post =>
                        <div>
                            <Tuit tuit={post.post} user={post.u}/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Search;
