import React from "react";
import axios from "axios";
import { Image, ModalTitle, Header, Modal, ModalBody } from "react-bootstrap";

const ItemModal = ({ item, show, setShow }) => {
  return (
    <div>
      <Modal show={show} centered>
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <ModalTitle>{item.name}</ModalTitle>
        </Modal.Header>
        <ModalBody>{item.description}</ModalBody>
        <Image src={item.urlOriginal}></Image>
      </Modal>
    </div>
  );
};

export default ItemModal;
