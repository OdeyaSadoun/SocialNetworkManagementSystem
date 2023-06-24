import { Link, Outlet, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { useContext } from "react";
import "./Links.css";

function Links(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the user from local storage
    localStorage.removeItem('user');
    // Perform any other logout actions, such as clearing other data or redirecting

    // Redirect to the login page without rendering the Toolbar component
    navigate('/Login', { replace: true });
  };

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
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </>
  );
}

export default Links;
