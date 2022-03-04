import React from "react";

const WhoToFollowListItem = (
    {
        who = {
            avatarIcon: '../../../../media/nasa.png',
            userName: 'NASA',
            handle: 'NASA',
        }
    }
) => {
    return(
            <li className="list-group-item wd-suggested-follows-primary-text">
                <button className="btn btn-primary wd-override-bs-follow" type="button">
                    Follow
                </button>
                <img src={who.avatarIcon} className="wd-avatar-image" alt={who.avatarIcon}/>
                <div className="wd-suggested-follows-account-name">
                    {who.userName}
                    <i className="fa-solid fa-circle-check wd-verified-check"/>
                </div>
                <div className="wd-suggested-follows-account-handle">
                    @{who.handle}
                </div>
            </li>
    );
}
export default WhoToFollowListItem;