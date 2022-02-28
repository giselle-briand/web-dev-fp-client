import React from "react";
import PostSummaryList from "../PostSummaryList";

const ExploreComponent = () => {
    return(
        <div>
           <form id="search-tuiter-form">
                <label className="wd-search-bar mb-2">
                    <i className="fa-solid fa-magnifying-glass wd-search-icon"/>
                    <input className="wd-search-bar-content wd-search-bar" placeholder="Search Tuiter"/>
                </label>
                <a href="explore-settings.html"><i className="fa-solid fa-gear wd-gear-icon"/></a>
           </form>
           <ul className="nav nav-tabs wd-explore-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="for-you.html">For You</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="trending.html">Trending</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="news.html">News</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="sports.html">Sports</a>
                </li>
                <li className="nav-item d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none">
                    <a className="nav-link" href="entertainment.html">Entertainment</a>
                </li>
           </ul>
           <div>
                <img src="../../../media/starship.jpg" className="wd-explore-image"/>
                <h3 className="wd-covere-image-title">SpaceX's Starship</h3>
           </div>
           <PostSummaryList/>
        </div>
    );
}
export default ExploreComponent;
