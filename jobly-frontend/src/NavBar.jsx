import React, { useContext } from "react";
import UserContext from "./userContext";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";



function NavBar({ logOut }) {
  
  const user = useContext(UserContext)
  console.log(user)


  if (!user.currentUser) {
    return (
      <div className="Navigation navbar">
      <div className="container-fluid">
        <Link className="link-home" to="/">Jobly</Link>
        <ul className="navbar navbar-links">
          <li className="link"><Link to="/login">Log In</Link></li>
          <li className="link"><Link to="/signup">Sign Up</Link></li>
        </ul>
      </div>
      </div>
    );
  } 
  return (
    <div className="Navigation">
      <div className="container-fluid">
        <Link className="link-home" to="/">Jobly</Link>
      <ul className="navbar navbar-links">
        <li className="link"><Link to="/companies" >Companies</Link></li>
        <li className="link"><Link to="/jobs" >Jobs</Link></li>
        <li className="link"><Link to="/profile" >Profile</Link></li>
        <li className="link" onClick={() => logOut()}><Link to="/">Log Out</Link></li>
        </ul>
        </div>
      </div>
    )
  
}

export default NavBar;