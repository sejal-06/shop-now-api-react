import React from "react";
import Navbar from "./components/NavbarFull";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AddProducts from "./pages/AddProducts";
import AdminProducts from "./pages/AdminProducts";
import Product from "./pages/Product";
import Placeorder from "./pages/Placeorder";
import Productbycategory from "./pages/Productbycategory";

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route exact path="/login">
              <Login />           
          </Route> */}
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/productsbycategory/:category">
            <Productbycategory />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/placeorder">
            <Placeorder />
          </Route>
          <Route exact path="/orders">
            <Orders />
          </Route>
          <Route exact path="/addproduct">
            <AddProducts />
          </Route>
          <Route exact path="/adminproducts">
            <AdminProducts />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
