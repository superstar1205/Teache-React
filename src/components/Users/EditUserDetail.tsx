import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBadge } from "../../utils";

export default function EditUserDetail(props: any) {
  console.log(props);
  const [show, setShow] = useState(props.showModal);
  const [status, setStaus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const handleClose = () => {
    props.handleCallback(false);
  };
  const handleChange = (e: any) => {
    setStaus(e.target.value);
  };

  const handleSubmitStatus = () => {
    // alert(status)
    if (status !== "") {
      const data = {
        status: status,
        user_id: props.userId,
      };
      console.log(data);
      const axiosConfig: any = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
        },
      };
      BaseUrl.post("/block-unblock", data, axiosConfig)
        .then((res) => {
          console.log('Hehehe')
          setCurrentStatus(status);
          props.handleCallback(true);
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    } else {
      toast.error("Please Select Option.");
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
          style={{ backgroundColor: "#DDE9FF", color: "#5D59B4", paddingRight:'30px' }}
        >
          <Modal.Title
            style={{
              marginLeft: "25%",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "160%",
              border: "none",
              textTransform: "capitalize",
            }}
          >
            Edit User Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px", background: "#F9FBFF" }}>
          <p style={{ marginTop: "29px", marginBottom: "27px" }}>
            <span
              style={{
                marginRight: "25px",
                fontWeight: 550,
                fontSize: "18px",
                lineHeight: "160%",
                textTransform: "capitalize",
                color: "#5D59B4",
              }}
            >
              User Current Status :
            </span>
            {getBadge(props.userStatus)}
          </p>

          <Form.Select
            onChange={handleChange}
            aria-label="Default select example"
            className="classic"
            style={{
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "160%",
              textTransform: "capitalize",
              color: "#817EB7",
              paddingLeft: "20px",
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              borderRadius: "10px",
              border: "none",
              height: "50px",
            }}
          >
            <option value="" disabled selected>
              Choose New Status
            </option>
            {
              props.userStatus === "active" ? <option value="in-active">Block</option> : <option value="active">Unblock</option>
            }
          </Form.Select>
        </Modal.Body>
        <Modal.Footer
          style={{
            border: "none",
            padding:'28px'
          }}
        >
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "#DDE9FF",
              color: "#807CD6",
              border: "none",
              height: "50px",
              padding: "12px 18px",
              marginRight: "13px",
              fontWeight: 600,
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
              height: "50px",
              padding: "12px 18px",
              fontWeight: 600,
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
