/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "./components/NavbarFull";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminProducts from "./pages/AdminProducts";
import Product from "./pages/Product";
import DeletedProduct from "./pages/DeletedProduct";
import Placeorder from "./pages/Placeorder";
import Productbycategory from "./pages/Productbycategory";
import Logout from "./pages/Logout";
import NavbarHalf from "./components/NavbarHalf";
import NavbarFull from "./components/NavbarFull";
import Resetpassword from "./pages/Resetpassword";
import Confirmreset from "./pages/Confirmreset";
import Wishlist from "./pages/Wishlist";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/theme";

function App() {
  const [isauth, setisauth] = useState(false);

  useEffect(async () => {
    try {
      const tokenStr = localStorage.getItem("token");
      await axios.get(`http://192.168.176.94:5000/auth/isauth`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      });
      setisauth(true);
    } catch (err) {
      setisauth(false);
    }
  });

  return (
    <>
      {isauth ? <NavbarFull /> : <NavbarHalf />}
      <Router>
        <Switch>
          {/* <ThemeProvider theme={theme}> */}
          <Route exact path="/login">
            {!isauth ? (
              <Login />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Already logged in!!
              </h1>
            )}
          </Route>

          {/* <Route exact path="/addproduct">
            {isauth ? (
              <AddProducts />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Login to continue!!
              </h1>
            )}
          </Route> */}

          <Route exact path="/signup">
            {!isauth ? (
              <Signup />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Already signed in!!
              </h1>
            )}
          </Route>
          {/* </ThemeProvider> */}

          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/deletedproduct/:id">
            <DeletedProduct />
          </Route>
          <Route path="/productsbycategory/:category">
            <Productbycategory />
          </Route>

          <Route exact path="/cart">
            {isauth ? (
              <Cart />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Login to continue!!
              </h1>
            )}
          </Route>
          <Route exact path="/wishlist">
            {isauth ? (
              <Wishlist />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Login to continue!!
              </h1>
            )}
          </Route>

          <Route exact path="/placeorder">
            {isauth ? (
              <Placeorder />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Login to continue!!
              </h1>
            )}
          </Route>

          <Route exact path="/orders">
            {isauth ? (
              <Orders />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Login to continue!!
              </h1>
            )}
          </Route>

          <Route exact path="/adminproducts">
            {isauth ? (
              <AdminProducts />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Login to continue!!
              </h1>
            )}
          </Route>
          <Route exact path="/logout">
            {isauth ? (
              <Logout />
            ) : (
              <h1
                style={{
                  marginLeft: "1rem",
                  marginTop: "10vh",
                  color: "#f5f5f58f",
                }}
              >
                Already logged out!!
              </h1>
            )}
          </Route>
          <Route exact path="/resetpassword">
            <Resetpassword />
          </Route>
          <Route exact path="/confirmreset/:resettoken">
            <Confirmreset />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
