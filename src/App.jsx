import Login from "./components/Login";
import React, { useState } from "react";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Albums from "./components/Albums";
import Todos from "./components/Todos";
import Posts from "./components/Posts";
import Info from "./components/Info";
import Links from "./components/Links";
import Photos from "./components/Photos";
import Comments from "./components/Comments";
export const userContext = React.createContext();

function App() {
  const [userInfo, setUserInfo] = useState({});
  const handleLogout = () => {
    setUserInfo({});
    window.location.replace("/");
  };
  return (
    <div>
      <userContext.Provider value={userInfo}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setUserInfo={setUserInfo} />} />
            <Route path="/:id" element={<Links handleLogout={handleLogout} />}>
              <Route path="/:id/Todos" element={<Todos />} />
              <Route path="/:id/Posts" element={<Posts />} />
              <Route
                path="/:id/Posts/:postId/Comments"
                element={<Comments />}
              />
              <Route path="/:id/Info" element={<Info />} />
              <Route path="/:id/Albums" element={<Albums />} />
              <Route path="/:id/Albums/:albumId/Photos" element={<Photos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
