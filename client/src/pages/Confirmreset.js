/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Grid, TextField, Typography, Button, Paper } from "@material-ui/core";
import theme from "../components/theme";
import axios from "axios";

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

function Confirmreset() {
  const { resettoken } = useParams();
  const classes = useStyles();

  let [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
  async function handlesubmit() {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/changepass/${resettoken}`,
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );
      localStorage.setItem("token", null);
      window.location.href = "/login";
    } catch (err) {
      seterrormsg(err.response.data.error);
      setshowerror(true);
    }
  }

  return (
    <div>
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
                  required
                  // autoComplete="off"
                  variant="outlined"
                  type="password"
                  id="password"
                  name="password"
                  label="New Password"
                  defaultValue=""
                  value={formData.password}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <ThemeProvider theme={rawTheme}>
                <TextField
                  fullWidth
                  // autoComplete="off"
                  required
                  variant="outlined"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm new password"
                  defaultValue=""
                  value={formData.confirmPassword}
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
                onClick={handlesubmit}
                disabled={!formData.confirmPassword || !formData.password}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default Confirmreset;
