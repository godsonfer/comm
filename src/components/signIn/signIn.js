import React, { Component } from "react";
import FormInput from "../form-input/formInput";
import CustomButton from "../custom-button-component/custom-button";
import { auth, signInWithGoogle } from "./../../firebase/firebase.utils";
import "./signIn.scss";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = this.state;

      await auth.signInWithEmailAndPassword(email, password);

      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sing-in">
        <h2>SIGN IN</h2>
        <span>Sing in with your email and password</span>
        <form onSubmit={this.handleSubmit} className="sign-in ">
          <FormInput
            handleChange={this.handleChange}
            name="email"
            value={this.state.email}
            label="email"
            required
            type="email"
          />

          <FormInput
            handleChange={this.handleChange}
            name="password"
            value={this.state.password}
            type="password"
            label="password"
          />
          <div className="buttons">
            <CustomButton type="submit" value="Submit Form">
              Sign In
            </CustomButton>

            <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
