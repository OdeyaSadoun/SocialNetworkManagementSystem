import { Link, Outlet } from "react-router-dom";
import { userContext } from "../App";
import { useContext } from "react";
import "./Links.css";

function Links(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div>
        <nav className="navbar">
          <Link className={"NavLink"} to={`/${user.id}/Todos`}>
            Todos{" "}
          </Link>
          <br />
          <Link className={"NavLink"} to={`/${user.id}/Posts`}>
            Posts{" "}
          </Link>
          <br />
          <Link className={"NavLink"} to={`/${user.id}/Info`}>
            Info{" "}
          </Link>
          <br />
        </nav>
        <h2>Hello, {user.name}!</h2>
      </div>
      <button onClick={props.handleLogout}>Logout</button>
      <Outlet />
    </>
  );
}

export default Links;
