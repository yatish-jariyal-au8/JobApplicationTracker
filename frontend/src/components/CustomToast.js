import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setToastData } from "../redux/actions/toastActions";

const CustomToast = () => {
  const { type, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type && message) {
        setTimeout(() => {
            dispatch(setToastData(null, null));
        }, 2000)
    }
  }, [type, message, dispatch]);

  return type && message ? (
    <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
      <Toast style={{ backgroundColor: type === "success" ? "#18bc9c" : "#e74c3c" }}>
        <Toast.Body style={{ color: "white" }}>{message}</Toast.Body>
      </Toast>
    </div>
  ) : (
    <></>
  );
};

export default CustomToast;
