import React from "react";
import '../../css/universal.css';
import '../../css/explore.css';

import ExploreScreen from "./ExploreScreen/ExploreScreen";
import {Link} from "react-router-dom";
const Tuiter = () => {
    return(
        <>
            <ExploreScreen/>
            <Link to="/labs">
                Labs
            </Link> |
            <Link to="/hello">
                Hello World
            </Link>
        </>
    )
};


export default Tuiter;