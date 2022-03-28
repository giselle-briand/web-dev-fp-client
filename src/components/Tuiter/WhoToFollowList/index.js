import React from "react";
import WhoToFollowListItem from "./WhoToFollowListItem";
import {useSelector} from "react-redux";

const WhoToFollowList = () => {
    const who = useSelector((state) => state.who)
    return(
            <div className="list-group">
                <li className="list-group-item wd-suggested-follows-primary-text">Who to follow</li>
                    {
                        who.map(who => {
                            return(
                                <WhoToFollowListItem who={who}/>
                            );
                    })
            }
            </div>
    );
}
export default WhoToFollowList;