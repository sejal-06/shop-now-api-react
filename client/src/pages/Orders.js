/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import easyinvoice from "easyinvoice";
import "./Orders.css";
// import logo from '../../public/shopnow-logo.png'

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
  // const [productarr, setproductarr] = useState([]);
  const [show, setshow] = useState(false);
  useEffect(async () => {
    try {
      const tokenStr = localStorage.getItem("token");
      var allorders = await axios.get(
        `${process.env.REACT_APP_API_URL}/shop/allorders`,
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );
      setordersarr(allorders.data.orders);
      if (allorders.data.msg == "no orders yet") setshow(true);
      var ini = [];
      var arrorders = allorders.data.orders;
      var datearr = [];
      var totalamount = [];
      var deleted = [];

      for (var i = 0; i < arrorders.length; i++) {
        var subini = [];
        let j;
        var singleorderamount = 0;
        // var subinvoiceprod=[]
        for (j = 0; j < arrorders[i].length - 1; j++) {
          // console.log("in");
          const id = arrorders[i][j].productId;
          var productjson;
          try {
            productjson = await axios.get(
              `${process.env.REACT_APP_API_URL}/shop/product/${id}`
            );
          } catch (err) {
            if (err.response && err.response.data.msg == "product not found") {
              productjson = await axios.get(
                `${process.env.REACT_APP_API_URL}/admin/deletedproduct/${id}`
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
      // console.log(deleted[0]);
    } catch (err) {
      // window.location.reload();
    }
  }, []);

  const fetchprod = (id) => {
    window.location.href = `/product/${id}`;
  };
  const fetchdeletedprod = (id) => {
    window.location.href = `/deletedproduct/${id}`;
  };

  const handleinvoice = (i) => {
    var invoicearr = [];

    for (var j = 0; j < ordersarr[i].length - 1; j++) {
      var obj = {
        quantity: ordersarr[i][j].quantity,
        description:
          productdetailmatrix[i][j].title[0].toUpperCase() +
          productdetailmatrix[i][j].title.slice(1).toLowerCase(),
        tax: "0",
        price: productdetailmatrix[i][j].price,
      };
      invoicearr.push(obj);
    }

    // console.log("one element " + invoicearr[0]);
    var d =
      new Date().getDate() +
      "-" +
      (+new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();
    var data = {
      //"documentTitle": "RECEIPT", //Defaults to INVOICE
      currency: "INR",
      taxNotation: "gst", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      // logo: "shopnow-logo.png",
      logo: "https://previews.123rf.com/images/makkuro/makkuro1510/makkuro151000145/47163781-sale-colorful-shopping-cart-with-bags-isolated-on-white-background.jpg", //or base64
      //"logoExtension": "png", //only when logo is base64
      sender: {
        company: "Shop Now",
        address: "Kukatpully",
        city: "Hyderabad",
        zip: "500005",
        country: "India",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      // client: {
      //   company: "Client ",
      //   address: "Clientstreet 456",
      //   zip: "452009",
      //   city: "Indore",
      //   country: "India",
      //   //"custom1": "custom value 1",
      //   //"custom2": "custom value 2",
      //   //"custom3": "custom value 3"
      // },
      invoiceNumber: Date.now(),
      invoiceDate: d,

      products: invoicearr,
      bottomNotice: "Shop till you drop!!",
    };
    easyinvoice.createInvoice(data, function (result) {
      //The response will contain a base64 encoded PDF file
      const link = document.createElement("a");
      var _URL = window.URL || window.webkitURL;

      fetch("data:application/pdf;base64," + result.pdf)
        .then((data) => data.blob())
        .then((blob) => {
          link.href = _URL.createObjectURL(blob);
          link.download = `${Date.now()}-invoice.pdf`;
          link.click();
        });
    });
  };

  return (
    <Grid container spacing={3} className={classes.top}>
      {show ? (
        // productdetailmatrix.length == 0
        <h1>No previous orders</h1>
      ) : (
        productdetailmatrix.map((order, i) => (
          <Grid item xs={12}>
            <Grid
              container
              style={{ borderRadius: "8px", background: "rgba(0, 0, 0, 0.90)" }}
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
                            style={{ filter: "opacity(0.5)" }}
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
                          fontSize: "1.05rem",
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
                <Grid container className="total">
                  <Grid item xs={6} sm={6} md={4}>
                    TOTAL &nbsp; ₹{total[i]}
                  </Grid>
                  <Grid className="invoice" item xs={6} sm={6} md={8}>
                    <a onClick={() => handleinvoice(i)} href="javascript:;">
                      Generate Invoice
                    </a>{" "}
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
