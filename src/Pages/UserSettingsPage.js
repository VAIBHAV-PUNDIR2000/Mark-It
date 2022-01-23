import React, { useContext, useState } from "react";
import { Card, ThemeProvider } from "react-bootstrap";
import {
  CardBody,
  CardFooter,
  CardHeader,
  CardImgOverlay,
  Input,
} from "reactstrap";
import Context from "../Context/Context";
import { onValue } from "firebase/database";
import { database, firebaseAuth } from "../utils/FirebaseConfig";
import { FcCameraAddon } from "react-icons/fc";
import "./styleMain.css";

const UserSettingsPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  var ob;
  const userContext = useContext(Context);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          border: "0.5px gray solid",
          minHeight: "70vh",
          minWidth: "50vw",
          margin: "2px",
          padding: "3px",
          display: "flex",
          alignItems: "center",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Card
          style={{
            border: "0.25px gray solid",
            minHeight: "400px",
            minWidth: "400px",
            borderRadius: "50%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FcCameraAddon id="cameraicon" size={100} style={{}} />
        </Card>

        <CardFooter
          style={{
            width: "100%",
            fontSize: "2em",
            textAlign: "center",
            fontSmooth: "always",
            backgroundColor: "rgb(0,0,0,0)",
          }}
        >
          {userContext.userData.name
            ? userContext.userData.name
            : "Details Not fetched well"}
        </CardFooter>
        <CardFooter style={{ backgroundColor: "white" }}>
          {userContext.userData.email
            ? userContext.userData.email
            : "Details Not fetched well"}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserSettingsPage;
