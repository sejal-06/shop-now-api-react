import React, { useState, useEffect } from "react";
import axios from "axios";

import NavbarHalf from "../components/NavbarHalf";
import ProductsCard from "../components/ProductsCard";
import "./Products.css";

function Products() {
  const [products, setproducts] = useState([]);

  useEffect(async () => {
    const productslist = await axios.get(
      "http://192.168.100.94:5000/shop/allproducts"
    );
    setproducts(productslist.data.products);
  }, []);

  return (
    <div>
      <NavbarHalf />
      <ProductsCard products={products} />
    </div>
  );
}

export default Products;
