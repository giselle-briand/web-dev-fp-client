import React from "react";
import {Link} from "react-router-dom";

const NavigationSidebar = (
    {
        active = 'home'
    }
) => {

    return(
        <>
            <div className="list-group spacing-left">
                <div className="list-group-item"><i className="fa-brands fa-twitter"/></div>
                <Link to="/" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <i className="fa-solid fa-house-chimney wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Home</div>
                </Link>
                <Link to="/search" className={`list-group-item list-group-item-action ${active === 'search' ? 'active' : ''}`}>
                    <i className="fa-solid fa-hashtag wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Search</div>
                </Link>
                <Link to="/profile" className={`list-group-item list-group-item-action ${active === 'profile' ? 'active' : ''}`}>
                    <i className="fa-solid fa-user wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Profile</div>
                </Link>
                <Link to="/privacy" className={`list-group-item list-group-item-action ${active === 'privacy' ? 'active' : ''}`}>
                    <span className="fa-stack wd-span-more-padding wd-float-left pt-1 pe-1">
                        <i className="fa-solid fa-circle fa-stack-1x"/>
                        <i className="fa-solid fa-ellipsis fa-stack-1x fa-inverse"/>
                    </span>
                    <div className="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Privacy</div>
                </Link>
                {/*Add link here to privacy page!*/}
            </div>
        </>
    );
}
export default NavigationSidebar;
