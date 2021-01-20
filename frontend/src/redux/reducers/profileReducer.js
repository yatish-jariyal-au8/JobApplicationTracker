const initialState = {
  resumes: [],
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PROFILE_PHOTO_URL":
      return {
        ...state,
        profilePhotoURL: payload,
      };
    case "UPDATE_USER":
      const updatedUser = { ...state.user, ...payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    case "SET_RESUME":
      return {
        ...state,
        resumes: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
