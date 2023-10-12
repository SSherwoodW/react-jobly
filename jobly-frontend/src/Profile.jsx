import React, { useContext } from "react";
import { useFormik } from "formik";
import UserContext from "./userContext";
import "./Profile.css"


function Profile() {
    let {currentUser, token} = useContext(UserContext);

            const formik = useFormik({
      initialValues: {
          username: currentUser.user.username,
          password: currentUser.user.password,
          firstName: currentUser.user.firstName,
          lastName: currentUser.user.lastName,
          email: currentUser.user.email
      },
    onSubmit: values => {
      signUp(values)
      alert(JSON.stringify(values, null, 2));
    }
            });
    
    return (
        <>
        <h3 className="header">Profile</h3>
        <form className="form-container" onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
            id="username"
            name="username"
            type="text"
            disabled
            value={formik.values.username}   
            />
            <label htmlFor="password">Password</label>
            <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            <label htmlFor="firstName">First Name</label>
            <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            />
            <label htmlFor="email">Email Address</label>
            <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            />
            <button type="submit">Save Changes</button>
        </form>
        </>
    )
}

export default Profile;