import React, { Component } from "react";
import FormInput from "../form-input/formInput";
import CustomButton from "../custom-button-component/custom-button";
import {
  createUserProfileDocument,
  auth,
} from "./../../firebase/firebase.utils";
import "./signUp.styles.scss";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log("errors occures, correct them and try again", error.message);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sing-up">
        <h2>SIGN UP</h2>
        <h2 className="title">I do not have an account</h2>
        <span>Sign Up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            handleChange={this.handleChange}
            name="displayName"
            value={this.state.displayName}
            label="Name"
            required
            type="text"
          />
          <FormInput
            handleChange={this.handleChange}
            name="email"
            value={this.state.email}
            label="Email"
            required
            type="email"
          />

          <FormInput
            handleChange={this.handleChange}
            name="password"
            value={this.state.password}
            type="password"
            label="Password"
          />

          <FormInput
            handleChange={this.handleChange}
            name="confirmPassword"
            value={this.state.confirmPassword}
            type="password"
            label="confirme password"
          />
          <div className="buttons">
            <CustomButton type="submit" value="Submit Form">
              Sign Up
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
