import React from "react";
import WhoToFollowListItem from "./WhoToFollowListItem";
import whos from "./who.json";

const WhoToFollowList = () => {
    return(
        <div>
            <div className="list-group">
                <li className="list-group-item wd-suggested-follows-primary-text">Who to follow</li>
                    {
                        whos.map(who => {
                            return(
                                <WhoToFollowListItem who={who}/>
                            );
                    })
            }
            </div>
        </div>
    );
}
export default WhoToFollowList;