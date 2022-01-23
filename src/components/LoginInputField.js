import React from "react";
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
import { firebaseAuth as auth } from "../utils/FirebaseConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../Context/Context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginInputField = () => {
  const navigate = useNavigate();
  const userContext = useContext(Context);
  const [email, setEmail] = useState(() => {
    return "";
  });
  const [password, setPassword] = useState("");

  const checkSignin = () => {
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      userContext.setError([
        ...userContext.LoginError,
        "please enter a vailed email",
      ]);
    } else
      auth
        .signInWithEmailAndPassword(email, password)

        .then((userCredential) => {
          const user = userCredential.user;
          userContext.setUser(user);
          userContext.SetIsUserlogged(true);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          userContext.setError([
            ...userContext.LoginError,
            errorCode + errorMessage,
          ]);
        });
  };
  return (
    <Card
      style={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ minWidth: "80vw", backgroundColor: "#" }}>
        <CardTitle
          className="text-center text-style-bold"
          style={{ fontSize: "30px" }}
        >
          Login
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
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Please enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Please enter your password "
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button
              style={{ backgroundColor: "#457b9d" }}
              onClick={() => checkSignin()}
            >
              Submit
            </Button>
            <p className=" text-center mt-3">
              Dont have an account? <Link to="/signup">SignUp here!</Link>
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
  );
};

export default LoginInputField;
