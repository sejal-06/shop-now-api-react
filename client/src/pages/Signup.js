import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Grid, TextField, Typography, Button, Paper } from "@material-ui/core";
import theme from "../components/theme";
import axios from "axios";

import NavbarHalf from "../components/NavbarHalf";
import "./Login.css";

const rawTheme = createMuiTheme({
  ...theme,
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
  container: {
    margin: "auto",
    marginTop: "80px",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "60% !important",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90% !important",
    },
  },
  hrtag: {
    width: "40%",
    marginTop: "4rem",
    [theme.breakpoints.down("sm")]: {
      width: "60% !important",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90% !important",
    },
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

function Signup() {
  const classes = useStyles();

  let [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //   const [showerror, setshowerror] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [errorparam, seterrorparam] = useState("");
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

  async function handleSubmit() {
    try {
      seterrormsg("");
      seterrorparam("");
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      //   localStorage.setItem("token", signupres.data.token);
      window.location.href = "/login";
    } catch (err) {
      seterrormsg(err.response.data.error);
      seterrorparam(err.response.data.param);
      //   setshowerror(true);
    }
  }

  return (
    <>
      {/* <NavbarHalf /> */}
      <Paper style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <form>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Grid item xs={12}>
              <h1 style={{ textAlign: "center" }} className="loginheading">
                SignUp
              </h1>
            </Grid>

            <Grid item xs={12} sm={6}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  //   autoComplete="off"
                  required
                  variant="outlined"
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  defaultValue=""
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  //   autoComplete="off"
                  required
                  variant="outlined"
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  defaultValue=""
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  required
                  //   autoComplete="off"
                  variant="outlined"
                  id="username"
                  name="username"
                  label="Username"
                  defaultValue=""
                  value={formData.username}
                  onChange={handleChange}
                />
              </ThemeProvider>

              {errorparam == "username" ? (
                <div style={{ color: "red" }}>{errormsg}</div>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12} sm={12}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  //   autoComplete="off"
                  required
                  variant="outlined"
                  id="email"
                  name="email"
                  label="Email"
                  defaultValue=""
                  value={formData.email}
                  onChange={handleChange}
                />
              </ThemeProvider>
              {errorparam == "email" ? (
                <div style={{ color: "red" }}>{errormsg}</div>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  //   autoComplete="off"
                  required
                  type="password"
                  variant="outlined"
                  id="password"
                  name="password"
                  label="Password"
                  defaultValue=""
                  value={formData.password}
                  onChange={handleChange}
                />
              </ThemeProvider>
              {errorparam == "password" ? (
                <div style={{ color: "red" }}>{errormsg}</div>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  //   autoComplete="off"
                  required
                  variant="outlined"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  defaultValue=""
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </ThemeProvider>
              {errorparam == "confirmPassword" ? (
                <div style={{ color: "red" }}>{errormsg}</div>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12} className={classes.alignCenter}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleSubmit}
                disabled={
                  !formData.firstname ||
                  !formData.lastname ||
                  !formData.username ||
                  !formData.email ||
                  !formData.password ||
                  !formData.confirmPassword
                }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

export default Signup;
