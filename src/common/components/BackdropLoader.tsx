import React from "react";
import { Spinner } from "react-bootstrap";

export default function BackdropLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 backdrop-loader">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
