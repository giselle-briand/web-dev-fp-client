import React, {useEffect, useState} from 'react';
import {useProfile} from "../contexts/profile-context";

/// TODO this is how to show different information based on whether or not you are logged in! ??

const SecureContent = ({children}) => {
    const {checkLoggedIn} = useProfile()
    const [loggedIn, setLoggedIn] = useState(false)
    const check = async () => {
        try {
            await checkLoggedIn()
            setLoggedIn(true)
        } catch (e) {
            setLoggedIn(false)
        }
    }
    useEffect(() => { check() }, [])
    if(loggedIn) {
        return children
    }
    return null
};

export default SecureContent;