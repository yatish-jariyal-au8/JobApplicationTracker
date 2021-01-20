import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import keys from "../config/keys";
import { login, loginWithGoogle } from "../redux/actions/authActions";
import { connect } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const responseGoogle = (response) => {
    console.log("response google", response)
    if(response.profileObj) {
      const { name, email } = response.profileObj;
      props
        .loginWithGoogle({ name, email })
        .then((resp) => console.log(resp))
        .catch((err) => {
          setErrors("Login failed");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .login(email, password)
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
      <h3 className="text-center py-2">Sign In</h3>
      <Row className="justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <strong>Email address</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <strong>Password</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {errors && (
              <Form.Text className="text-muted error-text">{errors}</Form.Text>
            )}
          </Form.Group>
          <Row>
            <Button variant="success" type="submit">
              Sign In
            </Button>
            <Button variant="primary" className="mx-2">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/register"
              >
                Register
              </Link>
            </Button>
            <div className="google-login">
              <GoogleLogin
                clientId={keys.clientId}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default connect(null, { login, loginWithGoogle })(Login);
