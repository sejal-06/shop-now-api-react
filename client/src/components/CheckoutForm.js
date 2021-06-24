import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import axios from "axios";
import Button from "@material-ui/core/Button";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalpriceofcart: 0, warning: "" };
  }
  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // console.log(result.error.message);
    } else if (this.state.totalpriceofcart == 0) {
      // console.log("invalid amount");
    } else {
      // console.log(result.token);
      this.setState({ warning: "Do not refresh!!" });
      const tokenStr = localStorage.getItem("token");
      const order = await axios.post(
        `http://192.168.43.76:5000/shop/placeorder`,
        {
          amount: this.state.totalpriceofcart * 100,
          stripeToken: result.token.id,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );
      // console.log(order);
      if (order.data.status) {
        window.location.href = "/orders";
      }
    }
  };

  async componentDidMount() {
    const tokenStr = localStorage.getItem("token");
    const cart = await axios.get(
      "http://192.168.43.76:5000/shop/allproductsofcart",
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    const cartarr = cart.data.cart;
    // console.log(cartarr);
    var total = 0;
    for (var i = 0; i < cartarr.length; i++) {
      const product = await axios.get(
        `http://192.168.43.76:5000/shop/product/${cartarr[i].productId}`
      );

      total += product.data.product.price * cartarr[i].quantity;
    }
    this.setState({ totalpriceofcart: total });
    // console.log(this.state.totalpriceofcart);
  }

  render() {
    return (
      <div>
        <div className="product-info">
          <div className="product-title-div">Shop till you drop!!</div>
          <h4 className="product-price">₹{this.state.totalpriceofcart}</h4>
        </div>
        <form>
          <CardSection />
          {this.state.totalpriceofcart > 0 ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "100%" }}
                disabled={
                  !this.props.stripe || this.state.warning == "Do not refresh!!"
                }
                onClick={this.handleSubmit}
                className="btn-pay"
              >
                Buy Now
              </Button>
              <div
                style={{ textAlign: "center", color: "thistle", margin: "5px" }}
              >
                {this.state.warning}
              </div>
            </>
          ) : (
            <h3 style={{ color: "#ea4c70", textAlign: "center" }}>
              No item in cart!!
            </h3>
          )}
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
