import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./auth.css"
import axios from "axios";
import Logo from "./img/registe.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  showErrMsg,
  showSuccessMsg,
} from "../utils/notification/Notification";
import { useDispatch } from "react-redux";
import {
  isEmpty,
  isEmail,
  isMatch,
  isLength,
} from "../utils/validation/Validation";

import { useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  phoneno: "",
  err: "",
  success: "",
};

const Register = () => {
  let history = useHistory();
  const [formDataUser, setFormDataUser] = useState(initialState);
  const dispatch = useDispatch();
  const [dob, setDob] = useState(null);

  const {
    name,
    email,
    phoneno,
    err,
    success,
  } = formDataUser;
  const handleChange = (e) => {
    
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (isEmpty(name))
      return setFormDataUser({
        ...formDataUser,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setFormDataUser({
        ...formDataUser,
        err: "Invalid email",
        success: "",
      });


    const age = (new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365);
    if (age < 18) 
      return setFormDataUser({
        ...formDataUser,
        err: "Age must be greater than 18",
        success: "",
      });
    try {
       
        const res = await axios.post("/user/register", {
          name,
          email,
          dob,
          phoneno
        });
        setFormDataUser({ ...formDataUser, err: "", success: res.data.msg });
     history.push('/activated');
      
    } catch (err) {
      err.response.data.msg &&
        setFormDataUser({
          ...formDataUser,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });

  return (
   <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input  name="name"
                    value={name}
                    type="text"
                    className="input"
                    placeholder="Enter Your Name"
                    onChange={handleChange} />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input  
                    name="email"
                    value={email}
                    type="text"
                    className="input"
                    placeholder="Enter Your Email"
                    onChange={handleChange} />
            </div>
            <div class="input-field">
              <i class="fas fa-calendar"></i>
              <DatePicker
                id="dob"
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                required
              />
            </div>
            <div class="input-field">
              <i class="fas fa-mobile"></i>
              <input  
                    name="phoneno"
                    value={phoneno}
                    type="text"
                    className="input"
                    placeholder="Enter Your Mobile"
                    onChange={handleChange} />
            </div>
           
            <input type="submit" value="Register" class="btn solid" />
            
          </form>
         
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
