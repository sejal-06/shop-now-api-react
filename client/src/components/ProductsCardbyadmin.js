/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Chip, Grid, TextField, Button, Paper } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Draggable from "react-draggable";

import DeleteIcon from "@material-ui/icons/Delete";

import "./ProductsCardbyadmin.css";

import "./ProductCard.css";
import axios from "axios";

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
    // padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
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
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  topContainer: {
    marginTop: "8vh",
    padding: "1vw",
  },
  root: {
    padding: "0.5vw",
  },
  media: {
    height: "33vh",
    backgroundSize: "contain",
  },
}));

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

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function ProductsCardbyadmin(props) {
  const [productslist, setproductslist] = useState([]);

  const [open, setOpen] = useState(false);
  const [deleteproductid, setdeleteproductid] = useState("");
  const [editproductid, seteditproductid] = useState("");
  const [editOpen, seteditOpen] = useState(false);

  let [formData, setFormData] = useState({
    title: "",
    price: "",
    companyName: "",
    imageUrl: "",
    color: "#000000",
    description: "",
  });

  const [file, setfile] = useState(null);

  const [showerror, setshowerror] = useState(false);
  const [errormsg, seterrormsg] = useState("");

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

  async function productdetails() {
    setshowerror(false);
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

      const formdata = new FormData();
      formdata.append("title", formData.title);
      formdata.append("price", formData.price);
      formdata.append("companyName", formData.companyName);
      if (file) {
        formdata.append("imageUrl", file);
      }
      formdata.append("color", formData.color);
      formdata.append("type", typearr);
      formdata.append("category", categoryarr);
      formdata.append("description", formData.description);

      const tokenStr = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/admin/editproduct/${editproductid}`,
        formdata,
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );

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

  const classes = useStyles();

  useEffect(async () => {
    setproductslist(props.products);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleeditClickOpen = async (id) => {
    seteditproductid(id);
    const productjson = await axios.get(
      `http://localhost:5000/shop/product/${id}`
    );

    const productinfo = productjson.data.product;
    setFormData({
      title: productinfo.title,
      price: productinfo.price,
      companyName: productinfo.companyName,
      imageUrl: productinfo.imageUrl,
      color: productinfo.color,
      description: productinfo.description,
    });
    var newtype = {
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
    };
    productinfo.type.forEach((ty) => {
      newtype[ty] = true;
    });
    settype(newtype);

    var newcategory = {
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
    };
    productinfo.category.forEach((cat) => {
      newcategory[cat] = true;
    });
    setcategory(newcategory);

    seteditOpen(true);
  };
  const handleeditClose = () => {
    seteditOpen(false);
  };

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

  const handleYes = async (val) => {
    console.log(val);
    const tokenStr = localStorage.getItem("token");
    await axios.get(`http://localhost:5000/admin/deleteproduct/${val}`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });

    const newproductarr = productslist.filter((product) => product._id != val);
    setproductslist(newproductarr);

    handleClose();
  };

  const handleNo = async (val) => {
    handleClose();
  };

  return (
    <div>
      <Grid container spacing={1} className={classes.topContainer}>
        {productslist.length === 0 ? (
          <h1>No products</h1>
        ) : (
          productslist.map((product) => (
            <Grid
              item
              className={classes.productcontainer}
              xs={6}
              sm={4}
              md={3}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <a href={"/product/" + product._id}>
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                    />
                  </a>
                  <CardContent
                    style={{
                      padding: "8px",
                      paddingLeft: "13px",
                      position: "relative",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <div
                          onClick={(e) => {
                            setdeleteproductid(product._id);
                            handleClickOpen();
                          }}
                          // onClick={(e) => handlecheck(product._id)}
                          className="icondiv"
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            marginTop: "13px",
                            marginRight: "8px",
                            padding: "8px",
                          }}
                        >
                          <DeleteIcon />
                        </div>

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          PaperComponent={PaperComponent}
                          // aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move" }}
                            id="draggable-dialog-title"
                          >
                            Delete Product
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Are you sure you want to delete this product?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              autoFocus
                              onClick={handleNo}
                              color="primary"
                            >
                              No
                            </Button>
                            <Button
                              onClick={() => {
                                // debugger;
                                handleYes(deleteproductid);
                              }}
                              color="primary"
                            >
                              Yes
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <div className="title" variant="h5" component="h2">
                          {product.title}
                        </div>
                        <div
                          className="companyName"
                          style={{ textTransform: "uppercase" }}
                        >
                          {product.companyName}
                        </div>
                      </Grid>
                    </Grid>
                    <Typography
                      style={{ fontSize: "1.25rem", fontWeight: "600" }}
                    >
                      ₹ {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid container justify="space-between">
                    <Grid item xs={12} md={12}>
                      <Button
                        size="medium"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleeditClickOpen(product._id)}
                        // href={"/editproduct/" + product._id}
                      >
                        Edit Product
                      </Button>

                      <Dialog
                        open={editOpen}
                        onClose={handleeditClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          <Grid item xs={12}>
                            <div
                              style={{ textAlign: "center", fontSize: "2rem" }}
                              className="loginheading"
                            >
                              Edit Product
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
                                    <Grid
                                      container
                                      style={{ paddingLeft: "1rem" }}
                                    >
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
                                    <Grid
                                      container
                                      style={{ paddingLeft: "1rem" }}
                                    >
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
                              onClick={() => productdetails()}
                              disabled={
                                !formData.title ||
                                !formData.price ||
                                !formData.companyName ||
                                !formData.color ||
                                !Object.values(type).some(
                                  (val) => val == true
                                ) ||
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
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {/* {productslist.length ? (
        <div
          style={{ width: "50%", margin: "auto", marginBottom: "30vh" }}
          className={classes.pagination}
        >
          <Pagination
            count={Math.ceil(productslist.length / 8)}
            color="primary"
          />
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default ProductsCardbyadmin;
