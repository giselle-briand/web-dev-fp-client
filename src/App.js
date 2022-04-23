import './App.css';
import './css/universal.css'
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import Tuiter from "./components/Tuiter";
import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProfileProvider} from "./contexts/profile-context"
import SearchScreen from "./components/Tuiter/Search/SearchScreen";
import HomeScreen from "./components/Tuiter/HomeScreen";
import ProfilePage from "./components/Tuiter/ProfilePage";
import LoginPage from "./components/Tuiter/ProfilePage/login";
import SignUp from "./components/Tuiter/ProfilePage/signup";
import SecureRoute from "./components/secure-route";
import PrivacyPage from "./components/Tuiter/Privacy/PrivacyPage";
import Details from './components/Tuiter/Details';
import Posts from "./components/Tuiter/ProfilePage/sub-pages/posts";
import Bookmarks from "./components/Tuiter/ProfilePage/sub-pages/bookmarks";
import Likes from "./components/Tuiter/ProfilePage/sub-pages/likes";

function App() {

 /*  useEffect(() => {
       let popup_status = localStorage.getItem('prviacy_popup');
       if (popup_status === 'false') {
           setIsOpen(true);
           localStorage.setItem('privacy_popup', 'true');
       } else {
           setIsOpen(false);
       }
    }, []);*/

    // <Route path="profile" element={<ProfilePage/>}/>
  return (
      <ProfileProvider>
              <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Tuiter/>}>
                      <Route index element={<HomeScreen/>}/>
                      <Route path="search" element={<SearchScreen/>}/>
                      <Route path="search/:searchString" element={<SearchScreen/>}/>
                      <Route path="profile" element={
                          <SecureRoute>
                              <ProfilePage/>
                          </SecureRoute>
                      }>
                          <Route path="profile/:username" element={<ProfilePage/>}/>
                          <Route index element={<Posts/>}/>
                          <Route path="bookmarks" element={<Bookmarks/>}/>
                          <Route path="likes" element={<Likes/>}/>
                      </Route>
                      <Route path="login" element={<LoginPage/>}/>
                      <Route path="signup" element={<SignUp/>}/>
                      <Route path="privacy" element={<PrivacyPage/>}/>
                      <Route path="search/details/:username" element={<Details/>}/>
                  </Route>
              </Routes>

              </BrowserRouter>
      </ProfileProvider>
  );
}

export default App;
