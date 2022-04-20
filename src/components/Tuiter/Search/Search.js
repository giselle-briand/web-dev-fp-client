import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Pre from "./pre"
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
const tumblr = require('tumblr.js');

const SearchTumblr = () => {
    const [posts, setPosts] = useState([])
    const {searchString} = useParams()
    const tagRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()

    const client = tumblr.createClient({ consumer_key: 'aVWxuentDtiSQRwKjIv7rJtkeWRuslHqOMe5Sqkgubo2cyZ2No' });

    // const OMDB_URL = 'https://www.omdbapi.com/?apikey=852159f0&s'
    // full Tumblr URL: https://api.tumblr.com/v2/blog/text?api_key={key}/tagged?tag={keyword}
    // const TUMBLR_URL = 'https://api.tumblr.com/v2/blog/'
    const TUMBLR_URL = 'https://api.tumblr.com/v2/text?api_key=aVWxuentDtiSQRwKjIv7rJtkeWRuslHqOMe5Sqkgubo2cyZ2No/tagged?tag'
    // const TUMBLR_KEY = ''

    // const searchPostsByKeyword = async () => {
    //     client.taggedPosts(tagRef.current.value, function (err, data) {
    //         console.log(data);
    //         setPosts(data.responseText)
    //         navigate(`/search/${tagRef.current.value}`)
    //     });
    // }
    // useEffect(() => {
    //     if(searchString) {
    //         tagRef.current.value = searchString
    //         searchPostsByKeyword()
    //     }
    // }, [])
    return (
        <div>
            <h1>Search Tumblr</h1>

            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        // onClick={searchPostsByKeyword}
                        className="btn btn-primary float-end">
                        Search
                    </button>
                    <input ref={tagRef}
                           className="form-control w-75"/>
                </li>
                {/*{*/}
                {/*    posts.map(post =>*/}
                {/*        <li className="list-group-item">*/}
                {/*            <Link to={`/search/details/${post.id_string}`}>*/}
                {/*                {post.blog.title}*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*    )*/}
                {/*}*/}
            </ul>

            <Pre obj={posts}/>
        </div>
    );
};

export default SearchTumblr;