/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Paper,
  List,
  SwipeableDrawer,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

import "./NavbarFull.css";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const rawTheme = createMuiTheme({
  // ...theme,
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#06c",
    },
    inherit: {
      main: "#000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  typeroot: {
    display: "flex",
  },
  swipe: {
    "&>.MuiDrawer-paperAnchorRight": {
      background: "#030303db",
      color: "whitesmoke",
    },
  },
  chiproot: {
    marginTop: "1rem",
    minHeight: "32px",
    width: "100%",
    border: "0.75px solid #d0d0d0",
    paddingTop: "8px",
    paddingBottom: "8px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  text: {
    textAlign: "center",
  },
  button: {
    margin: "auto",
    marginTop: "15px",
    fontSize: "1rem",
    padding: "10px",
    width: "40%",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function NavbarFull() {
  const classes = useStyles();
  const [cartcount, setcartcount] = useState();
  const [tab, settab] = useState();
  const [open, setOpen] = React.useState(false);

  let [formData, setFormData] = useState({
    title: "",
    price: "",
    companyName: "",
    imageUrl: "",
    color: "#000000",
    description: "",
  });

  const [file, setfile] = useState(null);
  const inputFile = useRef();
  async function handleFile(event) {
    setfile(event.target.files[0]);
  }

  const [category, setcategory] = React.useState({
    backpacks: false,
    watches: false,
    shirts: false,
    jewellery: false,
    goggles: false,
    perfumes: false,
    dresses: false,
    shoes: false,
    jeans: false,
    tshirts: false,
  });

  const [type, settype] = React.useState({
    men: false,
    women: false,
    kids: false,
    party: false,
    casual: false,
    ethnic: false,
    sarees: false,
    accessories: false,
    footwear: false,
    bags: false,
    mask: false,
    beauty: false,
  });

  const [showerror, setshowerror] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  let [menuopen, setmenuopen] = useState(false);

  function toggleDrawer() {
    setmenuopen(!menuopen);
  }
  const menuItemList = [
    ["Admin Products", "/adminproducts"],
    ["Wishlist", "/wishlist"],
    ["Cart", "/cart"],
    ["Orders", "/orders"],
    ["Logout", "/logout"],
  ];

  const handleCategoryChange = (event) => {
    setcategory({ ...category, [event.target.name]: event.target.checked });
  };

  const handleTypeChange = (event) => {
    settype({ ...type, [event.target.name]: event.target.checked });
  };

  function handleChange(event) {
    let element = event.target.name;
    let value = event.target.value;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [element]: value,
      };
    });
  }

  async function productdetails() {
    try {
      const typearr = [];
      for (var i in type) {
        if (type[i]) {
          typearr.push(i);
        }
      }

      const categoryarr = [];
      for (var j in category) {
        if (category[j]) {
          categoryarr.push(j);
        }
      }
      // console.log(typearr);
      // console.log(categoryarr);
      const formdata = new FormData();

      formdata.append("title", formData.title);
      formdata.append("price", formData.price);
      formdata.append("companyName", formData.companyName);
      formdata.append("imageUrl", file);
      formdata.append("color", formData.color);
      formdata.append("type", typearr);
      formdata.append("category", categoryarr);
      formdata.append("description", formData.description);

      const tokenStr = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/addproduct`, formdata, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      });

      handleClose();
      window.location.href = "/adminproducts";
    } catch (err) {
      // console.log(err);
      if (err.response) {
        seterrormsg(err.response.data.error);
        setshowerror(true);
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const typehandleDelete = (data) => {
    // console.log(data);
    Object.keys(type).forEach((key) => {
      if (key == data) {
        type[key] = false;
        const newtype = { ...type };
        settype(newtype);
      }
    });
  };

  const categoryhandleDelete = (data) => {
    // console.log(data);
    Object.keys(category).forEach((key) => {
      if (key == data) {
        category[key] = false;
        const newcategory = { ...category };
        setcategory(newcategory);
      }
    });
  };

  useEffect(async () => {
    settab(window.location.pathname);
    // setInterval(async () => {
    const tokenStr = localStorage.getItem("token");
    const cartres = await axios.get(
      `${process.env.REACT_APP_API_URL}/shop/allproductsofcart`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    const prodarr = cartres.data.cart;

    setcartcount(prodarr.length);
  });

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "black" }} position="fixed">
        <Toolbar>
          <img width="47px" src="shopnow-logo.png" alt="" />
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              {tab == "/shop" ? (
                <Button
                  style={{
                    margin: "0px 6px",
                    marginRight: "10px",
                    boxShadow: "#f5f5f5ad 0 1px",
                    color: "white",
                  }}
                  href="/shop"
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

              <Hidden smDown>
                {tab == "/orders" ? (
                  <Button
                    href="/orders"
                    style={{
                      margin: "0px 6px",
                      boxShadow: "#f5f5f5ad 0 1px",
                      color: "white",
                    }}
                  >
                    Orders
                  </Button>
                ) : (
                  <Button
                    href="/orders"
                    style={{ margin: "0px 6px", color: "white" }}
                  >
                    Orders
                  </Button>
                )}
              </Hidden>

              <>
                <Hidden smDown>
                  <Button
                    style={{ margin: "0px 6px", color: "white" }}
                    onClick={handleClickOpen}
                  >
                    Add Products
                  </Button>
                </Hidden>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    <Grid item xs={12}>
                      <div
                        style={{ textAlign: "center", fontSize: "2rem" }}
                        className="loginheading"
                      >
                        Add Product
                      </div>
                    </Grid>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <form>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="center"
                          className={classes.container}
                        >
                          <Grid item xs={12} sm={6}>
                            <ThemeProvider theme={rawTheme}>
                              <TextField
                                fullWidth
                                // autoComplete="on"
                                required
                                variant="outlined"
                                id="title"
                                name="title"
                                label="Title"
                                defaultValue=""
                                value={formData.title}
                                onChange={handleChange}
                              />
                            </ThemeProvider>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <ThemeProvider theme={rawTheme}>
                              <TextField
                                fullWidth
                                required
                                // autoComplete="off"
                                variant="outlined"
                                type="Number"
                                id="price"
                                name="price"
                                label="Price"
                                defaultValue=""
                                value={formData.price}
                                onChange={handleChange}
                              />
                            </ThemeProvider>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <ThemeProvider theme={rawTheme}>
                              <TextField
                                fullWidth
                                required
                                // autoComplete="off"
                                variant="outlined"
                                id="companyName"
                                name="companyName"
                                label="Company Name"
                                defaultValue=""
                                value={formData.companyName}
                                onChange={handleChange}
                              />
                            </ThemeProvider>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <ThemeProvider theme={rawTheme}>
                              <TextField
                                fullWidth
                                required
                                // autoComplete="off"
                                variant="outlined"
                                type="File"
                                id="imageUrl"
                                name="imageUrl"
                                // placeholder="Product image"
                                defaultValue=""
                                // value={file}
                                onChange={handleFile}
                                ref={inputFile}
                              />
                            </ThemeProvider>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <ThemeProvider theme={rawTheme}>
                              <TextField
                                fullWidth
                                required
                                // autoComplete="off"
                                variant="outlined"
                                type="color"
                                id="color"
                                name="color"
                                label="Product Color"
                                //   defaultValue=""
                                value={formData.color}
                                onChange={handleChange}
                              />
                            </ThemeProvider>
                          </Grid>

                          <Grid
                            style={{ position: "relative" }}
                            item
                            xs={12}
                            sm={12}
                          >
                            <ThemeProvider
                              style={{ position: "relative" }}
                              theme={rawTheme}
                            >
                              {Object.values(type).some(
                                (val) => val == true
                              ) ? (
                                <div
                                  component="ul"
                                  className={classes.chiproot}
                                >
                                  {Object.keys(type).map((ty) => (
                                    <li>
                                      {type[ty] ? (
                                        <Chip
                                          className={classes.chip}
                                          onDelete={() => {
                                            typehandleDelete(ty);
                                          }}
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                          label={ty}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </li>
                                  ))}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    color: "black",
                                    marginTop: "1rem",
                                  }}
                                >
                                  Select type of your product*
                                </div>
                              )}
                            </ThemeProvider>
                          </Grid>

                          <div className={classes.typeroot}>
                            <FormControl
                              component="fieldset"
                              className={classes.formControl}
                            >
                              <Grid container style={{ paddingLeft: "1rem" }}>
                                {Object.keys(type).map((ty) => (
                                  <Grid item xs={6} sm={4}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={type[ty]}
                                          onChange={handleTypeChange}
                                          name={ty}
                                        />
                                      }
                                      style={{
                                        textTransform: "capitalize",
                                      }}
                                      label={ty}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </FormControl>
                          </div>

                          <Grid
                            style={{ position: "relative" }}
                            item
                            xs={12}
                            sm={12}
                          >
                            <ThemeProvider
                              style={{ position: "relative" }}
                              theme={rawTheme}
                            >
                              {Object.values(category).some(
                                (val) => val == true
                              ) ? (
                                <div
                                  component="ul"
                                  className={classes.chiproot}
                                >
                                  {Object.keys(category).map((cat) => (
                                    <li>
                                      {category[cat] ? (
                                        <Chip
                                          className={classes.chip}
                                          onDelete={() => {
                                            categoryhandleDelete(cat);
                                          }}
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                          label={cat}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </li>
                                  ))}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    color: "black",
                                    marginTop: "1rem",
                                  }}
                                >
                                  Select category of your product
                                </div>
                              )}
                            </ThemeProvider>
                          </Grid>

                          <div className={classes.typeroot}>
                            <FormControl
                              component="fieldset"
                              className={classes.formControl}
                            >
                              <Grid container style={{ paddingLeft: "1rem" }}>
                                {Object.keys(category).map((cat) => (
                                  <Grid item xs={6}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={category[cat]}
                                          onChange={handleCategoryChange}
                                          name={cat}
                                        />
                                      }
                                      style={{
                                        textTransform: "capitalize",
                                      }}
                                      label={cat}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </FormControl>
                          </div>

                          <Grid item xs={12} sm={12}>
                            <ThemeProvider theme={rawTheme}>
                              <TextField
                                fullWidth
                                required
                                multiline
                                // autoComplete="off"
                                variant="outlined"
                                rows={4}
                                rowsMax={15}
                                id="description"
                                name="description"
                                label="Product Description"
                                defaultValue=""
                                style={{ marginTop: "1rem" }}
                                value={formData.description}
                                onChange={handleChange}
                              />
                            </ThemeProvider>
                          </Grid>
                        </Grid>
                      </form>
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                    <Grid
                      item
                      xs={12}
                      style={{ flexDirection: "column" }}
                      className={classes.alignCenter}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={productdetails}
                        disabled={
                          !formData.title ||
                          !formData.price ||
                          !formData.companyName ||
                          !file ||
                          !formData.color ||
                          !Object.values(type).some((val) => val == true) ||
                          // !Object.values(category).some((val) => val == true) ||
                          !formData.description
                        }
                      >
                        Submit
                      </Button>
                      {showerror ? (
                        <div style={{ color: "red", marginTop: "1rem" }}>
                          {errormsg}
                        </div>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </DialogActions>
                </Dialog>
              </>
              <Hidden smDown>
                {tab == "/adminproducts" ? (
                  <Button
                    href="/adminproducts"
                    style={{
                      margin: "0px 6px",
                      boxShadow: "#f5f5f5ad 0 1px",
                      color: "white",
                    }}
                  >
                    Admin Products
                  </Button>
                ) : (
                  <Button
                    href="/adminproducts"
                    style={{ margin: "0px 6px", color: "white" }}
                  >
                    Admin Products
                  </Button>
                )}

                {tab == "/wishlist" ? (
                  <Button
                    href="/wishlist"
                    style={{
                      margin: "0px 6px",
                      boxShadow: "#f5f5f5ad 0 1px",
                      color: "white",
                    }}
                  >
                    <FavoriteIcon
                      className="hearticonnavbar"
                      fontSize="large"
                      style={{ color: "#f50057" }}
                    />
                  </Button>
                ) : (
                  <Button
                    href="/wishlist"
                    style={{ margin: "0px 6px", color: "white" }}
                  >
                    <FavoriteIcon
                      className="hearticonnavbar"
                      fontSize="large"
                      style={{ color: "#f50057" }}
                    />
                  </Button>
                )}

                {tab == "/cart" ? (
                  <Button href="/cart">
                    <IconButton
                      aria-label="cart"
                      style={{
                        margin: "0px 6px",
                        boxShadow: "#f5f5f5ad 0 1px",
                        color: "white",
                      }}
                    >
                      <StyledBadge badgeContent={cartcount} color="secondary">
                        <ShoppingCartIcon
                          fontSize="large"
                          style={{ color: "white" }}
                        />
                      </StyledBadge>
                    </IconButton>
                  </Button>
                ) : (
                  <Button
                    href="/cart"
                    style={{ margin: "0px 6px", color: "white" }}
                  >
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={cartcount} color="secondary">
                        <ShoppingCartIcon
                          fontSize="large"
                          style={{ color: "white" }}
                        />
                      </StyledBadge>
                    </IconButton>
                  </Button>
                )}
              </Hidden>
            </Grid>
            <Grid item>
              <Hidden smDown>
                {tab == "/logout" ? (
                  <Button
                    href="/logout"
                    style={{ boxShadow: "#f5f5f5ad 0 1px", color: "white" }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button href="/logout" style={{ color: "white" }}>
                    Logout
                  </Button>
                )}
              </Hidden>

              <Hidden mdUp>
                <IconButton
                  style={{ color: "white" }}
                  // color="primary"
                  aria-label="menu"
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>

                <SwipeableDrawer
                  anchor="right"
                  open={menuopen}
                  onClose={toggleDrawer}
                  onOpen={toggleDrawer}
                  transitionDuration={300}
                  className={classes.swipe}
                >
                  <List>
                    <ListItem
                      button
                      key="Add Product"
                      onClick={() => {
                        handleClickOpen();
                        toggleDrawer();
                      }}
                    >
                      <ListItemText primary="Add Product" />
                    </ListItem>
                    {menuItemList.map((item) => (
                      <ListItem
                        button
                        key={item[0]}
                        onClick={() => {
                          window.location.href = `${item[1]}`;
                        }}
                      >
                        <ListItemText primary={item[0]} />
                      </ListItem>
                    ))}
                  </List>
                </SwipeableDrawer>
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarFull;
