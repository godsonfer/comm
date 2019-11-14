import React from "react";

import "./checkout.styles.scss";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import {
  selectCartItem,
  selectCartTotal,
} from "../../../redux/cart/cart.reselect";
import CheckoutItem from "../../checkout/checkout-item.component";

const Checkout = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span className="">Product</span>
      </div>

      <div className="header-block">
        <span className="">Description </span>
      </div>

      <div className="header-block">
        <span className="">Quantity</span>
      </div>

      <div className="header-block">
        <span className="">Price</span>
      </div>

      <div className="header-block">
        <span className="">Remove</span>
      </div>
    </div>

    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}

    <div className="total">Total ${total}</div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItem,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(Checkout);
