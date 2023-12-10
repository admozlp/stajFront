import React from "react";
import { Spinner } from 'react-bootstrap';

const LoadingButton = () => {
  return (
    <button className="btn btn-primary" type="button" disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </button>
  );
}

export const LoadingButtonSuccess = () => {
  return (
    <button className="btn btn-success" type="button" disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </button>
  );
}

export default LoadingButton;

