import React from "react";

import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import accessories from "../images/accessories.jpg";
import bag from "../images/bag.jpg";
import dress from "../images/dress.jpg";
import goggles from "../images/goggles.jpg";
import jeans from "../images/jeans.jpg";
import shirt from "../images/shirt.jpg";
import tshirt from "../images/tshirt.jpg";
import shoes from "../images/shoes.jpg";
import watch from "../images/watch.jpg";
import perfumes from "../images/perfumes.jpg";

import "./HomeCard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "2vh",
  },
  paper: {
    position: "relative",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function HomeCards() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={bag} width="100%" alt="" />
              <div className="hiddendiv">Bags</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img
                className="gridimg"
                src={watch}
                width="100%"
                width="100%"
                alt=""
              />
              <div className="hiddendiv">Watches</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={shirt} width="100%" alt="" />
              <div className="hiddendiv">Shirts</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={accessories} width="100%" alt="" />
              <div className="hiddendiv">Accessories</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={goggles} width="100%" alt="" />
              <div className="hiddendiv">Goggles</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={perfumes} width="100%" alt="" />
              <div className="hiddendiv">Perfumes</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={dress} width="100%" alt="" />
              <div className="hiddendiv">Dresses</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={shoes} width="100%" alt="" />
              <div className="hiddendiv">Shoes</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={jeans} width="100%" alt="" />
              <div className="hiddendiv">Jeans</div>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <a href="productsbycategory/bags">
              <img className="gridimg" src={tshirt} width="100%" alt="" />
              <div className="hiddendiv">T-shirts</div>
            </a>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeCards;
