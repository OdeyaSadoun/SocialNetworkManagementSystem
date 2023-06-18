import { Link, Outlet } from "react-router-dom";
import { userContext } from "../App";
import { useContext } from "react";
import "./Links.css";

function Links(props) {
  const userId = useContext(userContext).id;
  const user = useContext(userContext);

  return (
    <>
      <div>
        <nav className="navbar">
          <Link className={"NavLink"} to={`/${userId}/Todos`}>
            Todos{" "}
          </Link>
          <br />
          <Link className={"NavLink"} to={`/${userId}/Posts`}>
            Posts{" "}
          </Link>
          <br />
          <Link className={"NavLink"} to={`/${userId}/Info`}>
            Info{" "}
          </Link>
        </nav>
        <h2>Hello, {user.name}!</h2>
      </div>
      <button onClick={props.handleLogout}>Logout</button>
      <Outlet />
    </>
  );
}

export default Links;
