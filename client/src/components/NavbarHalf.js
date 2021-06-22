import React from "react";

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

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "black" }} position="fixed">
        <Toolbar>
          <img width="47px" src="shopnow-logo.png" alt="" />
          <Grid container justify="space-between">
            <Grid item>
              <Button href="/shop" style={{ color: "white" }}>
                Shop
              </Button>
              <Button href="/products" style={{ color: "white" }}>
                Products
              </Button>
              {/* <Button style={{ color: "white" }}>Cart</Button>
              <Button style={{ color: "white" }}>Orders</Button>
              <Button style={{ color: "white" }}>Add Products</Button>
              <Button style={{ color: "white" }}>Admin Products</Button> */}
            </Grid>
            <Grid item>
              <Button href="/login" style={{ color: "white" }}>
                Login / SignUp
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarHalf;
