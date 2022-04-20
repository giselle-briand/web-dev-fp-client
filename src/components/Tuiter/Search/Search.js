import React, {useEffect, useRef, useState} from 'react';
// import axios from "axios";
// import Pre from "../utils/pre";
import TwitterApi from 'twitter-api-v2';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

const SearchTwitter = () => {
    const [tweets, setTweets] = useState([])
    const {searchString} = useParams()
    const titleRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const client = new TwitterApi({
        appKey: 'SDERcQWl5NZFUulRDQiYwqwU3',
        appSecret: 'QKLxrpwjfN2ZaZdZngb8x9TmyX13Of7Y5Cf2jvCwEaUUbxXkVi',
        accessToken: '1400104361230061568-qDCW73WVU3yfiivXCZ55eCVjNmMT6p',
        accessSecret: 'yk3w0gHIlwnXHbiSVvH2wG4bfJIA8GXAzoxxzUVw9rEum',
    });
    // const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAACb7bAEAAAAAMAZuDQua10e%2Fg9KaiBHbZhAeXdA%3DLjlrb4ole3eFgE3lMpdQFW2RRFyWsfBFq5HB5my9GJHGMC2d3O');
    // const TWITTER_URL = 'https://'
    //const OMDB_URL = 'https://www.omdbapi.com/?apikey=852159f0&s'
    const searchMoviesByTitle = async () => {
        const jsTweets = await client.v2.searchAll('JavaScript', { 'media.fields': 'url' });
        // Consume fetched tweet from first page of jsTweets
        for (const tweet of jsTweets) {
            console.log(tweet);
        }
        // const response = await axios.get(`${OMDB_URL}=${titleRef.current.value}`)
        // setMovies(response.data.Search)
        // navigate(`/omdb/${titleRef.current.value}`)
    }
    // useEffect(() => {
    //     if(searchString) {
    //         titleRef.current.value = searchString
    //         searchMoviesByTitle()
    //     }
    // }, [])
    return (
        <button onClick={searchMoviesByTitle}>
            Search
        </button>
        // <div>
        //     <h1>Search Omdb</h1>
        //
        //     <ul className="list-group">
        //         <li className="list-group-item">
        //             <button
        //                 onClick={searchMoviesByTitle}
        //                 className="btn btn-primary float-end">
        //                 Search
        //             </button>
        //             <input ref={titleRef}
        //                    className="form-control w-75"/>
        //         </li>
        //         {
        //             movies.map(movie =>
        //                 <li className="list-group-item">
        //                     <Link to={`/omdb/details/${movie.imdbID}`}>
        //                         <img src={movie.Poster} height={30}
        //                              className="me-2"/>
        //                         {movie.Title}
        //                     </Link>
        //                 </li>
        //             )
        //         }
        //     </ul>
        //
        //     <Pre obj={movies}/>
        // </div>
    );
};

export default SearchTwitter;