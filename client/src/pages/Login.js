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

function Login() {
  const classes = useStyles();

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showerror, setshowerror] = useState(false);
  const [errormsg, seterrormsg] = useState("");

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

  async function logindetails() {
    try {
      seterrormsg("");
      setshowerror("");
      const loginres = await axios.post(`http://localhost:5000/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", loginres.data.token);
      window.location.href = "/shop";
    } catch (err) {
      console.log(err);
      if (err.response) {
        seterrormsg(err.response.data.error);
        setshowerror(true);
      }
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
                Login
              </h1>
            </Grid>
            <Grid item xs={12} sm={12}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  autoComplete="off"
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
            </Grid>
            <Grid item xs={12} sm={12}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  required
                  autoComplete="off"
                  variant="outlined"
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  defaultValue=""
                  value={formData.password}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </Grid>
            {showerror ? <div className="errormsg">{errormsg}</div> : ""}
            <Grid item xs={12} className={classes.alignCenter}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={logindetails}
                disabled={!formData.email || !formData.password}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <center>
          <a className="resetpass" href="/resetpassword">
            <div className="forgotpassword">Forgot Password?</div>
          </a>
        </center>

        <div style={{ position: "relative" }}>
          <hr className={classes.hrtag} />

          <h1
            style={{
              position: "absolute",
              top: "-3rem",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              background: "white",
              padding: "10px",
            }}
          >
            OR
          </h1>
        </div>

        {/* <center> */}

        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid item xs={12} className={classes.alignCenter}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "0" }}
              className={classes.button}
              href="/signup"
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
        {/* </center> */}
      </Paper>
    </>
  );
}

export default Login;
