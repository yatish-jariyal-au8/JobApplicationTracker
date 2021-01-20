import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user && !localStorage.getItem("user")) {
    return <Redirect to="/login" />;
  }
  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#61a5c2" }}
        expand="lg"
        collapseOnSelect
      >
        <Link to="/">
          <Navbar.Brand>
            <strong style={{ color: "#004e89" }}>
              Job Application Tracker
            </strong>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
          <NavLink
              style={{ textDecoration: "none", color: "#4c5c68" }}
              to="/"
            >
              <strong className="ml-3">Dashboard</strong>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "#f1faee" }}
              to="/forum"
            >
              <strong className="mx-4">Forum</strong>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "#a5ffd6" }}
              to="/analysis"
            >
              <strong>Data Visualize</strong>
            </NavLink>
          </Nav>
          <NavDropdown
            title={user ? <strong>{`Hi! ${user.name}`}</strong> : ""}
            id="username"
          >
            <NavDropdown.Item>
              <NavLink style={{ textDecoration: "none" }} to="/profile">
                <strong>Profile</strong>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(logout())}>
              <strong>Logout</strong>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
