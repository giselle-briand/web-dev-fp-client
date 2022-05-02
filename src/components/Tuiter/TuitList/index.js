import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllTuits} from "../actions/tuits-actions";
//import {findAllTuits} from "../../services/tuits-service";
import Tuit from "../Tuit";
import {useProfile} from "../../../contexts/profile-context";

const TuitList = () => {
    const {profileState} = useProfile();
    const [profile, ] = profileState

    let tuits = useSelector((state) => state.tuits);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async() => {
            const data = await findAllTuits(dispatch, profile)
            console.log("tuitlist ")
        }
        fetchData().catch(console.error);
    }, []);


    //console.log(tuits)

    return (
        <ul className="list-group wd-columns wd-float-done">
            {
                tuits.length === 0 && <h6 className="fw-bold text-center mt-2">No tuits to show. Follow more users to get some personalized content!</h6>
            }
            {
                tuits.map(function(tuit) {
                    console.log(tuit)
                        return(<Tuit givenTuit={tuit}/>)
                })
            }
            {/*{*/}
            {/*    (profile !== "init") && tuits.filter(tuit => followingIds.includes(tuit.creator)).map(tuit =>*/}
            {/*        <Tuit givenTuit={tuit}/>*/}
            {/*    )*/}
            {/*}*/}
        </ul>
    );
}

export default TuitList;