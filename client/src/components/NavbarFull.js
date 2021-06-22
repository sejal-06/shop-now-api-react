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
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Grid, TextField, Button, Paper } from "@material-ui/core";
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
  // container: {
  //   margin: "auto",
  //   marginTop: "80px",
  //   width: "40%",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "60% !important",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     width: "90% !important",
  //   },
  // },

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
      console.log(typearr);
      console.log(categoryarr);
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
      await axios.post(`http://localhost:5000/admin/addproduct`, formdata, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      });

      handleClose();
      window.location.href = "/adminproducts";
    } catch (err) {
      console.log(err);
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

  const handleDelete = (data) => {
    Object.keys(type).forEach((key) => {
      if (key == data) {
        type[key] = false;
      }
    });
  };

  useEffect(async () => {
    // setInterval(async () => {
    const tokenStr = localStorage.getItem("token");
    const cartres = await axios.get(
      "http://localhost:5000/shop/allproductsofcart",
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
              <Button href="/shop" style={{ color: "white" }}>
                Shop
              </Button>
              <Button href="/products" style={{ color: "white" }}>
                Products
              </Button>

              <Button href="/orders" style={{ color: "white" }}>
                Orders
              </Button>

              <>
                <Button style={{ color: "white" }} onClick={handleClickOpen}>
                  Add Products
                </Button>

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
                                autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                                          // onDelete={handleDelete(men)}
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
                                          // onDelete={handleDelete(men)}
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
                                autoComplete="off"
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

              <Button href="/adminproducts" style={{ color: "white" }}>
                Admin Products
              </Button>

              <Button href="/wishlist" style={{ color: "white" }}>
                {/* Cart */}

                <FavoriteIcon
                  className="hearticonnavbar"
                  fontSize="large"
                  style={{ color: "#f50057" }}
                />
              </Button>

              <Button href="/cart" style={{ color: "white" }}>
                {/* Cart */}

                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartcount} color="secondary">
                    <ShoppingCartIcon
                      fontSize="large"
                      style={{ color: "white" }}
                    />
                  </StyledBadge>
                </IconButton>
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
