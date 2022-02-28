import React from "react";

const PostSummaryItem = (
    {
        post = {
            "topic": "Web Development",
            "userName": "ReactJS",
            "time": "2h",
            "title": "React.js is a component based front end library that makes it very easy to build Single Page Applications or SPAs",
            "image": "../../../media/react.png"
        }
    }
) => {
    return(
        <div>
            <li className="list-group-item wd-suggested-follows-primary-text">
                <img src={post.image} className="wd-float-right wd-tuit-image-icons"/>
                <div className="wd-for-you-topics-and-tuit-count">
                    {post.topic}
                </div>
                <div className="wd-tuit-author">{post.userName} <i className="fa-solid fa-circle-check"/></div>
                <div className="wd-for-you-topics-and-tuit-count">- {post.time}</div>
                {post.title}
            </li>
        </div>
    );
}
export default PostSummaryItem;