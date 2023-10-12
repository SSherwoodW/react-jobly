import { useState, useEffect } from 'react'
import { BrowserRouter, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import RoutesList from './Routes';
import UserContext from './userContext';
import './App.css'
import JoblyApi from '../../api';
import useLocalStorage from "./hooks/useLocalStorage";


// Here’s the strategy we took from our solution:

// Make login, signup, and logout functions in the App component.

// By passing login, logout, and signup functions down to the login and signup forms and the navigation bar, they’ll be able to call centralized functions to perform these processes.

// Add token as a piece of state in App, along with state for the currentUser.

// Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.

// Expose the current user throughout the app with a context provider. This will make it easy to refer to the current app in navigation, on pages, and so on.

// This would be an excellent place to use useContext, so you can store the current user’s info high up in your hierarchy, like on the App component.


function App() {
  const [username, setUsername] = useLocalStorage("username", null)
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  // const navigate = useNavigate()
  

  async function signUp(formData) {
    setUsername(formData.username)
    const signUpResponse = await JoblyApi.signUp(formData)
    setToken(signUpResponse.token)
    logIn({username: formData.username, password: formData.password})
  }

  async function logIn(formData) {
    setUsername(formData.username)
    try {
      const logInResponse = await JoblyApi.logIn(formData)
      console.log(`Username: ${username}`)
      setToken(logInResponse.token)
      console.log(`should be token: ${logInResponse.token}`)
    } catch (err) {
      return err;
    }
    
  }

  function logOut() {
    setApplicationIds(new Set([]));
    setUsername(null)
    setCurrentUser(null)
    setToken(null)
  }

  useEffect(() => {
      async function getUser() {
          const userResponse = await JoblyApi.getUser(username, token)
          setCurrentUser(userResponse)
          setApplicationIds(new Set(currentUser.user.applications))
      };
      getUser();
  }, [token])

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  async function applyToJob(username, jobId, token) {
        try {
          const applyResponse = await JoblyApi.apply(username, jobId, token)
          setApplicationIds(new Set([...applicationIds, jobId]))
            console.log(applyResponse)
        } catch (err) {
            return err;
        }
    }

  

  return (
    <>
      <UserContext.Provider value={{ currentUser, token, hasAppliedToJob, applyToJob }}>
      <BrowserRouter>
          <NavBar signUp={signUp} logIn={logIn} logOut={logOut} />
          <RoutesList signUp={signUp} logIn={logIn} logOut={logOut} applyToJob={applyToJob}/>
        <footer>image: <a href="https://www.freepik.com/free-vector/abstract-blue-red-paper-cut-background-with-simple-shapes_17303414.htm#query=geometric%20background&position=23&from_view=keyword&track=ais">Image by masadepan</a> on Freepik</footer>
        </BrowserRouter>
        </UserContext.Provider>
    </>
  )
}

export default App;
