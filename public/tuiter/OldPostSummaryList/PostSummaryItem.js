const PostSummaryItem = (post) => {
    return(`
            <li class="list-group-item wd-suggested-follows-primary-text">
                <img src=${post.image} class="wd-float-right wd-tuit-image-icons">
                <div class="wd-for-you-topics-and-tuit-count">
                    ${post.topic}
                </div>
                <div class="wd-tuit-author">${post.userName} <i class="fa-solid fa-circle-check"></i></div>
                <div class="wd-for-you-topics-and-tuit-count">- ${post.time}</div>
                ${post.title}
            </li>
    `);
}
export default PostSummaryItem;