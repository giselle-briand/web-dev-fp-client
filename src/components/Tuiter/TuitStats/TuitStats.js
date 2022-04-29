import {useDispatch} from "react-redux";
import React from "react";
import {updateTuit} from "../actions/tuits-actions";

const TuitStats = ({tuit}) => {
    const dispatch = useDispatch();
    return (
        <div className="wd-float-done wd-stats col-12">
            <div className="wd-float-left wd-tuit-icon-spacing-3">
                <i className="fa fa-comment wd-icon-spacing-2"/>
                {tuit.comments}
            </div>
            <span className="wd-float-left wd-tuit-icon-spacing-3"
                  onClick={() => {
                      if (tuit.liked === true) {
                          updateTuit(dispatch, {
                              ...tuit,
                              likes: tuit.likes - 1,
                              liked: false
                          })
                      } else {
                          updateTuit(dispatch, {
                              ...tuit,
                              likes: tuit.likes + 1,
                              liked: true
                          })
                      }
                  }}>
                {
                    tuit.liked && <i className="fa fa-thumbs-up ms-2 wd-icon-spacing-2"/>
                }
                {
                    !tuit.liked && <i className="far fa-thumbs-up ms-2 wd-icon-spacing-2"/>
                }
                {tuit.likes}
            </span>
            <span className="wd-float-left wd-tuit-icon-spacing-3"
                  onClick={() => {
                      if (tuit.disliked === true) {
                          updateTuit(dispatch, {
                              ...tuit,
                              dislikes: tuit.dislikes - 1,
                              disliked: false
                          })
                      } else {
                          updateTuit(dispatch, {
                              ...tuit,
                              dislikes: tuit.dislikes + 1,
                              disliked: true
                          })
                      }
                  }}>
                {
                    tuit.disliked && <i className="fa fa-thumbs-down ms-2 wd-icon-spacing-2"/>
                }
                {
                    !tuit.disliked && <i className="far fa-thumbs-down ms-2 wd-icon-spacing-2"/>
                }
                {tuit.dislikes}
            </span>
            <div className="wd-float-left wd-tuit-icon-spacing-3">
                <i className="fa fa-share-square wd-icon-spacing-2"/>
            </div>
        </div>
);
}
export default TuitStats;