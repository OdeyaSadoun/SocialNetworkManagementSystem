import { Link } from "react-router-dom";
import { userContext } from "../App";
import { useContext } from "react";

function Links(){
    const userId = useContext(userContext).id;
    console.log( useContext(userContext));

    return(
        <>
        <div>
        <nav className="navbar">
          <Link className={"NavLink"} to={`/${userId}/Albums`}>Albums  </Link>
          <Link className={"NavLink"} to={`/${userId}/Todos`}>Todos  </Link>
          <Link className={"NavLink"} to={`/${userId}/Posts`}>Posts  </Link>
          <Link className={"NavLink"} to={`/${userId}/Info`}>Info  </Link>
        </nav>
        </div>
        </>
    )
}

export default Links;