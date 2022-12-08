import React, { Fragment, Dispatch, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import Chat from "../Chat";

const IssueSingle: React.FC = () => {
  // const dispatch: Dispatch<any> = useDispatch();
  // dispatch(updateCurrentPath("issueSingle", ""));
  const [showModal, setShowModal] = useState(false);

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12" style={{ padding: "0px" }}>
          <div
            className="card mb-4"
            style={{
              border: "none",
              borderRadius: "0px",
              background: "#F3F7FF",
            }}
          >
            <div className="card-body" style={{ padding: "0px" }}>
              <div className="d-flex mb-2" style={{ marginTop: "30px" }}></div>

              <div
                className="table-responsive portlet issueTr"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  width: "98%",
                  marginBottom: "20px",
                }}
              >
                <table className="table">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#6460F2",
                        color: "white",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 15 + "px",
                          verticalAlign: "middle",
                        }}
                      >
                        ClassID
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Instructor
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Class Date
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Cost
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Reported
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Chat
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle" }}
                        className="text-center"
                      >
                        Issue
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    <tr className="issueTr">
                      <td style={{ paddingLeft: 15 + "px", color: "#817EB7" }}>
                        389
                      </td>
                      <td
                        style={{
                          paddingLeft: 15 + "px",
                          textAlign: "center",
                          // fontWeight: 600,
                          textDecoration: "underline",
                          lineHeight: "160%",
                          color: "#5D59B4",
                        }}
                      >
                        Miguel D
                      </td>

                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        Tony C
                      </td>
                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        12-05-2022
                      </td>
                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        Pending
                      </td>
                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        $450.00
                      </td>
                      <td
                        style={{
                          color: "#817EB7",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        01-08-2022
                      </td>
                      <td
                        style={{
                          color: "#817EB7",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Button
                          onClick={() => handleShowModal()}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#817EB7",
                          }}
                        >
                          Chat
                        </Button>
                      </td>
                      <td
                        style={{
                          color: "#817EB7",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        Issue
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  width: "98%",
                  padding: "40px 40px 0px",
                  height: "500px",
                  background:'white'
                }}
              >
                <div className="yours messages">
                  <div className="message last">
                  <div id="writer">Tony Crabbe</div>
                    I had an issue with this class
                    <p>10:35 am</p>
                  </div>
                </div>
                <div className="mine messages">
                  <div className="message last">
                    Thank you for your submission. We will try to fix the
                    problem as soon as possible
                    <p>10:35 am</p>
                  </div>
                </div>
              </div>

              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  margin: "auto",
                  width: "98%",
                  marginTop: "30px",
                  background: "#F9FBFF",
                  paddingBottom: '15px',
                  paddingTop: '10px',
                }}
              >
                <div
                  style={{
                    width: "89%",
                    float: "left",
                    boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                    // paddingRight:'16px'
                  }}
                >
                  <Form.Control
                    as="textarea"
                    style={{ border: "none", padding: "30px" }}
                    placeholder="Type your message..."
                  />
                </div>
                <div style={{ width: "10%", float: "right" ,textAlign:'right'}}>
                  <Button
                    className="btn btn-block"
                    style={{
                      width: "90%",
                      // width: "128px",
                      height: "50px",
                      left: "1742px",
                      top: "869px",
                      background: "#6460F2",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#FFFFFF",
                    }}
                  >
                    Send
                  </Button>
                  <Button
                    className="btn btn-block"
                    style={{
                      // width: "128px",
                      width: "90%",
                      height: "50px",
                      left: "1742px",
                      top: "869px",
                      background: "#DDE9FF",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#807CD6",
                      border: "none",
                    }}
                  >
                    Close issue
                  </Button>
                </div>
              </div>
              {showModal && (
                <Chat
                  showModal={showModal}
                  handleCallback={handleParentCallback}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IssueSingle;
