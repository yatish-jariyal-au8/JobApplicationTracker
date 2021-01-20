const initialState = {
    type: null,
    message: null
}

const toastReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case "SET_TOAST_DATA":
            return {
                ...state,
                type: payload.type,
                message: payload.message
            }
        default:
            return state
    }
}

export default toastReducer