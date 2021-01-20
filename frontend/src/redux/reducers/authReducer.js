const userInfoFromStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

const initialState = {
  user: userInfoFromStorage,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      if(state.user) {
        localStorage.setItem("user", JSON.stringify({...state.user, ...payload}))
        return {
          ...state,
          user: {...state.user, ...payload}
        }
      }
      return {
        ...state,
        user: payload,
      };
    
    default:
      return state;
  }
};

export default authReducer;
