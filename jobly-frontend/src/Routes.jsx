import { Route, Routes, BrowserRouter } from "react-router-dom";
import CompanyList from "./CompanyList";
import JobsList from "./JobsList";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import CompanyDetail from "./CompanyDetail";

function RoutesList({signUp, logIn, logOut}) {
    return (
      
        <Routes>
            <Route exact path="/" element={<Home logOut={logOut} />}></Route>
            <Route exact path="/companies" element={<CompanyList />}></Route>
            <Route exact path="/companies/:handle" element={<CompanyDetail />}></Route>
            <Route exact path="/jobs" element={<JobsList />}></Route>
            <Route exact path="/jobs/:name" element={<JobsList />}></Route>
            <Route exact path="/login" element={<Login logIn={logIn} />}></Route>
            <Route exact path="/signup" element={<Signup signUp={signUp} />}></Route>
            <Route exact path="/logout" element={<Home logOut={logOut} />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            
            <Route to="*" />
        </Routes>
    
  );
}

export default RoutesList;
