import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import axios from "axios";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalpriceofcart: 0 };
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
      console.log(result.error.message);
    } else if (this.state.totalpriceofcart == 0) {
      console.log("invalid amount");
    } else {
      // console.log(result.token);
      const tokenStr =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
      const order = await axios.post(
        `http://192.168.100.94:5000/shop/placeorder`,
        { amount: this.state.totalpriceofcart, stripeToken: result.token.id },
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
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    const cart = await axios.get(
      "http://192.168.100.94:5000/shop/allproductsofcart",
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );
    const cartarr = cart.data.cart;
    // console.log(cartarr);
    var total = 0;
    for (var i = 0; i < cartarr.length; i++) {
      const product = await axios.get(
        `http://192.168.100.94:5000/shop/product/${cartarr[i].productId}`
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
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className="btn-pay">
            Buy Now
          </button>
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
