import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./withSpinner.style";

const withSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...ortherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...ortherProps} />
    );
  };
  return Spinner;
};

export default withSpinner;
