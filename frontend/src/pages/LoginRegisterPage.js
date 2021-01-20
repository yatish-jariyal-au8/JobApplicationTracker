import React, {useState, useEffect} from "react";
import { Col, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { login, clearState } from "../redux/actions/authActions";
import loginImg from "../assets/login.png";
import { Redirect } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegisterPage = (props) => {
  return props.user ? (
    <Redirect to="/" />
  ) : (
    <Row style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
      <Col md={6}>
        <Image src={loginImg} fluid />
      </Col>
      <Col style={{ backgroundColor: "#ced4da" }} md={6}>
        {props.match.path === "/login" ? <Login /> : <Register />}
      </Col>
    </Row>
  );
};

const mapStateToProps = (globalState) => {
  return {
    user: globalState.auth.user,
  };
};

export default connect(mapStateToProps, { login, clearState })(LoginRegisterPage);
