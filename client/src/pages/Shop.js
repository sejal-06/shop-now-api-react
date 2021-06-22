import React, { useState, useEffect } from "react";

import "./Shop.css";

import NavbarHalf from "../components/NavbarHalf";
import Carousel from "../components/Carousel";
import HomeCards from "../components/HomeCards";

function Shop() {
  return (
    <>
      {/* <NavbarHalf /> */}
      <Carousel />
      <p
        style={{
          fontFamily: "cursive",
          fontSize: "6vh",
          textAlign: "center",
          color: "whitesmoke",
          opacity: "0.9",
        }}
      >
        Shop till you drop!!
      </p>
      <HomeCards />
    </>
  );
}

export default Shop;
