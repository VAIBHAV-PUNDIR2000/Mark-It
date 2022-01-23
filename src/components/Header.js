import React, { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import logo from "../logo.png";
import { firebaseAuth as auth } from "../utils/FirebaseConfig";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import Context from "../Context/Context";

const Header = ({ loadingProgress, setLoadingProgress }) => {
  const userContext = useContext(Context);

  const Signout = () =>
    auth.signOut().then(() => {
      userContext.setLoadingProgress(100);
      // userContext.setError("signed out successfully");
    });

  return (
    <Navbar
      sticky="top"
      style={{
        backgroundColor: "#f1faee",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
      expand="sm"
    >
      <Container fluid style={{ position: "static" }}>
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              src={logo}
              style={{
                objectFit: "contain",
                maxHeight: "80px",

                maxWidth: "120px",
                margin: "2px 2px",
                boxShadow:
                  " #f0faef0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
              }}
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={userContext.isUserLogged ? {} : { display: "none" }}
        />
        <Navbar.Collapse
          id="navbarScroll"
          style={userContext.isUserLogged ? {} : { display: "none" }}
        >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              style={userContext.isUserLogged ? {} : { display: "none" }}
            >
              Explore
            </Nav.Link>
            <Nav.Link
              style={userContext.isUserLogged ? {} : { display: "none" }}
            >
              <Link
                to="/mykart"
                style={{ textDecoration: "none", color: "unset" }}
              >
                MyKart
              </Link>
            </Nav.Link>
            <NavDropdown
              title="MyAccount"
              id="navbarScrollingDropdown"
              style={userContext.isUserLogged ? {} : { display: "none" }}
            >
              <NavDropdown.Item>Change Picture</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/usersettings" style={{ textDecoration: "none" }}>
                  Settings
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => Signout()}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" style={{ width: "50%" }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={
                userContext.isUserLogged
                  ? { border: "2px solid #4280c6   " }
                  : { display: "none", border: "2px solid #4280c6   " }
              }
            />
            <Button
              variant="outline"
              style={{ backgroundColor: "#457b9d" }}
              style={userContext.isUserLogged ? {} : { display: "none" }}
            >
              <BsSearch></BsSearch>
            </Button>
          </Form>
        </Navbar.Collapse>
        <LoadingBar
          color="#457b9d"
          progress={loadingProgress}
          onLoaderFinished={() => setLoadingProgress(0)}
          loaderSpeed={1000}
          shadow={true}
          transitionTime={600}
          style={{
            height: "3px",
            top: "40px",
          }}
        />
      </Container>
    </Navbar>
  );
};

export default Header;
