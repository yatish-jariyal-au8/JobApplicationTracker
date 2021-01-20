const initialState = {
  currentApp: {},
  questions: [],
  isLoading: false
};

const applicationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_IS_LOADING":
      return {
        ...state,
        isLoading: payload
      }
    case "SET_APPLICATIONS":
      return {
        ...state,
        applications: payload,
      };
    case "SET_ONE_APPLICATION":
      return {
        ...state,
        currentApp: payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
