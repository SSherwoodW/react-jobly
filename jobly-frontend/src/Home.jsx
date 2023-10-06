import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

import UserContext from "./userContext";

function Home() {
    const user = useContext(UserContext)
    
    // if (!user) {
        return (
            <div>
                <h2 className="header">Jobly</h2>
                <h5 className="header">All the jobs in one, convenient place</h5>
                <button className="button"><Link to="/login">Log In</Link></button>
                <button className="button"><Link to="/signup">Sign Up</Link></button>
            </div>
        )
    // }
    return (
        <div>
            <h2 className="header">Jobly</h2>
            <h5 className="header">All the jobs in one, convenient place</h5>
            <h2 className="header">Welcome Back, {user.username}!</h2>
        </div>
    )
}

export default Home;