import "./navbar.css";
import logo from "./logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
  const [clicked, setclicked] = useState(false);


  function updateClicked() {
    setclicked(!clicked);
  }

  function logout() {
    sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
  }
  return (
    <>
      <div id="navbar">
        <img src={logo} alt="logo" />
        <div id="nav" className={clicked ? "#nav active" : "#nav"}>
          <div id="nav-link">
            <NavLink to="/Dashboard">Dashboard</NavLink>
            <NavLink to="/task">Tasks</NavLink>
            <NavLink to="/wallet">Wallet</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <div id="nav-profile">
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/" onClick={logout} replace>Logout</NavLink>
          </div>
        </div>
        <div id="mobile" onClick={() => updateClicked()}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </>
  );
};
export default Navbar;
