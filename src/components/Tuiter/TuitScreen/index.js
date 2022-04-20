import React from "react";
import TuitStats from "../TuitStats/TuitStats";

const TuitScreen = () => {
    return (
        <div >
            <div className="row">
                <div className="col-1 d-flex align-items-center">
                    <i className="fa-solid fa-arrow-left ps-3 text-white"/>
                </div> 
                <div className="col-11 m-0 ps-4">
                    <h5 className="m-0 fw-bold">Tuit</h5>
                </div> 
            </div>
            <div >
                {/* Profile image and handle */}
                <div className="mt-4 row">
                    <div className="col-1">
                        <img src="https://0.soompi.io/wp-content/uploads/2022/03/18114400/Stray-Kids1.jpeg" 
                        className="wd-avatar-image"/>
                    </div>
                    <div className="col-11 d-flex align-items-center">
                        <div className="ps-4 ps-md-2">
                            <div className="m-0 ">
                                <h6 className="fw-bold m-0">Stray Kids 
                                <span><i className="ms-1 fa-solid fa-circle-check"/></span></h6>
                            </div>
                            <div className="">
                                <h6 className="text-secondary m-0">@Stray_Kids</h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tuit content */}
                <div className="mt-3">
                    {/* Tuit Text */}
                    <div>
                        <p className="fs-5 fw-bold text-white">Stray Kids(스트레이 키즈) "MANIAC" Performance | The Late Show with Stephen Colbert</p>
                        <a href="youtu.be/6CeCpgLJi6A" className="fs-5 fw-bold" >youtu.be/6CeCpgLJi6A</a>
                    </div>

                    {/* Tuit Media */}
                    <div className=" mt-3">
                        <img className="w-100 wd-tuit-image" src="https://pbs.twimg.com/media/FQOBReMaAAIH4dW?format=jpg&name=4096x4096" />
                    </div>

                    {/* Tuit Details */}
                    <div className=" mt-3">
                        <h6 className="text-secondary"><span>7:00 AM · </span><span>Apr 13, 2022 · </span><span>Twitter Web App</span></h6>
                        <hr/>
                        <div className="d-inline-flex justify-content-between" >
                            <div>
                                <h6 className="fw-bold m-0">20.5K <span className="text-secondary fw-normal">Retweets</span></h6>
                            </div>
                            <div>
                                <h6 className="ms-4 fw-bold m-0">687 <span className="text-secondary fw-normal">Quote Tweets</span></h6>
                            </div>
                            <div>
                                <h6 className="ms-4 fw-bold m-0">83.8K <span className="text-secondary fw-normal">Likes</span></h6>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TuitScreen;