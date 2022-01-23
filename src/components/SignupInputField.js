import React, { useEffect } from "react";

// reactStrap Comments
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//FireabseAuth

import { firebaseAuth as auth, database } from "../utils/FirebaseConfig";

//BootStrap

import "bootstrap/dist/css/bootstrap.min.css";

import Context from "../Context/Context";
import { Link } from "react-router-dom";

const SignupInputField = () => {
  const userContext = useContext(Context);

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [cnfmPassword, setCnfmPassword] = useState();
  // const [showErr, setShowErr] = useState(false);
  const { userData, setUserData } = userContext;
  const navigate = useNavigate();

  const firebasesetup = () => {
    const userRef = database.ref("user/" + auth.currentUser.uid).set({
      name: name,
      uid: auth.currentUser.uid,
      email: email,
    });
  };
  const formVailedator = () => {
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      userContext.setError([
        ...userContext.LoginError,
        "Please enter a Vailed e mail",
      ]);
    } else if (password !== cnfmPassword) {
      userContext.setError([
        ...useContext.LoginError,
        "please enter a password that would match",
      ]);
    }

    if (userContext.LoginError.length === 0) Signup();
  };

  const Signup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userContext.setUser(userCredential.user);
        userContext.setName(name);
        userContext.setEmail(email);
        userContext.setUid(userCredential.user.uid);

        userContext.observe();
        firebasesetup();
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        userContext.setError([
          ...userContext.LoginError,
          `Error Code :${errorCode}
        ` + error.message,
        ]);
        // ..
      });

    userContext.setUser(auth.currentUser);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "6vh",
      }}
    >
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{ minWidth: "80vw", backgroundColor: "#", marginTop: "8px" }}
        >
          <CardTitle className="text-center " style={{ fontSize: "30px" }}>
            Signup
          </CardTitle>
          <CardBody>
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "80vw",
              }}
            >
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  type="Name"
                  name="Name"
                  id="Name"
                  placeholder="Please Enter your full name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Please Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="8-256 Characters"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword"> Confirm Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="exampleConfirmPassword"
                  placeholder="8-256 Characters"
                  onChange={(e) => setCnfmPassword(e.target.value)}
                />
              </FormGroup>

              <Button
                style={{ backgroundColor: "#457b9d" }}
                onClick={() => formVailedator()}
              >
                Submit
              </Button>
              <p className=" text-center mt-3">
                Already have an account? <Link to="/login">Login Here!</Link>
              </p>
              <p className=" text-center mt-1">
                <a href="#">Forgot Password?</a>
              </p>
            </Form>
          </CardBody>
        </Card>
        {userContext.LoginError.map((value) => (
          <Alert
            color="info"
            isOpen={userContext.LoginError.length > 0}
            toggle={() =>
              userContext.setError([
                ...userContext.LoginError.filter((e) => e !== value),
              ])
            }
            style={{
              minWidth: "82vw",
              position: "relative",
            }}
          >
            {value}
          </Alert>
        ))}
      </Card>
    </div>
  );
};

export default SignupInputField;
