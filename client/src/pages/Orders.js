/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import "./Orders.css";

const useStyles = makeStyles({
  top: {
    marginTop: "10vh",
    padding: "1vw",
  },

  root: {
    maxWidth: 300,
  },
  media: {
    height: "25vh",
    backgroundSize: "contain",
  },
});

function Orders() {
  const [ordersarr, setordersarr] = useState([]);
  const [total, settotal] = useState("");
  const classes = useStyles();
  const [productdetailmatrix, setproductdetailMatrix] = useState([]);
  const [date, setdate] = useState([]);
  const [deletedproduct, setdeletedproduct] = useState([]);
  useEffect(async () => {
    try {
      const tokenStr = localStorage.getItem("token");
      var allorders = await axios.get(
        `http://192.168.176.94:5000/shop/allorders`,
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );
      setordersarr(allorders.data.orders);

      var ini = [];
      var arrorders = allorders.data.orders;
      var datearr = [];
      var totalamount = [];
      var deleted = [];
      for (var i = 0; i < arrorders.length; i++) {
        var subini = [];
        let j;
        var singleorderamount = 0;
        for (j = 0; j < arrorders[i].length - 1; j++) {
          console.log("in");
          const id = arrorders[i][j].productId;
          var productjson;
          try {
            productjson = await axios.get(
              `http://192.168.176.94:5000/shop/product/${id}`
            );
          } catch (err) {
            if (err.response && err.response.data.msg == "product not found") {
              productjson = await axios.get(
                `http://192.168.176.94:5000/admin/deletedproduct/${id}`
              );
              deleted.push(id);
            }
          }
          singleorderamount +=
            arrorders[i][j].quantity * productjson.data.product.price;
          subini.push(productjson.data.product);
        }
        ini.push(subini);
        totalamount.push(singleorderamount);
        datearr.push(arrorders[i][j].orderdate);
      }

      setproductdetailMatrix(ini);
      setdate(datearr);
      settotal(totalamount);
      setdeletedproduct(deleted);
      console.log(deleted[0]);
    } catch (err) {}
  }, []);

  const fetchprod = (id) => {
    window.location.href = `/product/${id}`;
  };
  const fetchdeletedprod = (id) => {
    window.location.href = `/deletedproduct/${id}`;
  };

  return (
    <Grid container spacing={3} className={classes.top}>
      {productdetailmatrix.length == 0 || productdetailmatrix.length == 0 ? (
        <h1>No previous orders</h1>
      ) : (
        productdetailmatrix.map((order, i) => (
          <Grid item xs={12}>
            <Grid
              container
              style={{ background: "rgba(0, 0, 0, 0.75)" }}
              spacing={2}
            >
              <Grid item className="date" xs={12}>
                {date[i]}
              </Grid>
              {order.map((item, j) => (
                <Grid item xs={6} sm={3} md={2}>
                  <Card
                    className={classes.root}
                    style={{ position: "relative" }}
                  >
                    <CardActionArea>
                      {deletedproduct.some(
                        (id) => id == productdetailmatrix[i][j].prodId
                      ) ? (
                        <div style={{ position: "relative" }}>
                          <CardMedia
                            className={classes.media}
                            image={productdetailmatrix[i][j].imageUrl}
                            onClick={() => {
                              fetchdeletedprod(
                                productdetailmatrix[i][j].prodId
                              );
                            }}
                          />
                          <div
                            onClick={() => {
                              fetchdeletedprod(
                                productdetailmatrix[i][j].prodId
                              );
                            }}
                            style={{
                              position: "absolute",
                              background: "#000000ab",
                              color: "red",
                              display: "inline",
                              top: "50%",
                              width: "100%",
                              textAlign: "center",
                              fontFamily: "Noto Sans JP",
                            }}
                          >
                            <h3>Out of Stock</h3>
                          </div>
                        </div>
                      ) : (
                        <CardMedia
                          className={classes.media}
                          image={productdetailmatrix[i][j].imageUrl}
                          onClick={() => {
                            fetchprod(productdetailmatrix[i][j]._id);
                          }}
                        />
                      )}
                    </CardActionArea>
                    <CardActions className="orderprice">
                      ₹ {productdetailmatrix[i][j].price}
                    </CardActions>
                    <div
                      style={{
                        background: "#cfcacac4",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        padding: "4px",
                        borderRadius: "10%",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        x{ordersarr[i][j].quantity}
                      </div>
                    </div>
                  </Card>
                </Grid>
              ))}
              <Grid item className="date" xs={12}>
                <Grid container>
                  <Grid item xs={6} sm={6} md={4}>
                    TOTAL - ₹{total[i]}
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <a href={"/invoice/" + i}>Generate Invoice</a>{" "}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Orders;
