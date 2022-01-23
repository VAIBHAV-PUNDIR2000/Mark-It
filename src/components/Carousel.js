import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const items = [
  {
    src: "https://source.unsplash.com/1600x400?smartphones",
    header: "SMARTHPHONES",
  },
  {
    src: "https://source.unsplash.com/1600x400?shirts",
    header: "CLOTHINGS",
  },
  {
    src: "https://source.unsplash.com/1600x400?shoes",

    header: "FOOTWEARS",
  },
];

const Carousel = () => {
  return (
    <div>
      <UncontrolledCarousel items={items} />
    </div>
  );
};

export default Carousel;
