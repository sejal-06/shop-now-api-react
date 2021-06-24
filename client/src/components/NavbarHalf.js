import React, { useEffect, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function NavbarHalf() {
  const classes = useStyles();
  const [tab, settab] = useState("");
  useEffect(() => {
    settab(window.location.pathname);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar style={{ background: "black" }} position="fixed">
        <Toolbar>
          <img width="47px" src="shopnow-logo.png" alt="" />
          <Grid container justify="space-between">
            <Grid item>
              {tab == "/shop" ? (
                <Button
                  href="/shop"
                  style={{
                    margin: "0px 6px",
                    boxShadow: "#f5f5f5ad 0 1px",
                    color: "white",
                  }}
                >
                  Shop
                </Button>
              ) : (
                <Button
                  href="/shop"
                  style={{ margin: "0px 6px", color: "white" }}
                >
                  Shop
                </Button>
              )}
              {tab == "/products" ? (
                <Button
                  href="/products"
                  style={{
                    margin: "0px 6px",
                    boxShadow: "#f5f5f5ad 0 1px",
                    color: "white",
                  }}
                >
                  Products
                </Button>
              ) : (
                <Button
                  href="/products"
                  style={{ margin: "0px 6px", color: "white" }}
                >
                  Products
                </Button>
              )}

              {/* <Button style={{ color: "white" }}>Cart</Button>
              <Button style={{ color: "white" }}>Orders</Button>
              <Button style={{ color: "white" }}>Add Products</Button>
              <Button style={{ color: "white" }}>Admin Products</Button> */}
            </Grid>
            <Grid item>
              {tab == "/login" || tab == "/signup" ? (
                <Button
                  href="/login"
                  style={{
                    margin: "0px 6px",
                    boxShadow: "#f5f5f5ad 0 1px",
                    color: "white",
                  }}
                >
                  Login / SignUp
                </Button>
              ) : (
                <Button href="/login" style={{ color: "white" }}>
                  Login / SignUp
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarHalf;
