/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "./styles.css";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51HzJtED3YnSFKpD5lzL8bx08kD4wWgHbPc7b5V5The7tIc3nzxxEWSTwvO2mcK1qe0uwS0AjTMiy4g6Di3iFCXEY00nUXI8i6Q"
);

function Placeorder() {
  return (
    <div className="App">
      <div className="product">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/shopnow-logo.png"
            alt="logo"
            style={{
              width: "25%",
              height: "25%",
              background: "white",
              borderRadius: "50%",
              transform: "translateY(-50%)",
              boxShadow: "2px 2px 20px black",
            }}
          />
        </div>

        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Placeorder;
