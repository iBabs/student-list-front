import React, { useContext } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import "./Root.css";
import { AuthContext } from "../context/AuthContext";

function RootLayout() {
  const {user} = useContext(AuthContext)
  return (
    <>
      <header>
        <Link to ='/' className="Logo"><p>Student Info</p></Link>
        <nav>
          <NavLink to="/">Home</NavLink>
         {user?.isAdmin && <NavLink to="/add-student">Add Student</NavLink>}
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>
          &copy; 2024. ibrahimbabalola8@gmail.com
        </p>
      </footer>
    </>
  );
}

export default RootLayout;
