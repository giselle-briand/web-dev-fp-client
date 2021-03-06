import React from "react";
import {Outlet} from "react-router-dom";
import NavigationSidebar from "./NavigationSidebar";
import tuitsReducer from "./reducers/tuits-reducer";
import usersReducer from "./reducers/users-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import '../../css/universal.css';
import '../../css/explore.css';
import WhoToFollowList from "./WhoToFollowList";
import StatusBar from "./LoginStatusBar/StatusBar";

const reducer = combineReducers({
    tuits: tuitsReducer, users: usersReducer
});
const store = createStore(reducer);

const Tuiter = () => {
    return(
        <Provider store={store}>
            <div className="row mt-2 sp">
                <div className="col-2 col-lg-1 col-xl-2">
                    <NavigationSidebar/>
                </div>
                <div className="col-10 col-lg-7 col-xl-6 mt-2" style={{"position": "relative"}}>
                    <Outlet/>
                </div>
                <div className="d-none d-lg-block col-lg-4 col-xl-4">
                    <StatusBar/>
                    <WhoToFollowList/>
                </div>
            </div>
        </Provider>
    )
};

export default Tuiter;