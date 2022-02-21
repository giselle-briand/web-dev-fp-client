import WhoToFollowListItem from "./WhoToFollowListItem.js";
import whos from "./who.js";
const WhoToFollowList = () => {
    return(`
        <div class="list-group">
        <li class="list-group-item wd-suggested-follows-primary-text">Who to follow</li>
            ${
        whos.map(who => {
            return(WhoToFollowListItem(who));
        }).join('')
    }
        </div>
    `);
}
export default WhoToFollowList;