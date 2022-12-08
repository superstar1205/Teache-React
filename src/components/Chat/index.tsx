import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export default function EditUserDetail(props: any) {
  const [show, setShow] = useState(props.showModal);

  const handleClose = () => {
    props.handleCallback(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header
          className="text-center"
          closeButton
          style={{
            backgroundColor: "#DDE9FF",
            color: "#5D59B4",
            paddingRight: "30px",
          }}
        >
          <Modal.Title
            style={{
              marginLeft: "40%",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "160%",
              border: "none",
              textTransform: "capitalize",
            }}
          >
            Chat History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "#F9FBFF",
            height: "600px",
            padding: "20px 30px",
            overflow: "scroll",
          }}
        >
          <div>
            <div className="yours messages">
              <div className="message last">
                <div id="writer">Tony Crabbe</div>
                When will our class start?
                <p>10:35 am</p>
              </div>
            </div>
            <div className="mine messages">
              <div className="message last">
                <div id="writer">Elly Mishley</div>
                Hello! Sorry, I'll be 5 minutes late. Please be ready for class
                and put on your sportswear.<p>10:35 am</p>
              </div>
            </div>
            <div className="yours messages">
              <div className="message last">
              <div id="writer">Tony Crabbe</div>
                Good! Thank you!<p>10:35 am</p>
              </div>
            </div>
            <div className="mine messages">
              <div className="message last">
              <div id="writer">Elly Mishley</div>
                Hello! Sorry, I'll be 5 minutes late. Please be ready for class
                and put on your sportswear.<p>10:35 am</p>
              </div>
            </div>
            <div className="yours messages">
              <div className="message last">
              <div id="writer">Tony Crabbe</div>
                Good! Thank you!<p>10:35 am</p>
              </div>
            </div>
            <div className="mine messages">
              <div className="message last">
              <div id="writer">Elly Mishley</div>
                Hello! Sorry, I'll be 5 minutes late. Please be ready for class
                and put on your sportswear.<p>10:35 am</p>
              </div>
            </div>
            <div className="yours messages">
              <div className="message last">
              <div id="writer">Tony Crabbe</div>
                Good! Thank you!<p>10:35 am</p>
              </div>
            </div>
            <div className="mine messages">
              <div className="message last">
              <div id="writer">Elly Mishley</div>
                Hello! Sorry, I'll be 5 minutes late. Please be ready for class
                and put on your sportswear.<p>10:35 am</p>
              </div>
            </div>
            <div className="yours messages">
              <div className="message last">
              <div id="writer">Tony Crabbe</div>
                Good! Thank you!<p>10:35 am</p>
              </div>
            </div>
            <div className="mine messages">
              <div className="message last">
              <div id="writer">Elly Mishley</div>
                Hello! Sorry, I'll be 5 minutes late. Please be ready for class
                and put on your sportswear.<p>10:35 am</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
