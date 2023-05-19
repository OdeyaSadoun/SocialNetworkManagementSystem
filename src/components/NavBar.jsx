import { Link, Outlet } from "react-router-dom";
export default function Home(){
    return (
        <>
        <section className='section'>
          <nav className="navbar">
            <Link to='/'>Home</Link><br/>
            <Link to='./info.jsx'>info</Link>
          </nav>
        </section>
        </>
    )
}