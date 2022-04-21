import React from "react";
import {Outlet} from "react-router-dom";
import NavigationSidebar from "./NavigationSidebar";
import whoReducer from "./reducers/who-reducer";
import tuitsReducer from "./reducers/tuits-reducer";
import usersReducer from "./reducers/users-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import '../../css/universal.css';
import '../../css/explore.css';
import WhoToFollowList from "./WhoToFollowList";

const reducer = combineReducers({
    tuits: tuitsReducer, who: whoReducer, users: usersReducer
});
const store = createStore(reducer);

const Tuiter = () => {
    return(
        <Provider store={store}>
            <div className="row mt-2 sp">
                <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active={<Outlet/>}/>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-7 col-md-10 col-sm-10 mt-2" style={{"position": "relative"}}>
                    <Outlet/>
                </div>
                <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                    <WhoToFollowList/>
                </div>
            </div>
        </Provider>
    )
};

export default Tuiter;