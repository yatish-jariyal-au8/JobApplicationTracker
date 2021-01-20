import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { register } from "../redux/actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .register(userName, userEmail, userPassword)
      .then((resp) => console.log(resp))
      .catch((err) => {
        setErrors(err.data.message);
      });
  };

  return (
    <>
      <h3 style={{ color: "#284b63" }} className="login text-center py-4">
        Welcome to Job Application Tracker!
      </h3>
      <h4 className="text-center py-2">Register to get started</h4>
      <Row className="justify-content-center pt-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              <strong>Name</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <strong>Email address</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <strong>Password</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setUserPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {errors && (
              <Form.Text className="text-muted error-text">{errors}</Form.Text>
            )}
          </Form.Group>
          <Row>
            <Button variant="success" type="submit">
              Register
            </Button>
            <Button
              style={{ paddingLeft: 10 }}
              variant="primary"
              className="mx-2"
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/login"
              >
                Sign In
              </Link>
            </Button>
          </Row>
        </Form>
      </Row>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {
    user: globalState.auth.user,
  };
};

export default connect(mapStateToProps, { register })(RegisterPage);
