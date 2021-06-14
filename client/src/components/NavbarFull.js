import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
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
function NavbarFull() {
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
              <Button href="/cart" style={{ color: "white" }}>
                Cart
              </Button>
              <Button href="orders" style={{ color: "white" }}>
                Orders
              </Button>
              <Button href="addproduct" style={{ color: "white" }}>
                Add Products
              </Button>
              <Button href="/adminproducts" style={{ color: "white" }}>
                Admin Products
              </Button>
            </Grid>
            <Grid item>
              <Button href="/logout" style={{ color: "white" }}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarFull;
