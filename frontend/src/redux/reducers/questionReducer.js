const questionReducer = (state = {isLoading: false}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_IS_LOADING": 
    return {
      ...state,
      isLoading: payload
    }
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: [...payload],
      };
    case "SET_FORUM_QUESTIONS":
      return {
        ...state,
        forumQuestions: [...payload],
      };
    default:
      return state;
  }
};

export default questionReducer;
