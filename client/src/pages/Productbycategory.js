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
      `${process.env.REACT_APP_API_URL}/shop/allproductsbycategory/${category}`
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
