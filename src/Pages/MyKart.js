import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import { BiSad } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Modal, Image } from "react-bootstrap";

import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  CardDeck,
  CardImg,
  Alert,
  ButtonGroup,
  Input,
  List,
  ListGroupItem,
  ListGroup,
} from "reactstrap";

import "./styleMain.css";

import ItemModal from "../components/ItemModal";
const MyKart = ({ setIsCheckoutDone }) => {
  const checkout = () => {
    setCartItems([]);
    setIsCheckoutDone(true);
    navigateTo("/payment");
  };
  const sumVal = () => {
    var sum = 0;
    itemQuantityList.forEach((i) => {
      sum = sum + i.rate * i.quantity;
    });
    return sum;
  };
  const userContext = useContext(Context);
  const { cartItems, setCartItems, itemQuantityList, setItemQuantityList } =
    userContext;
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const [modalOb, setModalOb] = useState({});
  const increaseQuantity = (item) => {
    var obj;
    itemQuantityList.forEach((i) =>
      i.id === item.id
        ? (obj = {
            name: i.name,
            id: i.id,
            quantity: i.quantity + 1,
            rate: i.rate,
          })
        : ""
    );

    const ar = itemQuantityList.filter((i) => i.id !== item.id);
    setItemQuantityList([...ar, obj]);
    // console.log("found values new obj", obj);
  };
  const decreseQuantity = (item) => {
    var obj;
    itemQuantityList.forEach((i) =>
      i.id === item.id
        ? (obj = {
            name: i.name,
            id: i.id,
            quantity: i.quantity - 1,
            rate: i.rate,
          })
        : ""
    );
    const ar = itemQuantityList.filter((i) => i.id !== item.id);
    setItemQuantityList([...ar, obj]);

    // console.log("found values new obj", obj);
  };
  const handleModal = (item) => {
    setModalOb(item);
    setShow(true);
  };

  const changeState = (e, item) => {
    var obj;
    itemQuantityList.forEach((i) =>
      i.id === item.id
        ? (obj = {
            name: i.name,
            id: i.id,
            quantity: e.target.value,
            rate: i.rate,
          })
        : ""
    );
    const ar = itemQuantityList.filter((i) => i.id !== item.id);
    setItemQuantityList([...ar, obj]);
  };
  return (
    <div
      style={{
        height: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="main"
    >
      <Container
        style={{
          marginTop: "4vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ItemModal show={show} setShow={setShow} item={modalOb} />
        <Row>
          <Col lg="8" xs="12" md="8" sm="12">
            <Card
              style={{
                overflowY: "scroll",
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "flex",
                border: "0px solid RGB(179, 211, 234)",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <CardHeader
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "2",
                  backgroundColor: "white",
                }}
              >
                <Row>
                  <Col>
                    <CardTitle>Product Details</CardTitle>
                  </Col>
                  <Col>
                    <CardTitle>Quantity</CardTitle>
                  </Col>
                  <Col>
                    <CardTitle>Price</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              {cartItems.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "monospace",
                    opacity: "0.6",
                    color: "#6c747e",
                    flexWrap: "wrap",
                  }}
                >
                  <BiSad size={300} />
                  <CardTitle style={{ fontSize: "40px" }}>
                    OOPS SO EMPTY!
                  </CardTitle>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <CardBody style={{}} key={item.id}>
                    <Row>
                      <Col>
                        <Card>
                          <CardImg
                            src={item.urlMedium}
                            onClick={() => handleModal(item)}
                          ></CardImg>
                          <CardFooter>{item.name}</CardFooter>
                        </Card>
                      </Col>
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <ButtonGroup>
                            <Button onClick={() => decreseQuantity(item)}>
                              -
                            </Button>
                            <Input
                              defaultValue={1}
                              onChange={(e) => changeState(e, item)}
                              onKeyPress={(target) =>
                                target.key == "Enter" ? "" : ""
                              }
                            ></Input>
                            <Button onClick={() => increaseQuantity(item)}>
                              +
                            </Button>
                          </ButtonGroup>
                          <CardTitle
                            style={{
                              textAlign: "center",
                              fontSize: "2.0rem",
                              fontFamily: "monospace",
                            }}
                          >
                            {
                              itemQuantityList.find((i) => item.id === i.id)
                                .quantity
                            }
                          </CardTitle>
                        </div>
                      </Col>
                      <Col style={{ display: "block", textSizeAdjust: "none" }}>
                        {itemQuantityList.find((i) => item.id === i.id).rate} X{" "}
                        {
                          itemQuantityList.find((i) => item.id === i.id)
                            .quantity
                        }{" "}
                        ={" "}
                        {itemQuantityList.find((i) => item.id === i.id).rate *
                          itemQuantityList.find((i) => item.id === i.id)
                            .quantity}
                      </Col>
                    </Row>
                  </CardBody>
                ))
              )}
            </Card>
          </Col>
          <Col lg="4" xs="12" md="4" sm="12">
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}>
              <CardHeader>
                <CardTitle
                  title="Order Summary"
                  style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    fontFamily: "monospace",
                    color: "#7b7c80",
                  }}
                >
                  ORDER SUMMARY
                </CardTitle>
              </CardHeader>

              <CardBody>
                <ListGroup style={{}}>
                  {itemQuantityList.map((i, index) => (
                    <ListGroupItem
                      key={i.id}
                      style={
                        index % 2 === 0
                          ? {
                              display: "flex",
                              justifyContent: "space-between",
                              backgroundColor: "#e6e6e6",
                              fontSize: "0.8em",
                              fontFamily: "sans-serif",
                            }
                          : {
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "0.8em",
                            }
                      }
                    >
                      <div>{index + 1}</div>
                      <div>{i.name}</div>
                      <div>
                        {i.rate}
                        {"  "}X{"  "}
                        {i.quantity}
                      </div>
                      <div>{i.quantity * i.rate}</div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
              <CardFooter
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button onClick={checkout}>Checkout</Button>
                <CardTitle
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.3em",
                  }}
                >
                  $ {sumVal()}
                </CardTitle>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyKart;
