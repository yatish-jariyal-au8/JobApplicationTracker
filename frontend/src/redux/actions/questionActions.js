import { setToastData } from "./toastActions";
import axios from "axios";

const baseUrl = "https://job-app-tracker-backend.herokuapp.com/question";
//const baseUrl = "http://localhost:5000/question"

const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const toggleIsLoading = (isLoading) => ({
  type: "TOGGLE_IS_LOADING",
  payload: isLoading
})

export const addInterviewQuestion = (email, appId, question, answer) => (
  dispatch,
  getState
) => {
  axios
    .post(
      `${baseUrl}/add`,
      { email, appId, question, answer },
      getConfig(getState().auth.user.token)
    )
    .then((res) => {
      dispatch(setToastData("success", "Question Added Successfully"));
      dispatch(setQuestions(res.data.data));
    })
    .catch((err) => {
      dispatch(setToastData("error", "Error: Please try again"));
    });
};

export const setQuestions = (questions) => {
  return {
    type: "SET_QUESTIONS",
    payload: questions,
  };
};

export const getForumQuestions = () => (dispatch) => {
  dispatch(toggleIsLoading(true))
  axios
    .get(`${baseUrl}/get`)
    .then((res) => {
      dispatch(setForumQuestions(res.data.data));
    })
    .catch((err) => dispatch(setToastData("error", "Error: Please try again")))
    .finally(() => {
      dispatch(toggleIsLoading(false))
    })
};

export const setForumQuestions = (questions) => {
  return {
    type: "SET_FORUM_QUESTIONS",
    payload: questions,
  };
};

export const filterQuestions = (searchQuery) => dispatch => {
  axios.get(`${baseUrl}/filter/${searchQuery}`)
  .then(resp => dispatch(setForumQuestions(resp.data.data)))
  .catch(err => console.log(err))
}
