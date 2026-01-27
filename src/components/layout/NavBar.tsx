import { useState } from "react";
import "../../assets/css/NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <div className="mobile-toggle" onClick={() => setOpen(!open)}>
          ☰
        </div>

        <ul className={`nav-links ${open ? "show" : ""}`}>
          <Link to={"/home"}>Home</Link>
          <Link to={"/home"}>Products</Link>
        </ul>
      </div>
    </nav>
  );
};
