import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useProfile} from "../../../contexts/profile-context";

const NavigationSidebar = (
    {
        active = 'home'
    }
) => {
    const location = useLocation()
    const profile = useProfile()
    const loggedInUser = profile
    active = location.pathname;
    return(
        <>
            <div className="list-group spacing-left">
                <div className="d-xs-block d-sm-none">XS</div>
                <div className="d-none d-sm-block d-md-none">SM</div>
                <div className="d-none d-md-block d-lg-none">MD</div>
                <div className="d-none d-lg-block d-xl-none">LG</div>
                <div className="d-none d-xl-block d-xxl-none">XL</div>
                <div className="d-none d-xxl-block">XXL</div>
                <div className="list-group-item"><i className="fa-brands fa-twitter"/></div>
                <Link to="/" className={`list-group-item list-group-item-action ${active === "/" ? "active" : ""}`}>
                    <i className="fa-solid fa-house-chimney wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-none d-xl-block">Home</div>
                </Link>
                <Link to="/search" className={`list-group-item list-group-item-action ${active === '/search' ? 'active' : ''}`}>
                    <i className="fa-solid fa-hashtag wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-none d-xl-block">Search</div>
                </Link>
                <Link to="/profile" className={`list-group-item list-group-item-action ${active === '/profile' ? 'active' : ''}`}>
                    <i className="fa-solid fa-user wd-float-left pt-1 pe-1"/>
                    <div className="wd-float-left d-none d-xl-block">Profile</div>
                </Link>
                <Link to="/privacy" className={`list-group-item list-group-item-action ${active === '/privacy' ? 'active' : ''}`}>
                    <span className="fa-stack wd-span-more-padding wd-float-left pt-1 pe-1">
                        <i className="fa-solid fa-circle fa-stack-1x"/>
                        <i className="fa-solid fa-ellipsis fa-stack-1x fa-inverse"/>
                    </span>
                    <div className="wd-float-left d-none d-xl-block ">Privacy</div>
                </Link>
            </div>
        </>
    );
}
export default NavigationSidebar;
