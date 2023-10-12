import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
// import useLocalStorage from "./hooks/useLocalStorage";


import UserContext from "./userContext";

function Home() {
    // const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {});
    const {currentUser} = useContext(UserContext)
    useEffect(() => {
        console.log("currentUser updated")
        if (currentUser) {
        console.log(currentUser.user.username)
    }
  }, [currentUser])
    
    // if (user === true) {
    //     console.log("true!")
    // }
    if (currentUser) {
        return (
        <div>
            <h2 className="header">Jobly</h2>
            <h5 className="header">All the jobs in one, convenient place</h5>
                <h2 className="header">Welcome back {currentUser.user.username}!</h2>
        </div>
    )
    }
    return (
            <div>
                <h2 className="header">Jobly</h2>
                <h5 className="header">All the jobs in one, convenient place</h5>
                <button className="button"><Link to="/login">Log In</Link></button>
                <button className="button"><Link to="/signup">Sign Up</Link></button>
            </div>
        )
}

export default Home;