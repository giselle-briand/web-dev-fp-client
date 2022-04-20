import './App.css';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import Tuiter from "./components/Tuiter";
import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProfileProvider} from "./contexts/profile-context"
import ExploreScreen from "./components/Tuiter/ExploreScreen/ExploreScreen";
import HomeScreen from "./components/Tuiter/HomeScreen";
import ProfilePage from "./components/Tuiter/ProfilePage";
import LoginPage from "./components/Tuiter/ProfilePage/login";
import SignUp from "./components/Tuiter/ProfilePage/signup";
import Popup from "./components/Tuiter/Privacy";
import SecureRoute from "./components/secure-route";
import SearchTwitter from "./components/Tuiter/Search/Search";
import SearchTumblr from "./components/Tuiter/Search/Search";
import PrivacyPage from "./components/Tuiter/Privacy/PrivacyPage";

function App() {
    const [isOpen, setIsOpen] = useState(true);
    let tracker = true;

    // https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57
    //https://www.cluemediator.com/create-simple-popup-in-reactjs

    const togglePopupFalse = () => {
        setIsOpen(false);
        tracker = false;
        console.log(isOpen);
    }

   useEffect(() => {
       let popup_status = localStorage.getItem('prviacy_popup');
       if (popup_status === 'false') {
           setIsOpen(true);
           localStorage.setItem('privacy_popup', 'true');
       } else {
           setIsOpen(false);
       }
    }, []);

    // <Route path="profile" element={<ProfilePage/>}/>
  return (
      <ProfileProvider>
              <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Tuiter/>}>
                      <Route index element={<HomeScreen/>}/>
                      <Route path="search" element={<ExploreScreen/>}/>
                      <Route path="search/:searchString" element={<ExploreScreen/>}/>
                      <Route path="profile" element={
                          <SecureRoute>
                              <ProfilePage/>
                          </SecureRoute>
                      }/>
                      <Route path="login" element={<LoginPage/>}/>
                      <Route path="signup" element={<SignUp/>}/>
                      <Route path="privacy" element={<PrivacyPage/>}/>
                      {/*<Route index element={<ExploreScreen/>}/>*/}
                      {/*<Route path="home"  element={<HomeScreen/>}/>*/}
                  </Route>
              </Routes>

                  {isOpen && <Popup
                      content={<>
                          <b>Design your Popup</b>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                              occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      </>}
                      handleClose={togglePopupFalse}
                  />}
              </BrowserRouter>
      </ProfileProvider>
  );
}


//TODO change the profile screne being displayed based on whether or not the user is logged in
export default App;
