import React from "react";

const NavigationSidebar = (
    {
        active = 'explore'
    }
) => {
    return(
        <>
            <div className="list-group">
                <div className="list-group-item"><i className="fa-brands fa-twitter"/></div>
                <a href="../home.html" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <i className="fa-solid fa-house-chimney wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Home</div>
                </a>
                <a href="../ExploreScreen/explore.html" className={`list-group-item list-group-item-action ${active === 'explore' ? 'active' : ''}`}>
                    <i className="fa-solid fa-hashtag wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Explore</div>
                </a>
                <a href="../notifications.html" className={`list-group-item list-group-item-action ${active === 'notifications' ? 'active' : ''}`}>
                    <i className="fa-solid fa-bell wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Notifications</div>
                </a>
                <a href="../messages.html" className={`list-group-item list-group-item-action ${active === 'messages' ? 'active' : ''}`}>
                    <i className="fa-solid fa-envelope wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Messages</div>
                </a>
                <a href="../bookmarks.html" className={`list-group-item list-group-item-action ${active === 'bookmarks' ? 'active' : ''}`}>
                    <i className="fa-solid fa-bookmark wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Bookmarks</div>
                </a>
                <a href="../lists.html" className={`list-group-item list-group-item-action ${active === 'lists' ? 'active' : ''}`}>
                    <i className="fa-solid fa-list wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Lists</div>
                </a>
                <a href="../profile.html" className={`list-group-item list-group-item-action ${active === 'profile' ? 'active' : ''}`}>
                    <i className="fa-solid fa-user wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Profile</div>
                </a>
                <a href="../more.html" className={`list-group-item list-group-item-action ${active === 'more' ? 'active' : ''}`}>
                    <span className="fa-stack wd-span-more-padding wd-float-left pt-1 pe-1">
                        <i className="fa-solid fa-circle fa-stack-1x"/>
                        <i className="fa-solid fa-ellipsis fa-stack-1x fa-inverse"/>
                    </span>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">More</div>
                </a>

            </div>
            <a href="../tuit.html" className="btn btn-primary wd-override-bs-tuit col-xxl-12 col-md-4 col-lg-2 col-xl-12" type="button">
                Tuit
            </a>
        </>
    );
}
export default NavigationSidebar;
