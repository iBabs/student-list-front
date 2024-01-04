import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import "./Root.css";

function RootLayout() {
  return (
    <>
      <header>
        <Link to ='/' className="Logo"><p>Student Info</p></Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-student">Add Student</NavLink>
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
