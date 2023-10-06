import { useState, useEffect } from 'react'
import { BrowserRouter, redirect } from "react-router-dom";
import { Nav } from 'reactstrap';
import NavBar from './NavBar';
import RoutesList from './Routes';
import UserContext from './userContext';
import './App.css'
import JoblyApi from '../../api';

// Here’s the strategy we took from our solution:

// Make login, signup, and logout functions in the App component.

// By passing login, logout, and signup functions down to the login and signup forms and the navigation bar, they’ll be able to call centralized functions to perform these processes.

// Add token as a piece of state in App, along with state for the currentUser.

// Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.

// Expose the current user throughout the app with a context provider. This will make it easy to refer to the current app in navigation, on pages, and so on.

// This would be an excellent place to use useContext, so you can store the current user’s info high up in your hierarchy, like on the App component.


function App() {
  const [username, setUsername] = useState(null)
  const [currentUser, setCurrentUser] = useState([]);
  const [token, setToken] = useState(null);

  async function signUp(formData) {
    const signUpResponse = await JoblyApi.signUp(formData)
    setUsername(formData.username)
    setToken(signUpResponse)
    logIn({username: formData.username, password: formData.password})
  }

  async function logIn(formData) {
    const logInResponse = await JoblyApi.logIn(formData)
    setUsername(formData.username)
    setToken(logInResponse)
  }

  function logOut() {
    setUsername(null)
    setCurrentUser([])
    setToken(null)
  }

  useEffect(() => {
    try {
      async function getUser() {
        try {
          const userResponse = await JoblyApi.getUser(username)
          setCurrentUser(userResponse)
          console.log(currentUser)
        } catch (err) {
          throw new Error(err)
        }
      };
      getUser();
    } catch (err) {
      throw new Error(err)
    }
  }, [token])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={currentUser}>
          <NavBar signUp={signUp} logIn={logIn} logOut={logOut} />
          <RoutesList signUp={signUp} logIn={logIn} logOut={logOut} />
        </UserContext.Provider>
        <footer>image: <a href="https://www.freepik.com/free-vector/abstract-blue-red-paper-cut-background-with-simple-shapes_17303414.htm#query=geometric%20background&position=23&from_view=keyword&track=ais">Image by masadepan</a> on Freepik</footer>
      </BrowserRouter>
    </>
  )
}

export default App
