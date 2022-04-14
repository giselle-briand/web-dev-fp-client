import React from "react";

const NavigationSidebar = (
    {
        active = 'home'
    }
) => {
    return(
        <>
            <div className="list-group">
                <div className="list-group-item"><i className="fa-brands fa-twitter"/></div>
                <a href="/home" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <i className="fa-solid fa-house-chimney wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Home</div>
                </a>
                <a href="/" className={`list-group-item list-group-item-action ${active === 'explore' ? 'active' : ''}`}>
                    <i className="fa-solid fa-hashtag wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Explore</div>
                </a>
                <a href="/profile" className={`list-group-item list-group-item-action ${active === 'profile' ? 'active' : ''}`}>
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
        </>
    );
}
export default NavigationSidebar;
