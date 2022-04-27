import React, { useContext, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {createUser} from "../components/Tuiter/actions/users-actions";

const ProfileContext = React.createContext("");

const api = axios.create({
    //withCredentials: false
    withCredentials: true
})

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState("init")

    const signout = async () => {
        const response = await api
            .post("http://localhost:4000/api/logout")
        setProfile("init")
    }

    const checkLoggedIn = async () => {
        try {
            const response = await api
                .post("http://localhost:4000/api/profile")

            console.log(response.data)
            setProfile(response.data)
            return response.data
        } catch (e) {
            throw e
        }
    }

    const signup = async (user) => {
        try { // TODO: move this to service
            console.log(user);
           const response = await api.post("http://localhost:4000/api/signup",
               user)
               //createUser(dispatch, user)
      /*      const response = await api
                .post("http://localhost:4000/api/signup",
                    { email, password })*/
            setProfile(response.data)
        } catch (e) { throw e }
    }


    const signin = async (email, password) => {
        try {
            const response = await api
                .post("http://localhost:4000/api/login",
                    {email, password})
            setProfile(response.data)
        } catch (e) {
            throw e
        }
    }


    const value = {
        signout,
        signin,
        profileState: [profile, setProfile],
        signup:signup,
        checkLoggedIn}

    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )

}

export const useProfile = () => {
    return useContext(ProfileContext)
}