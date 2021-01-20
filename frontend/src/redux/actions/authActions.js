import axios from "axios";
import Cookies from "js-cookie";

const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
const baseUrl = `https://job-app-tracker-backend.herokuapp.com/users`;
//const baseUrl = "http://localhost:5000/users"

export const register = (name, email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/register`, { name, email, password })
      .then((res) => {
        if (res.data.status) {
          const { _id, name, email, token } = res.data;
          const user = { id: _id, name, email, token };
          dispatch(setUser(user));
          dispatch(setInLocalStorage("user", user));
          Cookies.set("user", user);
          resolve(user);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const fetchUserFromLocalStorage = () => (dispatch) => {
  const localData = localStorage.getItem("user");
  if (localData) {
    const user = JSON.parse(localData);
    dispatch(setUser(user));
  }
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setInLocalStorage = (key, value) => (dispatch) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loginWithGoogle = (user) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/loginWithGoogle`, user)
    .then(res => {
      if (res.data.status) {
        const { _id, name, email, token , link} = res.data;
        const user = { id: _id, name, email, token , link};
        Cookies.set("user", user);
        dispatch(setUser(user));
        dispatch(setInLocalStorage("user", user)); 
        resolve(user);
      }
    })
    .catch(err =>  reject(err.response))
  })
}

export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/login`, { email, password })
      .then((res) => {
        if (res.data.status) {
          const { _id, name, email, token, link } = res.data;
          const user = { id: _id, name, email, token , link};
          dispatch(setUser(user));
          dispatch(setInLocalStorage("user", user));
          Cookies.set("user", user);
          resolve(user);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const clearState = () => ({
  type: "CLEAR_STATE"
})

export const logout = () => {
  return {
    type: "LOGOUT"
  }
};
