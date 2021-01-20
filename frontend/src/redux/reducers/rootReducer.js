import { combineReducers } from "redux";
import authReducer from "./authReducer";
import toastReducer from "./toastReducer";
import applicationReducer from "./applicationReducer";
import questionReducer from "./questionReducer";
import profileReducer from './profileReducer'
import Cookies from "js-cookie";

const appReducer = combineReducers({
  auth: authReducer,
  app: applicationReducer,
  toast: toastReducer,
  question: questionReducer,
  profile: profileReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.removeItem("user");
    Cookies.remove("user");
    return {
      auth: {},
      question: {},
      toast: {},
      app: {},
      profile: {}
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
