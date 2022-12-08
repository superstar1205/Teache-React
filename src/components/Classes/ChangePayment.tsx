import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePayment(props: any) {
  const [show, setShow] = useState(props.showModal);
  const [status, setStaus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const handleClose = () => {
    setShow(false);
    props.handleCallback(false);
  };
  const handleChange = (e: any) => {
    setStaus(e.target.value);
  };

  const handleSubmitStatus = () => {
    if (status !== "") {
      const data = {
        status: status,
        user_id: props.userId,
      };
      BaseUrl.post("/block-unblock", data)
        .then((res) => {
          toast.success("Status Changed");
          setCurrentStatus(status);
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    } else {
      toast.error("Please Fill the Input");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <ToastContainer />
        <Modal.Header
          className="text-center"
          closeButton
          style={{ backgroundColor: "#DDE9FF", color: "#5D59B4" }}
        >
          <Modal.Title
            style={{
              marginLeft: "20%",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "160%",
              /* identical to box height, or 45px */

              textTransform: "capitalize",

              /* Txt */

              color: "#5D59B4",
            }}
          >
            Change Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            color: "#5D59B4",
            paddingTop: "30px",
            paddingLeft: "20px",
            background: "#F9FBFF",
            borderRadius:'10px'
          }}
        >
          <p
            style={{
              fontSize: "18px",
              lineHeight: "160%",
              marginBottom: "30px",
              fontWeight: 600,
              textTransform: "capitalize",
              color: "#6460F2",
            }}
          >
            teache received: $285.00
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "160%",
              marginBottom: "10px",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            Refund To User:
          </p>
          <Form.Control
            className="custom"
            onChange={handleChange}
            aria-label="Default select example"
            type="text"
            placeholder="Enter Amount"
            style={{
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              borderRadius: "10px",
              background: "#FFFFFF",
              height: "47px",
              border: "none",
            }}
          ></Form.Control>
          <p
            style={{
              marginTop: "20px",
              fontSize: "16px",
              lineHeight: "160%",
              marginBottom: "10px",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            Release To Instructor:
          </p>
          <Form.Control
            className="custom"
            onChange={handleChange}
            aria-label="Default select example"
            placeholder="Enter Amount"
            style={{
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              borderRadius: "10px",
              background: "#FFFFFF",
              height: "47px",
              border: "none",
            }}
            type="text"
          ></Form.Control>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{
                backgroundColor: "#DDE9FF",
                color: "#807CD6",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "160%",
                borderRadius: "8px",
                height: "50px",
                marginRight: "10px",
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitStatus}
              style={{
                backgroundColor: "#6460F2",
                color: "white",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "160%",
                borderRadius: "8px",
                height: "50px",
              }}
            >
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
