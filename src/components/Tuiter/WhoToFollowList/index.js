import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsers} from "../actions/users-actions";
import ProfileItem from "../ProfilePage/profileitem";

const WhoToFollowList = () => {
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch();
    useEffect(() => findAllUsers(dispatch), []);

    let exploreUsers = []
    for (let i=0; i<5; i++) {
        const exploreUser = users[Math.floor(Math.random() * users.length)]
        exploreUsers.push(exploreUser)
        users.filter(user => user._id !== exploreUser._id)
    }

    return(
        <div className="up-down-padding row">
        <div className="ps-2 inline col-11">
            <div className="bold white-text">Explore Tuiter Users</div>
        </div>
    <br/>
    <hr/>
    <ul className="list-group">
        {
            exploreUsers && exploreUsers.map(u =>
                <ProfileItem user={u}/>
            )
        }
    </ul>
        </div>
            // <div className="list-group">
            //     <li className="list-group-item wd-suggested-follows-primary-text">Explore Tuiter Users</li>
            // {/*        {*/}
            // {/*            who.map(who => {*/}
            // {/*                return(*/}
            // {/*                    <WhoToFollowListItem who={who}/>*/}
            // {/*                );*/}
            // {/*        })*/}
            // {/*}*/}
            // </div>
    );
}
export default WhoToFollowList;