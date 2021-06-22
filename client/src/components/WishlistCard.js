/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./ProductCard.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  topContainer: {
    marginTop: "8vh",
    padding: "1vw",
  },
  root: {
    padding: "0.5vw",
  },
  media: {
    height: "33vh",
    backgroundSize: "contain",
  },
}));

function WishlistCard(props) {
  const [wishlistarray, setwishlistarray] = useState([]);

  //   const productslist = props.products;
  const classes = useStyles();

  useEffect(async () => {
    const tokenStr = localStorage.getItem("token");
    const wishlistedproductsres = await axios.get(
      `http://localhost:5000/shop/allproductsofwishlist`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    const wishlistedproducts = wishlistedproductsres.data.wishlist;
    const newarr = [];
    for (var i of wishlistedproducts) {
      const productslist = await axios.get(
        `http://localhost:5000/shop/product/${i.productId}`
      );
      newarr.push(productslist.data.product);
    }
    // console.log(newarr);
    setwishlistarray(newarr);
    console.log(wishlistarray);
  });

  const addtocart = async (val) => {
    const tokenStr = localStorage.getItem("token");

    const product = await axios.get(
      `http://localhost:5000/shop/addtocart/${val}/1`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    // console.log(product.data);
  };
  const addtowishlist = async (val) => {
    // setwishlist(true);
    try {
      const tokenStr = localStorage.getItem("token");
      const product = await axios.get(
        `http://localhost:5000/shop/addtowishlist/${val}`,
        { headers: { Authorization: `Bearer ${tokenStr}` } }
      );
    } catch (err) {
      console.log(err);
      window.location.href = "/wishlist";
    }
    // console.log(product.data);
  };
  const removefromwishlist = async (val) => {
    // setwishlist(false);
    try {
      const tokenStr = localStorage.getItem("token");
      const product = await axios.get(
        `http://localhost:5000/shop/deletefromwishlist/${val}`,
        { headers: { Authorization: `Bearer ${tokenStr}` } }
      );
    } catch (err) {
      console.log(err);
      window.location.href = "/wishlist";
    }
    // console.log(product.data);
  };

  return (
    <div>
      <Grid container spacing={1} className={classes.topContainer}>
        {wishlistarray.length === 0 ? (
          <h1>No products in wishlist</h1>
        ) : (
          wishlistarray.map((product) => (
            <Grid
              item
              className={classes.productcontainer}
              xs={6}
              sm={4}
              md={3}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <a href={"/product/" + product._id}>
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                    />
                  </a>

                  <CardContent style={{ padding: "8px", paddingLeft: "13px" }}>
                    <Grid container justify="space-between">
                      <Grid item xs={11}>
                        <div className="title" variant="h5" component="h2">
                          {product.title}
                        </div>
                        <div
                          className="companyName"
                          style={{ textTransform: "uppercase" }}
                        >
                          {product.companyName}
                        </div>
                      </Grid>

                      <Grid item xs={1}>
                        <FavoriteIcon
                          onClick={(e) => removefromwishlist(product._id)}
                          color="secondary"
                          fontSize="medium"
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      style={{ fontSize: "1.25rem", fontWeight: "600" }}
                    >
                      ₹ {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid container justify="space-between">
                    <Grid item xs={12} md={12}>
                      <Button
                        startIcon={<ShoppingCartIcon />}
                        size="medium"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                        onClick={(e) => addtocart(product._id)}
                        variant="contained"
                        color="primary"
                        href="/cart"
                      >
                        Add to Cart
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {/* <div
        style={{ width: "50%", margin: "auto", marginBottom: "30vh" }}
        className={classes.pagination}
      >
        <Pagination
            count={Math.ceil(productslist.length / 8)}
            color="primary"
          />
      </div> */}
    </div>
  );
}

export default WishlistCard;
