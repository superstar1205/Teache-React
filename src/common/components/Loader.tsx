import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div className="text-dark d-flex justify-content-center align-items-center h-30">
      <Spinner animation="border" role="status"  variant="primary" >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
