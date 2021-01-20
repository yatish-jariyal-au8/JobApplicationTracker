import { setToastData } from "./toastActions";
import axios from "axios";
import { setUser } from "./authActions";

const baseUrl = "https://job-app-tracker-backend.herokuapp.com/profile";
//const baseUrl = "http://localhost:5000/profile"

const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const setProfile = (data) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};

export const updateUser = (data, id) => (dispatch, getState) => {
  axios
    .post(
      `${baseUrl}/update/${id}`,
      data,
      getConfig(getState().auth.user.token)
    )
    .then((resp) => {
      dispatch(setToastData("success", "Profile Updated Successfully"));
      dispatch(setProfile(data));
      dispatch(setUser(data));
    })
    .catch((err) => {
      dispatch(setToastData("error", "Error while updating profile"));
    });
};

export const uploadResume = (data, id) => (dispatch, getState) => {
  axios
    .post(
      `${baseUrl}/uploadResume/${id}`,
      data,
      getConfig(getState().auth.user.token)
    )
    .then((resp) => {
      dispatch(setToastData("success", "Profile Updated Successfully"));
      dispatch(getResume(id));
    })
    .catch((err) => {
      dispatch(setToastData("error", "Error while updating profile"));
    });
};

export const uploadProfilePhoto = (data, id) => (dispatch, getState) => {
  axios
    .post(
      `${baseUrl}/uploadProfilePhoto/${id}`,
      data,
      getConfig(getState().auth.user.token)
    )
    .then((resp) => {
      dispatch(setToastData("success", "Photo Uploaded Successfully"));
      //dispatch(getProfilePhoto(id));
    })
    .catch((err) => {
      dispatch(setToastData("error", "Error while uploading photo"));
    });
};

export const downloadProfilePhoto = (id) => (dispatch) => {
  axios
    .get(`${baseUrl}/download/profilePhoto/${id}`, {
      "Content-Type": "image/jpg",
    })
    .then((resp) => {
      console.log("response", resp)
      if(resp.data.data !== null) {
        dispatch(setProfilePhotoURL(resp.data.data))
      }
    });
};

export const setProfilePhotoURL = (url) => ({
  type: "SET_PROFILE_PHOTO_URL",
  payload: url
})

export const getResume = (id) => (dispatch, getState) => {
  const token = getState().auth.user.token
  axios
    .get(`${baseUrl}/get/resume/${id}`, getConfig(token))
    .then((res) => dispatch(setResume(res.data.data)))
    .catch((err) => console.log(err));
};

export const setResume = (data) => ({
  type: "SET_RESUME",
  payload: data,
});

export const deleteResume = (id, file) => (dispatch, getState) => {
  axios
    .delete(
      `${baseUrl}/delete/resume/${id}/${file}`,
      getConfig(getState().auth.user.token)
    )
    .then((res) => {
      dispatch(setToastData("success", "Resume Deleted Successfully"));
      dispatch(getResume(id));
    })
    .catch((err) => {
      dispatch(setToastData("error", "Resume Deletion Failed"));
    });
};

export const downloadResume = (id, resume) => (dispatch) => {
  axios
    .get(`${baseUrl}/download/resume/${id}/${resume}`, {
      responseType: "blob",
    })
    .then((resp) => {
      const file = new Blob([resp.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;
    });
};
