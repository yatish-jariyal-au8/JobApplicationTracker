import axios from "axios";
import { setQuestions } from "./questionActions";
import { setToastData } from "./toastActions";

//setting base url and token
const baseUrl = "https://job-app-tracker-backend.herokuapp.com/application";
//const baseUrl = "http://localhost:5000/application";

const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const toggleIsLoading = (isLoading) => ({
  type: "TOGGLE_IS_LOADING",
  payload: isLoading,
});

export const createApplication = (data) => async (dispatch, getState) => {
  try {
    await axios.post(
      `${baseUrl}/create`,
      data,
      getConfig(getState().auth.user.token)
    );
    dispatch(getApplications(data.email));
    dispatch(setToastData("success", "Application Created Successfully"));
  } catch (error) {
    console.error(error);
    dispatch(setToastData("error", "Application Creation Failed"));
  }
};

export const getApplications = (email) => (dispatch, getState) => {
  dispatch(toggleIsLoading(true));
  axios
    .post(`${baseUrl}/get`, { email }, getConfig(getState().auth.user.token))
    .then((res) => {
      dispatch(setApplications(res.data.data));
    })
    .finally(() => {
      dispatch(toggleIsLoading(false));
    });
};

export const setApplications = (data) => {
  return {
    type: "SET_APPLICATIONS",
    payload: data,
  };
};

export const deleteApplication = (id, email) => (dispatch, getState) => {
  axios
    .delete(`${baseUrl}/delete/${id}`, getConfig(getState().auth.user.token))
    .then((res) => {
      dispatch(getApplications(email));
      dispatch(setToastData("success", "Application Deleted Successfully"));
    })
    .catch((err) => {
      dispatch(setToastData("error", "Application Deletion Failed"));
    });
};

export const getOneApplication = (id) => (dispatch, getState) => {
  axios
    .get(`${baseUrl}/get/${id}`, getConfig(getState().auth.user.token))
    .then((res) => {
      dispatch(setOneApplication(res.data.data));
    });
};

export const setOneApplication = (data) => {
  return {
    type: "SET_ONE_APPLICATION",
    payload: data,
  };
};

export const editApplication = (id, data) => async (dispatch, getState) => {
  try {
    await axios.put(
      `${baseUrl}/edit/${id}`,
      data,
      getConfig(getState().auth.user.token)
    );
    dispatch(setToastData("success", "Application Saved Successfully"));
    dispatch(getApplications(data.email));
    dispatch(getOneApplication(id));
  } catch (error) {
    console.error(error);
  }
};

//question actions
export const getQuestions = (id) => (dispatch, getState) => {
  axios
    .get(
      `${baseUrl}/questions/get/${id}`,
      getConfig(getState().auth.user.token)
    )
    .then((resp) => {
      dispatch(setQuestions(resp.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteQuestion = (appId, questionId) => (dispatch, getState) => {
  axios
    .delete(
      `${baseUrl}/${appId}/delete/${questionId}`,
      getConfig(getState().auth.user.token)
    )
    .then((resp) => {
      dispatch(setToastData("success", "Question Deleted Successfully"));
      dispatch(setQuestions(resp.data.data));
    })
    .catch((err) => console.log(err.response.data));
};

export const editQuestion = (appId, questionId, question, answer) => (
  dispatch,
  getState
) => {
  axios
    .put(
      `${baseUrl}/${appId}/edit/${questionId}`,
      { question, answer },
      getConfig(getState().auth.user.token)
    )
    .then((resp) => {
      dispatch(setQuestions(resp.data.data));
      dispatch(setToastData("success", "Question Edited Successfully"));
    })
    .catch((err) =>
      dispatch(setToastData("error", "Error while editing question"))
    );
};
