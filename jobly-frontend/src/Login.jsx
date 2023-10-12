import React, { useContext } from "react";
import { useFormik } from "formik";
import UserContext from "./userContext";
import { useNavigate } from 'react-router-dom';
import "./Form.css";

function Login({ logIn }) {
  const user = useContext(UserContext)
  const navigate = useNavigate(); 
  const formik = useFormik({
      initialValues: {
          username: "",
          password: ""
      },
    onSubmit: values => {
      logIn(values)
      navigate("/")
    }
  });


  return (
    <>
    <h3 className="header">Log In</h3>
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
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
      <button type="submit">Submit</button>
      </form>
      </>
  );
};

export default Login;