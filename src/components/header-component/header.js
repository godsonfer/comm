import React from "react";
import { auth } from "./.../../../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

import { Link } from "react-router-dom";
import "./header.styles.scss";

import { connect } from "react-redux";

import { ReactComponent as Logo } from "./../../assets/crown.svg";
import CartIcon from "../cart-icon/cat-icon";
import CartDropdown from "../cart-dropdown/cartDropdown";
import { selectCartHidden } from "../../redux/cart/cart.reselect";
import { selectCurrentUser } from "../../redux/cart/user.reselect";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className=" logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className=" option" to="/shop">
        SHOP
      </Link>
      <Link className=" option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          LOGOUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGNIN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});
//or if there is no selector
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden,
// });

export default connect(mapStateToProps)(Header);
