import React, { useContext } from "react";
import UserContext from "./userContext";
import { Link } from "react-router-dom";
import "./NavBar.css";


function NavBar({logOut}) {
  const user = useContext(UserContext)
  console.log(user.username)

  function handleSubmit(evt) {
    logOut();
  }

  if (!user) {
    return (
      <ul className="navbar">
        <li className="link link-home"><Link to="/">Jobly</Link></li>
        <li className="link"><Link to="/signup" >Sign Up</Link></li>
        <li className="link"><Link to="/login" >Log In</Link></li>
      </ul>
    );
  } 
    return (
      <ul className="navbar">
        <li className="link link-home"><Link to="/">Jobly</Link></li>
        <li className="link"><Link to="/companies" >Companies</Link></li>
        <li className="link"><Link to="/jobs" >Jobs</Link></li>
        <li className="link"><Link to="/profile" >Profile</Link></li>
        <li className="link"><button type="submit" onSubmit={handleSubmit}>Log Out</button></li>
      </ul>
    )
  
}

export default NavBar;