/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
import NavbarFull from "../components/NavbarFull";

import "./Product.css";

import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({}));

function Product() {
  const { id } = useParams();
  const [wishlistidarray, setwishlistidarray] = useState([]);
  const [product, setproduct] = useState({});
  const [count, setcount] = useState(1);

  const classes = useStyles();

  useEffect(async () => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    const wishlistedproducts = await axios.get(
      `http://192.168.100.94:5000/shop/allproductsofwishlist`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    setwishlistidarray(wishlistedproducts.data.wishlist);
  });

  useEffect(async () => {
    const productjson = await axios.get(
      `http://192.168.100.94:5000/shop/product/${id}`
    );
    setproduct(productjson.data.product);
    // console.log(product);
  }, []);

  const addtocart = async (val, count) => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    const product = await axios.get(
      `http://192.168.100.94:5000/shop/addtocart/${val}/${count}`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    // console.log(product.data);
  };

  const addtowishlist = async (val) => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    const product = await axios.get(
      `http://192.168.100.94:5000/shop/addtowishlist/${val}`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    // console.log(product.data);
  };

  const removefromwishlist = async (val) => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    const product = await axios.get(
      `http://192.168.100.94:5000/shop/deletefromwishlist/${val}`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    // console.log(product.data);
  };

  return (
    <div>
      <NavbarFull />
      <Paper style={{ margin: "15vh 2vw 5vw 2vw" }}>
        <Grid container spacing={2}>
          <Grid style={{ position: "relative" }} item xs={12} md={4}>
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <img src={product.imageUrl} width="100%" alt="" />
            </div>
          </Grid>
          <Grid item xs={12} md={8} style={{ padding: "5vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="titleproduct">{product.title}</div>
              <div>
                {wishlistidarray
                  .map((prod, index) => {
                    return prod.productId;
                  })
                  .indexOf(product._id) != -1 ? (
                  <FavoriteIcon
                    onClick={(e) => removefromwishlist(product._id)}
                    color="secondary"
                    fontSize="large"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={(e) => addtowishlist(product._id)}
                    color="secondary"
                    fontSize="large"
                  />
                )}
              </div>
            </div>

            <div className="companyNameproduct">{product.companyName}</div>
            <div className="priceproduct">₹ {product.price}</div>

            <div className="aboutheading">About Product</div>
            <hr />
            <div className="descriptionproduct">{product.description}</div>

            <div className="colorheading">Color</div>
            <div
              style={{
                width: "20px",
                display: "inline-block",
                height: "20px",
                backgroundColor: `${product.color}`,
              }}
            ></div>

            <br />
            <div className="categoryheading">Category</div>
            <div className="category">{product.category}</div>
            <br />
            <div className="quantityheading">Quantity</div>
            <div className="quantity">
              <ButtonGroup>
                <Button
                  size="small"
                  aria-label="reduce"
                  onClick={() => {
                    setcount(Math.max(count - 1, 1));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button size="small">{count}</Button>
                <Button
                  size="small"
                  aria-label="increase"
                  onClick={() => {
                    setcount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>

            <Grid style={{ marginTop: "20px" }} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  startIcon={<LocalMallIcon />}
                  onClick={(e) => addtocart(product._id, count)}
                  href="/cart"
                  size="large"
                  variant="contained"
                  style={{ width: "100%" }}
                  color="primary"
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  startIcon={<FavoriteIcon />}
                  onClick={(e) => addtowishlist(product._id)}
                  size="large"
                  variant="contained"
                  style={{ width: "100%" }}
                  color="primary"
                >
                  Add to Wishlist
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Product;
