import React from "react";

const Tuit = ({

    tuit = {
        tuit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, laoreet vitae massa eget, elementum gravida mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        likes: 14,
        dislikes: 0,
        comments: 0,
        retuits: 3,
        liked: true,
        disliked: false,
        name: "Name",
        username: "Username",
        verified: false,
        time: "Just now",
        date: {
            day: "14",
            month: "Sep",
            year: "2022",
            time: "08:11 PM"
        },
        title: "",
        topic: "",
        "avatar-image": "../media/emptypp.webp"
    }
}) => {
    return (
        <div className="row ps-3 pe-3">

            <div className="col-1">
            <img src={tuit['avatar-image']} className="wd-avatar-image"/>
            </div>
            <div className="col-11 mb-2">
                <div className="d-inline-flex justify-content-between w-100">
                    <h6 className="fw-bold m-0">{tuit.name}
                    <span><i className={`${tuit.verified ? "ms-1 fa-solid fa-circle-check" : ""}`}/></span>
                    <span className="fw-light text-secondary ps-2">@{tuit.username} · {tuit.date.month + " " + tuit.date.day}</span></h6>
                    <h6 className="text-secondary m-0"><i class="fa-solid fa-ellipsis"></i></h6>
                </div>
                <div>
                    <p className="text-white">
                        {tuit.tuit}
                    </p>
                    <div>
                        <img src={`${tuit.hasOwnProperty("image") ? tuit.image : ""}`}
                            className={`${tuit.hasOwnProperty("image") ? "w-100 wd-tuit-image" : "wd-no-display"}`}/>
                        <iframe width="500" height="300" src={`${tuit.hasOwnProperty("video") ? tuit.video : ""}`}
                        className={`${tuit.hasOwnProperty("video") ? "w-100 wd-tuit-image" : "wd-no-display"}`}
                        title="Video" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                    </div>
                </div>
                <div className="d-inline-flex justify-content-between w-75 mt-3 pe-5">
                    <h6 className="text-secondary m-0">
                        <i class="fa-regular fa-comment"></i>
                        <span className="ps-3">{tuit.comments}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        <i class="fa-solid fa-retweet"></i>
                        <span className="ps-3">{tuit.retuits}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        <i class="fa-regular fa-heart"></i>
                        <span className="ps-3">{tuit.likes}</span>
                    </h6>
                    <h6 className="text-secondary m-0">
                        <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    </h6>
                </div>
            </div>
            <hr/>

        </div>
        
    )
}

export default Tuit