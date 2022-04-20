import './App.css';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import Tuiter from "./components/Tuiter";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import ExploreScreen from "./components/Tuiter/ExploreScreen/ExploreScreen";
import HomeScreen from "./components/Tuiter/HomeScreen";
import SearchTwitter from "./components/Tuiter/Search/Search";
import SearchTumblr from "./components/Tuiter/Search/Search";

function App() {
  return (
      <BrowserRouter>
          <div className="container">
              <Routes>
                  <Route path="/" element={<Tuiter/>}>
                      <Route index element={<HomeScreen/>}/>
                      <Route path="explore" element={<ExploreScreen/>}/>
                      <Route path="search/:searchString" element={<ExploreScreen/>}/>
                  </Route>
              </Routes>
          </div>
      </BrowserRouter>

  );
}

export default App;
