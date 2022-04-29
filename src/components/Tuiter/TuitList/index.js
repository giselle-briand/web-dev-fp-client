import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllTuits} from "../actions/tuits-actions";
import Tuit from "../Tuit";
// import {findAllTuits} from "../../services/tuits-service";

const TuitList = () => {
    const tuits = useSelector(state => state.tuits);
    const dispatch = useDispatch();
    useEffect(() => findAllTuits(dispatch), []);
    // const [tuits, setTuits] = useState([]);
    // const findTuits = async () => {
    //     const theTuits = await findAllTuits()
    //     theTuits.reverse()
    //     setTuits(theTuits)
    // }
    // useEffect(() => {
    //     findTuits()
    // }, [])
    // const tuits = findAllTuits()
    console.log(tuits)
    return (
        <ul className="list-group wd-columns wd-float-done">
            {
                tuits && tuits.map(tuit =>
                    <Tuit givenTuit={tuit}/>
                )
            }
        </ul>
    );
}

export default TuitList;