import React from "react";

import { connect } from "react-redux";

import CustomButton from "../custom-button-component/custom-button";

import "./cart-dropdown.scss";

import { withRouter } from "react-router-dom";

import CartItem from "../cartItem/cartItem.component";
import { selectCartItem } from "../../redux/cart/cart.reselect";
import { toggleCartHidden } from "./../../redux/cart/cart.action";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className=" cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className=" empty-message">Your cart is empty</span>
      )}
    </div>

    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItem(state),
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
