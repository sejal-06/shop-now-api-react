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

import DeleteIcon from "@material-ui/icons/Delete";

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

function ProductsCardbyadmin(props) {
  // const [wishlistidarray, setwishlistidarray] = useState([]);
  const [productslist, setproductslist] = useState(props.products);
  // const productslist = props.products;
  const classes = useStyles();

  useEffect(async () => {
    // const tokenStr =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    // const wishlistedproducts = await axios.get(
    //   `http://192.168.100.94:5000/shop/allproductsofwishlist`,
    //   { headers: { Authorization: `Bearer ${tokenStr}` } }
    // );
    // setwishlistidarray(wishlistedproducts.data.wishlist);
  });

  const deleteproductbyadmin = async (val) => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    const product = await axios.get(
      `http://192.168.100.94:5000/admin/deleteproduct/${val}`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );

    console.log(product.data);
    const newproductarr = productslist.filter((product) => product._id != val);
    setproductslist(newproductarr);
  };

  return (
    <div>
      <Grid container spacing={1} className={classes.topContainer}>
        {productslist.length === 0 ? (
          <h1>No products</h1>
        ) : (
          productslist.map((product) => (
            <Grid
              item
              className={classes.productcontainer}
              xs="6"
              sm="4"
              md="3"
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <a href={"/product/" + product._id}>
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                    />
                  </a>
                  <CardContent
                    style={{
                      padding: "8px",
                      paddingLeft: "13px",
                      position: "relative",
                    }}
                  >
                    <Grid container>
                      <Grid item xs="12">
                        <div
                          onClick={(e) => deleteproductbyadmin(product._id)}
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            marginTop: "13px",
                            marginRight: "8px",
                          }}
                        >
                          <DeleteIcon />
                        </div>
                        <Typography
                          className="title"
                          variant="h5"
                          component="h2"
                        >
                          {product.title}
                        </Typography>
                        <div
                          className="companyName"
                          style={{ textTransform: "uppercase" }}
                        >
                          {product.companyName}
                        </div>
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
                        size="medium"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                        variant="contained"
                        color="primary"
                        href={"/product/" + product._id}
                      >
                        Edit Product
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {productslist.length ? (
        <div
          style={{ width: "50%", margin: "auto", marginBottom: "30vh" }}
          className={classes.pagination}
        >
          <Pagination
            count={Math.ceil(productslist.length / 8)}
            color="primary"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductsCardbyadmin;
