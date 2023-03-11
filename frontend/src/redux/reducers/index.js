import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";

import usersInfo from "./userInfoReducer";
export default combineReducers({
  auth,
  token,
  usersInfo,
  
});