import React from "react";
import {Link} from "react-router-dom";

const ProfileNavigation = (
    {
        active = ''
    }
) => {

    return(
        <>
            <div className="nav nav-tabs nav-fill" >
                <div className={`nav-item col-3 ${active === '' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/profile">Tweets</Link>
                </div>
                <div className={`nav-item col-3 ${active === 'comments' ? 'active' : ''}`}>
                    <Link className="nav-link"
                          to="/profile/comments">Comments</Link>
                </div>
                <div className={`nav-item col-3 ${active === 'likes' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/profile/likes">Likes</Link>
                </div>
            </div>
        </>
    );
}
export default ProfileNavigation;
