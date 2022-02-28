import React from "react";
import PostSummaryListItem from "./PostSummaryItem";
import posts from "./posts.json";
const PostSummaryList = () => {
    return(
        <div className="list-group wd-for-you-tuits">
            {
                posts.map(post => {
                    return(
                        <PostSummaryListItem post={post}/>
                    );
                })
            }
        </div>
    );
}
export default PostSummaryList;