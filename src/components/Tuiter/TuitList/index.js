import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createTuit, deleteTuit, findAllTuits} from "../actions/tuits-actions";
import TuitListItem from "./TuitListItem";
import TuitStats from "../TuitStats/TuitStats";
import Tuit from "../Tuit";

const TuitList = () => {
    const tuits = useSelector(state => state.tuits);
    const dispatch = useDispatch();
    useEffect(() => findAllTuits(dispatch), []);
    return (
        <ul className="list-group wd-columns wd-float-done">
            {
                tuits.map && tuits.map(tuit =>
                    <Tuit tuit={tuit}/>
                )
            }
        </ul>
    );
}

export default TuitList;