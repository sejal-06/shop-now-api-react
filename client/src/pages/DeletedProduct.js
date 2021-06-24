/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import "./Product.css";

const useStyles = makeStyles((theme) => ({}));

function DeletedProduct() {
  const { id } = useParams();

  const [product, setproduct] = useState({});

  useEffect(async () => {
    const productjson = await axios.get(
      `http://192.168.72.94:5000/admin/deletedproduct/${id}`
    );
    setproduct(productjson.data.product);
    // console.log(product);
  }, []);

  return (
    <div>
      {/* <NavbarFull /> */}
      <Paper
        style={{
          zIndex: "1",
          position: "relative",
          margin: "15vh 2vw 5vw 2vw",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            background: "#f50057",
            color: "white",
            padding: "5px",
            fontSize: "1.25rem",
          }}
        >
          <div>Out of Stock</div>
        </div>
        <Grid container spacing={2}>
          <Grid style={{ position: "relative" }} item xs={12} md={4}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                style={{ zIndex: "-1" }}
                src={product.imageUrl}
                width="100%"
                alt=""
              />
            </div>
          </Grid>
          <Grid item xs={12} md={8} style={{ padding: "5vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="titleproduct">{product.title}</div>
            </div>

            <div className="companyNameproduct">{product.companyName}</div>
            <div className="priceproduct">₹ {product.price}</div>

            <div className="aboutheading">About Product</div>
            <hr />
            <div className="descriptionproduct">{product.description}</div>

            <Grid spacing={1} container direction="column">
              <Grid item>
                <Grid container>
                  <Grid item xs={6} sm={4} md={3}>
                    <div style={{ margin: "5px" }} className="colorheading">
                      Color
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={8} md={9}>
                    <div
                      style={{
                        margin: "5px",
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                        border: "1px solid black",
                        backgroundColor: `${product.color}`,
                      }}
                    ></div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={6} sm={4} md={3}>
                    {product.type && product.type.length ? (
                      <div style={{ margin: "5px" }} className="colorheading">
                        Type
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6} sm={8} md={9}>
                    {product.type && product.type.length
                      ? product.type.map((ty) => (
                          <div style={{ margin: "5px" }} className="category">
                            {ty}
                          </div>
                        ))
                      : ""}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={6} sm={4} md={3}>
                    {product.category && product.category.length ? (
                      <div style={{ margin: "5px" }} className="colorheading">
                        Category
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6} sm={8} md={9}>
                    {product.category && product.category.length
                      ? product.category.map((cat) => (
                          <div style={{ margin: "5px" }} className="category">
                            {cat}
                          </div>
                        ))
                      : ""}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default DeletedProduct;
