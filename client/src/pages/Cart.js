/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CartItemContainer from "../components/CartItemContainer";
import axios from "axios";

import NavbarFull from "../components/NavbarFull";

function Cart() {
  const [cartproducts, setcartproducts] = useState([]);
  // const [totalprice, settotalprice] = useState(0);

  useEffect(async () => {
    const tokenStr = localStorage.getItem("token");
    const products = await axios.get(
      `http://192.168.176.94:5000/shop/allproductsofcart`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    setcartproducts(products.data.cart);
    // console.log("in cart.js" + products.data.cart[0].productId);
  });

  return (
    <div>
      {/* <NavbarFull /> */}
      {cartproducts.length === 0 ? (
        <h1 style={{ color: "white", marginTop: "15vh" }}>No items yet</h1>
      ) : (
        <div style={{ marginTop: "10vh" }}>
          <CartItemContainer
            // totalprice={totalprice}
            cartproducts={cartproducts}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;
