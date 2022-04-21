import React, {useEffect, useRef, useState} from "react";
import PostSummaryList from "../PostSummaryList";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
const tumblr = require('tumblr.js');

const Search = () => {
    const [posts, setPosts] = useState([])
    const {searchString} = useParams()
    const tagRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()

    const client = tumblr.createClient({ consumer_key: 'aVWxuentDtiSQRwKjIv7rJtkeWRuslHqOMe5Sqkgubo2cyZ2No' });

    const searchPostsByKeyword = async () => {
        client.taggedPosts(tagRef.current.value, function (err, data) {
            console.log(data);
            setPosts(data)
            navigate(`/search/${tagRef.current.value}`)
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
            <label className="wd-search-bar mb-2">
                <i className="fa-solid fa-magnifying-glass wd-search-icon"/>
                <input ref={tagRef} className="wd-search-bar-content wd-search-bar" placeholder="Search Tuiter"/>
            </label>
            <button
                onClick={searchPostsByKeyword}
                className="btn btn-primary float-end">
                Search
            </button>
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
                        <li className="list-group-item">
                            <Link to={`/search/details/${post.id_string}`}>
                                {post.blog.title}
                            </Link>
                        </li>
                    )
                }
            </div>
        </div>
    );
}
export default Search;
