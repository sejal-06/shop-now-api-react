import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles,TextField,Grid, Paper } from "@material-ui/core";

import NavbarHalf from "../components/NavbarHalf";
import './Login.css'

const useStyles = makeStyles((theme) => ({
  root: { 
    marginTop: theme.spacing(20),  
    "& .MuiFormControl-root": {
      margin: theme.spacing(1),
      width: "50vw",
    },
  },
  // page:{
  //   margin: theme.spacing(5),
  //   padding: theme.spacing(3),
  // }
}));

function Login() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  useEffect(() => {
    // axios.post();
  });
  const classes = useStyles();
  return (
    <>
      <NavbarHalf />
{/* <Paper classname={classes.page}> */}
      <form
        // style={{ marginTop: "50px", background: "white" }}
        className={classes.root}
        autoComplete="off"
      >
        <Grid container>
          <Grid item xs={12}  >
            <center>
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={name}
              variant="outlined"
            />
            </center>
            
          </Grid>
          <Grid item xs={12} >
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              value={password}
              type="password"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
{/* </Paper> */}
    </>
  );
}

export default Login;
