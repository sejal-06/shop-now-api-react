// import React from "react";
// import { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import { Grid, TextField, Typography, Button, Paper } from "@material-ui/core";
// import theme from "../components/theme";
// import axios from "axios";

// import NavbarHalf from "../components/NavbarHalf";
// import "./Login.css";

// const rawTheme = createMuiTheme({
//   ...theme,
//   palette: {
//     primary: {
//       main: "#000",
//     },
//     secondary: {
//       main: "#06c",
//     },
//     inherit: {
//       main: "#000",
//     },
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   container: {
//     margin: "auto",
//     marginTop: "80px",
//     width: "40%",
//     [theme.breakpoints.down("sm")]: {
//       width: "60% !important",
//     },
//     [theme.breakpoints.down("xs")]: {
//       width: "90% !important",
//     },
//   },
//   hrtag: {
//     width: "40%",
//     marginTop: "4rem",
//     [theme.breakpoints.down("sm")]: {
//       width: "60% !important",
//     },
//     [theme.breakpoints.down("xs")]: {
//       width: "90% !important",
//     },
//   },
//   text: {
//     textAlign: "center",
//   },
//   button: {
//     margin: "auto",
//     marginTop: "15px",
//     fontSize: "1rem",
//     padding: "10px",
//     width: "40%",
//   },
//   alignCenter: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// }));

// function AddProducts() {
//   const classes = useStyles();

//   let [formData, setFormData] = useState({
//     title: "",
//     price: "",
//   });

//   const [showerror, setshowerror] = useState(false);
//   const [errormsg, seterrormsg] = useState("");

//   function handleChange(event) {
//     let element = event.target.name;
//     let value = event.target.value;
//     setFormData((prevValue) => {
//       return {
//         ...prevValue,
//         [element]: value,
//       };
//     });
//   }

//   async function logindetails() {
//     try {
//       const loginres = await axios.post(`http://localhost:5000/auth/login`, {
//         title: formData.title,
//         price: formData.price,
//       });
//       localStorage.setItem("token", loginres.data.token);
//       window.location.href = "/shop";
//     } catch (err) {
//       seterrormsg(err.response.data.error);
//       setshowerror(true);
//     }
//   }

//   return (
//     <>
//       {/* <NavbarHalf /> */}
//       <Paper style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
//         <form>
//           <Grid
//             container
//             spacing={2}
//             justify="center"
//             alignItems="center"
//             className={classes.container}
//           >
//             <Grid item xs={12}>
//               <h1 style={{ textAlign: "center" }} className="loginheading">
//                 Add Product
//               </h1>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   autoComplete="off"
//                   required
//                   variant="outlined"
//                   id="title"
//                   name="title"
//                   label="Title"
//                   defaultValue=""
//                   value={formData.title}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   autoComplete="off"
//                   variant="outlined"
//                   type="Number"
//                   id="price"
//                   name="price"
//                   label="Price"
//                   defaultValue=""
//                   value={formData.price}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}

//             <Grid item xs={12} sm={12}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   autoComplete="off"
//                   variant="outlined"
//                   id="companyName"
//                   name="companyName"
//                   label="Company Name"
//                   defaultValue=""
//                   value={formData.companyName}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}

//             <Grid item xs={12} sm={12}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   autoComplete="off"
//                   variant="outlined"
//                   type="File"
//                   id="imageUrl"
//                   name="imageUrl"
//                   //   label="Product Image"
//                   placeholder="Product image"
//                   defaultValue=""
//                   value={formData.imageUrl}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}
//             <Grid item xs={12} sm={12}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   autoComplete="off"
//                   variant="outlined"
//                   type="color"
//                   id="color"
//                   name="color"
//                   label="Product Color"
//                   //   defaultValue=""
//                   value={formData.color}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}

//             <Grid item xs={12} sm={6}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   autoComplete="off"
//                   variant="outlined"
//                   //   type="type"
//                   id="type"
//                   name="type"
//                   label="Type"
//                   defaultValue=""
//                   value={formData.type}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}

//             <Grid item xs={12} sm={6}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   autoComplete="off"
//                   variant="outlined"
//                   //   type="category"
//                   id="category"
//                   name="category"
//                   label="Category"
//                   defaultValue=""
//                   value={formData.category}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}

//             <Grid item xs={12} sm={12}>
//               <ThemeProvider theme={rawTheme}>
//                 <TextField
//                   fullWidth
//                   required
//                   multiline
//                   autoComplete="off"
//                   variant="outlined"
//                   rows={4}
//                   rowsMax={10}
//                   id="description"
//                   name="description"
//                   label="Product Description"
//                   defaultValue=""
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </ThemeProvider>
//             </Grid>
//             {showerror ? <div className="errormsg">{errormsg}</div> : ""}

//             <Grid item xs={12} className={classes.alignCenter}>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={logindetails}
//                 disabled={!formData.title || !formData.price}
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </>
//   );
// }

// export default AddProducts;
