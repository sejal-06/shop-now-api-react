/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import NavbarHalf from "../components/NavbarHalf";
import ProductsCardbyadmin from "../components/ProductsCardbyadmin";
import "./Products.css";

function AdminProducts() {
  const [products, setproducts] = useState([]);

  useEffect(async () => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";

    const productslist = await axios.get(
      "http://192.168.100.94:5000/admin/productsbyuser",
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    setproducts(productslist.data.products);
    console.log(productslist.data);
  }, []);

  return (
    <div>
      <NavbarHalf />
      <ProductsCardbyadmin products={products} />
    </div>
  );
}

export default AdminProducts;
