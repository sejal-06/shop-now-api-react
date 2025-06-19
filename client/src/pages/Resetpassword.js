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

function Resetpassword() {
  const classes = useStyles();

  let [formData, setFormData] = useState({
    email: "",
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
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/resetmail`, {
        email: formData.email,
      });
      window.location.reload();
      seterrormsg("");
      setshowerror(false);
    } catch (err) {
      seterrormsg(err.response.data.error);
      setshowerror(true);
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
                Reset Password
              </h1>
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
            </Grid>

            {showerror ? <div className="errormsg">{errormsg}</div> : ""}
            <Grid item xs={12} className={classes.alignCenter}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={logindetails}
                disabled={!formData.email}
              >
                Send reset link
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

export default Resetpassword;
