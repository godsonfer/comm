import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import HomePage from "./components/pages/homepage/homepage";
import "./App.css";

import { createStructuredSelector } from "reselect";

import ShopPage from "./components/pages/shop/shop";
import Header from "./components/header-component/header";
import SignInAndSignUp from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user-action/user.action";
import { selectCurrentUser } from "./redux/cart/user.reselect";
import Checkout from "./components/pages/checkout/checkout.component";

class App extends React.Component {
  unsusbscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsusbscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsusbscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={Checkout} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const maspStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(
  maspStateToProps,
  mapDispatchToProps,
)(App);
