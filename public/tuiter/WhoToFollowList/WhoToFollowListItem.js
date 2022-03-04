const WhoToFollowListItem = (who) => {
    return(`
            <li class="list-group-item wd-suggested-follows-primary-text">
                <button class="btn btn-primary wd-override-bs-follow" type="button">
                    Follow
                </button>
                <img src=${who.avatarIcon} class="wd-avatar-image">
                <div class="wd-suggested-follows-account-name">
                    ${who.userName}
                    <i class="fa-solid fa-circle-check wd-verified-check"></i>
                </div>
                <div class="wd-suggested-follows-account-handle">
                    @${who.handle}
                </div>
            </li>
    `);
}
export default WhoToFollowListItem;