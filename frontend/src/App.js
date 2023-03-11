import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "antd/dist/antd.css";

import Register from "./components/register";
import Activate from "./components/activate";
import axios from "axios";

import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from "./redux/action/authAction";

import NotFound from "./utils/NotFound/NotFound";



function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);
  return (
    <>
      <div className="main">
        <Router>
          <>
            <Switch>
              <Route
                exact
                path="/"
                component={isLogged ? NotFound : Register}
              />
              {/* <Route
                exact
                path="/contact"
                component={isLogged ? NotFound : Contact}
              />
              <Route
                exact
                path="/user/activate/:activation_token"
                component={ActivationEmail}
              /> */}
               <Route
                exact
                path="/activated"
                component={ Activate}
              />
              <Route component={NotFound} />
            </Switch>
          </>
        </Router>
        
      </div>
    </>
  );
}

export default App;