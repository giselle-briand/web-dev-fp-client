import {useDispatch} from "react-redux";
import React from "react";

const TuitStats = ({tuit}) => {
    const dispatch = useDispatch();
    const likeTuit = () => {
        dispatch({type: 'like-tuit', tuit});
    };
    return (
        <div className="wd-float-done">
            <div className="wd-float-left wd-tuit-icon-spacing-3">
                <i className="fa fa-comment wd-icon-spacing-2"/>{tuit.stats.comments}
            </div>
            <div className="wd-float-left wd-tuit-icon-spacing-3">
                <i className="fa-solid fa-retweet wd-icon-spacing-2"/>{tuit.stats.retuits}
            </div>
            <span className="wd-float-left wd-tuit-icon-spacing-3" onClick={likeTuit}>
                {
                    tuit.liked && <i className="fas fa-heart wd-icon-spacing-2" style={{color: 'tomato'}}/>
                }
                {
                    !tuit.liked && <i className="far fa-heart wd-icon-spacing-2"/>
                }
                {tuit.stats && tuit.stats.likes}
            </span>
            <div className="wd-float-left wd-tuit-icon-spacing-3">
                <i className="fa fa-share-square wd-icon-spacing-2"/>
            </div>
        </div>
);
}
export default TuitStats;