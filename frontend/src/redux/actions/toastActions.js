export const setToastData = (type, message) => {
    return {
        type: "SET_TOAST_DATA",
        payload: {type, message}
    }
}

