import React, { useEffect, useContext } from "react";
import "./styleMain.css";
import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Tooltip,
} from "reactstrap";
import { IoIosHeart, IoMdExit } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "../components/Carousel";
import { GrCart } from "react-icons/gr";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Context from "../Context/Context";
import { Card, CardImg } from "reactstrap";
import { firebaseAuth, database } from "../utils/FirebaseConfig";

const Homepage = () => {
  const userContext = useContext(Context);
  const { photos, userData, setUserData } = userContext;

  const firebasesetup = () => {
    const userRef = database.ref("user/" + firebaseAuth.currentUser.uid).set({
      ...userData,
      items: [...userContext.cartItems],
    });
  };

  const setItemToCart = (item) => {
    var itemAlreadyAdded = false;
    if (userContext.cartItems.length > 0) {
      userContext.cartItems.map((i) => {
        if (item.id === i.id) itemAlreadyAdded = true;
      });
    } else {
      userContext.setItemQuantityList([
        ...userContext.itemQuantityList,
        {
          id: item.id,
          quantity: 1,
          rate: item.price,
          name: item.name,
        },
      ]);
      userContext.setCartItems([...userContext.cartItems, item]);
      firebasesetup();

      console.log("Adding new item because array is zero");
    }
    if (itemAlreadyAdded) console.log("item already included");
    else {
      userContext.setCartItems([...userContext.cartItems, item]);
      firebasesetup();
      userContext.setItemQuantityList([
        ...userContext.itemQuantityList,
        {
          name: item.name,
          id: item.id,
          quantity: 1,
          rate: item.price,
        },
      ]);
    }
  };
  // console.log(userContext.cartItems);
  // console.log("items quantity list", userContext.itemQuantityList);

  return (
    <div id="main">
      <Carousel></Carousel>
      <ToastContainer></ToastContainer>
      <Row>
        {photos.map((p) => (
          <Col key={p.id} lg="3" xl="2" md="6" xs="12">
            <Card
              id="cardsWithPhotos"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                margin: "2px 2px",
                overflow: "hidden",
              }}
            >
              <CardBody>
                <CardImg src={p.urlMedium} />
              </CardBody>
              <CardHeader style={{ backgroundColor: "#f0faef" }}>
                <CardTitle
                  varient="bottom"
                  style={{
                    display: "flex",
                    fontSize: "24px",
                    alignItems: "center",

                    justifyContent: "center",
                  }}
                >
                  {p.name}
                </CardTitle>
                <CardSubtitle
                  varient="bottom"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div
                    style={{
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                    }}
                  >
                    ${p.price}
                  </div>
                  <div style={{}}>${p.price - p.price / 100}</div>
                </CardSubtitle>
                <CardText varient="bottom">{p.description}</CardText>
              </CardHeader>
              <CardFooter style={{ padding: "2px" }}>
                <ButtonGroup
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      toast(`${p.name} Added to WishList ♥!`, {
                        type: "success",
                      });
                    }}
                  >
                    <IoIosHeart style={{ color: "black" }}></IoIosHeart>
                  </Button>
                  <Button onClick={() => setItemToCart(p)}>
                    <GrCart style={{}}></GrCart>
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Homepage;
