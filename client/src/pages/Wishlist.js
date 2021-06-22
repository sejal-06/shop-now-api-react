/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import NavbarHalf from "../components/NavbarHalf";
import WishlistCard from "../components/WishlistCard";
import "./Products.css";

function Wishlist(props) {
  // const [products, setproducts] = useState([]);

  // useEffect(async () => {
  //   const tokenStr = localStorage.getItem("token");
  //   const productslist = await axios.get(
  //     "http://localhost:5000/shop/allproductsofwishlist",
  //     {
  //       headers: { Authorization: `Bearer ${tokenStr}` },
  //     }
  //   );
  //   setproducts(productslist.data.wishlist);
  // }, []);

  return (
    <div>
      <WishlistCard />
    </div>
  );
}

export default Wishlist;
