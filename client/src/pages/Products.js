/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductsCard from "../components/ProductsCard";
import "./Products.css";

function Products() {
  const [count, setcount] = useState("");
  useEffect(async () => {
    const countjson = await axios.get(
      `${process.env.REACT_APP_API_URL}/shop/countofallproducts`
    );

    setcount(countjson.data.count);
  }, []);

  return (
    <div>
      {/* <NavbarHalf /> */}
      <ProductsCard count={count} />
    </div>
  );
}

export default Products;
