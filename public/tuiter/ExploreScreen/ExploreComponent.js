import PostSummaryList from "../PostSummaryList/index.js";

const ExploreComponent = () => {
    return(`
           <form id="search-tuiter-form">
                <label for="search-tuiter" class="wd-search-bar mb-2">
                    <i class="fa-solid fa-magnifying-glass wd-search-icon"></i>
                    <input id="search-tuiter" class="wd-search-bar-content wd-search-bar" placeholder="Search Tuiter"/>
                </label>
                <a href="explore-settings.html"><i class="fa-solid fa-gear wd-gear-icon"></i></a>
           </form>
           <ul class="nav nav-tabs wd-explore-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="for-you.html">For You</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="trending.html">Trending</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="news.html">News</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="sports.html">Sports</a>
                </li>
                <li class="nav-item d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none">
                    <a class="nav-link" href="entertainment.html">Entertainment</a>
                </li>
           </ul>
           <div>
                <img src="../media/starship.jpg" class="wd-explore-image">
                <h3 class="wd-covere-image-title">SpaceX's Starship</h3>
           </div>
           ${PostSummaryList()}
    `);
}
export default ExploreComponent;
