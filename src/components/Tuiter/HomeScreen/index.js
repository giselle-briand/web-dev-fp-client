import TuitList from "../TuitList";
import WhatsHappening from "./WhatsHappening";
import React, {useEffect, useState} from 'react';
import SecureContent from "../../secure-content";

const HomeScreen = () => {
    return(
        <div>
            <SecureContent>
                <WhatsHappening/>
            </SecureContent>
            <TuitList/>
        </div>
    )
}
export default HomeScreen;