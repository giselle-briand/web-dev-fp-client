import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllTuits} from "../actions/tuits-actions";
import Tuit from "../Tuit";
import {useProfile} from "../../../contexts/profile-context";
// import {findFollowingByUserId} from "../../services/users-service";
// import {findAllTuits} from "../../services/tuits-service";

const TuitList = () => {
    const {profileState} = useProfile();
    const [profile, ] = profileState
    // let followingIds = []

    let tuits = useSelector((state) => state.tuits);
    const dispatch = useDispatch();
    useEffect(() => findAllTuits(dispatch, profile), []);
    //setTuits(newtuits)

    // const findTuits = async () => {
    //     const theTuits = await findAllTuits()
    //     theTuits.reverse()
    //     setTuits(theTuits)
    // }
    // useEffect(() => {
    //     findTuits()
    // }, [])
    // const tuits = findAllTuits()
    // console.log(tuits)
    // console.log("OUTER HELP")
    // let customizedTuits;
    // const customizeFeed = async () => {
    //     // const copyTuits = tuits
    //     const following = await findFollowingByUserId(profile._id)
    //     // console.log(following)
    //     const followingIds = []
    //     following.map(followingUser => followingIds.push(followingUser._id))
    //     customizedTuits = tuits.filter(tuit => followingIds.includes(tuit.creator))
    // }
    //
    // if (profile !== "init") {
    //     customizeFeed();
    // }

    return (
        <ul className="list-group wd-columns wd-float-done">
            {
                tuits && tuits.map(tuit =>

                    <Tuit givenTuit={tuit}/>
                )
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