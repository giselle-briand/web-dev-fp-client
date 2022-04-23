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

    const client = tumblr.createClient({ consumer_key: 'aVWxuentDtiSQRwKjIv7rJtkeWRuslHqOMe5Sqkgubo2cyZ2No' });
    let post_id;
    const searchPostsByKeyword = async () => {
        client.taggedPosts(tagRef.current.value, function (err, data) {
            // console.log(data);
            setPosts([]);
            const filteredData = data.filter(postToCheck => postToCheck.summary !== "");
            filteredData.map(updatedPost => {
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
                } else {
                    updatedPost.name = duplicatePost.blog.title;
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
                }
                catch (TypeError){
                    updatedPost["avatar-image"] = "../media/emptypp.webp"
                }
                if (duplicatePost.type === "photo") {
                    updatedPost.image = duplicatePost.photos[0].original_size.url;
                }
                setPosts(oldPosts =>([...oldPosts, updatedPost]));
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
                        // <li className="list-group-item" >
                    <div>
                            <Tuit tuit={post}/>
                    </div>)}
                        {/*<Link to={`/search/details/${post.id_string}`}>*/}
                        {/*    {post.blog.title}*/}
                        {/*</Link>*/}
                        {/*</li>*/}
                    {/*)*/}
                {/*}*/}
            </div>
        </div>
    );
}
export default Search;
