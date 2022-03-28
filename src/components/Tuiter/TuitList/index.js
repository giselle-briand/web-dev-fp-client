import React from "react";
import {useSelector} from "react-redux";
import TuitListItem from "./TuitListItem";
import TuitStats from "../TuitStats/TuitStats";

const TuitList = () => {
    const tuits = useSelector(state => state.tuits);
    return (
        <ul className="list-group wd-columns wd-float-done">
            {
                tuits.map && tuits.map(tuit =>
                    <li className="list-group-item wd-suggested-follows-primary-text">
                        <TuitListItem key={tuit._id} tuit={tuit}/>
                        <TuitStats tuit={tuit}/>
                    </li>
                )
            }
        </ul>
    );
}

export default TuitList;