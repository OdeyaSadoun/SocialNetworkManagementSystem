import Login from "./components/Login";
import React, { useState } from "react";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

import Todos from "./components/Todos";
import Posts from "./components/Posts";
import Info from "./components/Info";
import Links from "./components/Links";
import Register from './components/Register';
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
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            <Route
              path="/Login"
              element={<Login setUserInfo={setUserInfo} />}
            />
            <Route path="/:id" element={<Links handleLogout={handleLogout} />}>
              <Route path="/:id/Todos" element={<Todos />} />
              <Route path="/:id/Posts" element={<Posts />} />
              <Route
                path="/:id/Posts/:postId/Comments"
                element={<Comments />}
              />
              <Route path="/:id/Info" element={<Info />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}
export default App;
