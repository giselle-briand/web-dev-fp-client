import './App.css';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import Tuiter from "./components/Tuiter";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExploreScreen from "./components/Tuiter/ExploreScreen/ExploreScreen";
import HomeScreen from "./components/Tuiter/HomeScreen";
import ProfilePage from "./components/Tuiter/ProfilePage";
import LoginPage from "./components/Tuiter/ProfilePage/login";
import SignUp from "./components/Tuiter/ProfilePage/signup";

function App() {
  return (
      <BrowserRouter>
          <div className="container">
              <Routes>
                  <Route path="/" element={<Tuiter/>}>
                      <Route index element={<ExploreScreen/>}/>
                      <Route path="home"  element={<HomeScreen/>}/>
                      <Route path="profile" element={<ProfilePage/>}/>
                      <Route path="login" element={<LoginPage/>}/>
                      <Route path="signup" element={<SignUp/>}/>
                  </Route>
              </Routes>
          </div>
      </BrowserRouter>
  );
}


//TODO change the profile screne being displayed based on whether or not the user is logged in
export default App;
