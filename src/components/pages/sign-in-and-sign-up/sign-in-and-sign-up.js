import React from "react";

import "./sign-in-and-sign-up.scss";
import SignIn from "../../signIn/signIn";
import SignUp from "../../signUp/signUp";

const SignInAndSignUp = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUp;
