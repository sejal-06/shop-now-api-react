//  eslint-disable jsx-a11y/no-distracting-elements
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartItemContainer.css";
import { Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

function CartItemCards(props) {
  const classes = useStyles();

  const [productarr, setproductarr] = useState([]);
  const [totalprice, settotalprice] = useState(0);

  const removefromcart = async (val) => {
    const tokenStr = localStorage.getItem("token");
    await axios.get(`http://192.168.43.76:5000/shop/deletefromcart/${val}`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });

    var arrafterdeletion = [];
    var deleteprice = 0;
    var deletequan = 0;

    await productarr.forEach((product) => {
      if (product._id == val) {
        deletequan = product.quantity;
        deleteprice = product.price;
      } else {
        arrafterdeletion.push(product);
      }
    });

    setproductarr(arrafterdeletion);
    settotalprice(totalprice - deleteprice * deletequan);
  };

  const handleincrea = async (id, index) => {
    var countval = productarr[index].quantity + 1;
    const tokenStr = localStorage.getItem("token");
    await axios.get(
      `http://192.168.43.76:5000/shop/changequantityofcartto/${id}/${countval}`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );

    settotalprice(totalprice + productarr[index].price);
    var newprodarr = [...productarr];
    newprodarr[index].quantity = countval;
    setproductarr(newprodarr);
  };

  const handledecrea = async (id, index) => {
    if (productarr[index].quantity == 1) {
      return;
    }
    var countval = productarr[index].quantity - 1;
    const tokenStr = localStorage.getItem("token");
    await axios.get(
      `http://192.168.43.76:5000/shop/changequantityofcartto/${id}/${countval}`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );

    settotalprice(totalprice - productarr[index].price);
    var newprodarr = [...productarr];
    newprodarr[index].quantity = countval;
    setproductarr(newprodarr);
  };

  useEffect(async () => {
    const tokenStr = localStorage.getItem("token");

    var allinfo = [];

    var cartproducts = props.cartproducts;
    for (var product of cartproducts) {
      var productbyid = await axios.get(
        `http://192.168.43.76:5000/shop/product/${product.productId}`,
        { headers: { Authorization: `Bearer ${tokenStr}` } }
      );

      allinfo.push({
        quantity: product.quantity,
        ...productbyid.data.product,
      });
    }
    setproductarr(allinfo);
    var price = 0;
    allinfo.forEach((product) => {
      price += product.price * product.quantity;
    });
    settotalprice(price);
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {productarr.map((product, index) => (
            <Paper
              style={{
                height: "175px",
                overflow: "hidden",
                //  margin: "1rem"
                margin: "0.5rem",
              }}
            >
              <Grid style={{ height: "100%" }} container>
                <Grid
                  className="imagehover"
                  style={{ height: "100%" }}
                  onClick={() => {
                    window.location.href = `/product/${product._id}`;
                  }}
                  item
                  xs={4}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      backgroundColor: "black",
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      width="100%"
                      style={{ maxHeight: "100%", objectFit: "contain" }}
                      alt=""
                    />
                  </div>
                </Grid>
                <Grid
                  style={{ padding: "1rem", position: "relative" }}
                  item
                  xs={8}
                >
                  <div className="titleprod">{product.title}</div>
                  <div className="companyNameprod">{product.companyName}</div>
                  <div className="priceprod">₹ {product.price}</div>
                  {/* <div className="quantityhead">Quantity</div> */}
                  <div className="quan">
                    <ButtonGroup>
                      <Button
                        size="small"
                        aria-label="reduce"
                        onClick={() =>
                          handledecrea(
                            product._id,
                            // Math.max(product.quantity - 1, 1),
                            index
                          )
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button size="small">{product.quantity}</Button>
                      <Button
                        size="small"
                        aria-label="increase"
                        onClick={() =>
                          handleincrea(
                            product._id,
                            // Math.max(product.quantity + 1, 1),
                            index
                          )
                        }
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </div>

                  <div
                    style={{
                      display: "block",
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                    }}
                  >
                    <CancelIcon onClick={(e) => removefromcart(product._id)} />
                  </div>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              position: "sticky",
              top: "5rem",
              margin: "0.5rem",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            <marquee
              style={{
                borderBottom: "2px solid #746f6f7a",
              }}
              direction=""
            >
              <img src="shopnow-logo.png" width="100px" alt="" />
            </marquee>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow style={{ fontSize: "1rem" }}>
                    <StyledTableCell>Items</StyledTableCell>
                    <StyledTableCell align="right">Price(₹)</StyledTableCell>
                    <StyledTableCell align="right">Quantity</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productarr.map((product, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.quantity}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
              Total Price: <span>₹{totalprice}</span>
            </h2>
            <Grid style={{ background: "whitesmoke" }} container>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
                xs={6}
              >
                <div style={{ alignSelf: "center", fontFamily: "Roboto" }}>
                  {" "}
                  ₹ {totalprice}
                </div>
              </Grid>
              <Grid item xs={6}>
                {productarr.length === 0 ? (
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    disabled
                  >
                    Place Order
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="secondary"
                    href="/placeorder"
                  >
                    Place Order
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default CartItemCards;
