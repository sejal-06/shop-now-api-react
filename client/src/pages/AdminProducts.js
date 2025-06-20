/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductsCardbyadmin from "../components/ProductsCardbyadmin";
import "./Products.css";

function AdminProducts() {
  const [products, setproducts] = useState([]);

  useEffect(async () => {
    const tokenStr = localStorage.getItem("token");

    const productslist = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/productsbyuser`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    setproducts(productslist.data.products);
  }, []);

  return (
    <div>
      {/* <NavbarHalf /> */}
      {products.length > 0 ? (
        <ProductsCardbyadmin products={products} />
      ) : (
        <h1>No products</h1>
      )}
    </div>
  );
}

export default AdminProducts;
