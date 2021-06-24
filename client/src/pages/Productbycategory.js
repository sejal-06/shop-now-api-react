/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavbarHalf from "../components/NavbarHalf";
import ProductsCardbycategory from "../components/ProductsCardbycategory";

function Productbycategory() {
  const { category } = useParams();
  const [products, setproducts] = useState([]);

  useEffect(async () => {
    const productslist = await axios.get(
      `http://192.168.43.76:5000/shop/allproductsbycategory/${category}`
    );
    setproducts(productslist.data.products);
  }, []);

  return (
    <div>
      {/* <NavbarHalf /> */}
      <ProductsCardbycategory products={products} />
    </div>
  );
}

export default Productbycategory;
