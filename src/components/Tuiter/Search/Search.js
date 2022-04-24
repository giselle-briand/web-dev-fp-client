import React, {useEffect, useRef, useState} from "react";
import PostSummaryList from "../PostSummaryList";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Tuit from "../Tuit";
const tumblr = require('tumblr.js');

const Search = () => {
    const [posts, setPosts] = useState([])
    const {searchString} = useParams()
    const tagRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    // const [user, setUser] = useState({
    //     name: "",
    //     username: "",
    //     password: "",
    //     bio: "",
    //     email: "",
    //     phone_num: "",
    //     "avatar-image": ""
    // });
    const client = tumblr.createClient({ consumer_key: 'aVWxuentDtiSQRwKjIv7rJtkeWRuslHqOMe5Sqkgubo2cyZ2No' });
    const searchPostsByKeyword = async () => {
        client.taggedPosts(tagRef.current.value, function (err, data) {
            setPosts([]);
            const filteredData = data.filter(postToCheck => postToCheck.summary !== "");
            filteredData.map(updatedPost => {
                let profpic;
                let profname;
                const duplicatePost = updatedPost;
                updatedPost = {}
                updatedPost["api-post-id"] = duplicatePost.id_string;
                updatedPost.tuit = duplicatePost.summary;
                updatedPost.likes = duplicatePost.note_count;
                updatedPost.dislikes = 0;
                updatedPost.comments = 0;
                updatedPost.retuits = 0;
                updatedPost.liked = false;
                updatedPost.disliked = false;
                updatedPost.username = duplicatePost.blog.name;
                if (duplicatePost.blog.title === "") {
                    updatedPost.name = duplicatePost.blog.name
                    profname = duplicatePost.blog.name;
                } else {
                    updatedPost.name = duplicatePost.blog.title;
                    profname = duplicatePost.blog.title;
                }
                updatedPost.verified = false;
                updatedPost.time = "";
                updatedPost.date = {}
                updatedPost.date.day = duplicatePost.date.substring(8,10);
                updatedPost.date.month = duplicatePost.date.substring(5, 7);
                updatedPost.date.year = duplicatePost.date.substring(0, 4);
                updatedPost.date.time = duplicatePost.date.substring(11, 16);
                try {
                    updatedPost["avatar-image"] = duplicatePost.trail[0].blog.theme.header_image;
                    profpic = duplicatePost.trail[0].blog.theme.header_image;
                }
                catch (TypeError){
                    updatedPost["avatar-image"] = "../media/emptypp.webp"
                    profpic = "../media/emptypp.webp";
                }
                if (duplicatePost.type === "photo") {
                    updatedPost.image = duplicatePost.photos[0].original_size.url;
                }
                const user = {
                    email: duplicatePost.blog_name.concat("@mail.com"),
                    password: duplicatePost.reblog_key,
                    username: duplicatePost.blog.name,
                    "avatar-image": profpic,
                    bio: duplicatePost.blog.description,
                    name: profname
                };
                console.log("new user:")
                console.log(user)
                setPosts(oldPosts =>([...oldPosts, {post: updatedPost, u: user}]));
                console.log("posts:")
                console.log(posts)
            })

            navigate(`/search/${tagRef.current.value}`);
            const landingContentDiv = document.getElementById("landing-content");
            const searchContentDiv = document.getElementById("search-content");
            if (landingContentDiv.style.display !== "none") {
                landingContentDiv.style.display = "none";
                searchContentDiv.style.display = "block";
            }
        });
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
