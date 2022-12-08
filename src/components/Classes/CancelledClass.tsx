import React, { Fragment, Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import { getStatus } from "../../utils";
import Chat from "../Chat";

const CancelledClass: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("classId", ""));

  const [showModal, setShowModal] = useState(false);

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  
  return (
    <Row style={{ margin: "10px" }}>
      <Col md={{ span: 8 }} style={{ marginTop: "25px" }}>
        <Row>
          <Col md={{ span: 6 }}>
            <Card
              style={{
                width: "100%",
                border: "none",
                background: "#FFFFFF",
                /* shadow */

                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                borderRadius: "10px",
              }}
            >
              <Row className="no-gutters">
                <Col md={4} lg={4}>
                  <Card.Img
                    variant="top"
                    src="/userInfo.png"
                    style={{
                      borderRadius: "10px",
                      width: "91px",
                      height: "91px",
                      margin: "15px 20px 10px 30px",
                    }}
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#6460F2",
                            marginRight: "10px",
                          }}
                        >
                          User:
                        </b>{" "}
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#817EB7",
                            fontWeight: 400,
                          }}
                        >
                          Tim C
                        </b>
                      </p>
                      <p>
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#6460F2",
                            marginRight: "10px",
                          }}
                        >
                          UserID:
                        </b>{" "}
                        <b>
                          <Link
                            to={`/users/${2243}`}
                            style={{ color: "#817EB7" }}
                          >
                            2243
                          </Link>
                        </b>
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={{ span: 6 }}>
            <Card
              style={{
                width: "100%",
                border: "none",
                background: "#FFFFFF",
                /* shadow */

                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                borderRadius: "10px",
              }}
            >
              <Row className="no-gutters">
                <Col md={4} lg={4}>
                  <Card.Img
                    variant="top"
                    src="/intstructor.png"
                    style={{
                      borderRadius: "10px",
                      width: "91px",
                      margin: "15px 20px 10px 30px",
                    }}
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#6460F2",
                            marginRight: "10px",
                          }}
                        >
                          Instructor:
                        </b>{" "}
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#817EB7",
                            fontWeight: 400,
                          }}
                        >
                          Lora
                        </b>
                      </p>
                      <p>
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#6460F2",
                            marginRight: "10px",
                          }}
                        >
                          Instructor ID:
                        </b>{" "}
                        <b
                          style={{
                            fontSize: "15px",
                            color: "#817EB7",
                            // fontWeight: 400,
                          }}
                        >
                          <Link
                            to={`/instuctors/${2243}`}
                            style={{ color: "#817EB7" }}
                          >
                            2243
                          </Link>
                        </b>
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: "20px",
            marginBottom: "7px",
          }}
        >
          <div
            style={{
              lineHeight: "56px",
              height: "56px",
              boxSizing: "border-box",
              background: "#6460F2",
              border: "none",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px 0px 0px 10px",
              marginLeft: "15px",
              width: "82%",
            }}
          >
            <p
              style={{
                lineHeight: 1.5,
                display: "inline-block",
                background: "#6460F2",
                color: "white",
                fontSize: "17px",
                marginLeft: "8px",
              }}
            >
              Class Details
            </p>
          </div>
          <div
            className="classChat"
            style={{
              lineHeight: "56px",
              height: "56px",
              boxSizing: "border-box",
              background: "#DDE9FF",
              border: "none",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0px 10px 10px 0px",
              width: "15%",
            }}
            onClick={() => handleShowModal()}
          >
            <div
              style={{
                lineHeight: 1.5,
                display: "inline-block",
                color: "white",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              <Image
                src="/clock.png"
                style={{ width: "27px", height: "25px", marginBottom: "3px" }}
              />
            </div>
            <div
              style={{
                lineHeight: 1.5,
                display: "inline-block",
                color: "#6460F2",
                textDecorationLine: "underline",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              Chat
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Class:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                Computer Programming
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Status:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                {getStatus("cancelled")}
              </b>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Subcategory :
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                Flexible
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Cancelled by:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                Instructor
              </b>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Date:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                01-08-2022
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Cancellation time
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                2:40pm
              </b>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Time:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                3:00pm
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Payment processed by Teache:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                Yes
              </b>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Duration:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                60 min
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Payment processed to instructor:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                No
              </b>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Number of Participants:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                2
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Cancellation policy:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                On the day - 30%
              </b>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Cost:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                $285.00
              </b>
            </div>
          </Col>
          <Col>
            <div
              style={{
                paddingLeft: "16px",
                lineHeight: "56px",
                height: "56px",
                boxSizing: "border-box",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                background: "white",
              }}
            >
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Cancellation Reason:
              </b>{" "}
              <b
                style={{
                  lineHeight: 1.5,
                  display: "inline-block",
                  fontSize: "14.5px",
                  marginRight: "10px",
                  color: "#817EB7",
                  fontWeight: 400,
                }}
              >
                My plans have changed.
              </b>
            </div>
          </Col>
        </Row>
      </Col>
      <Col md={{ span: 4 }}>
        <div
          style={{
            width: "350px",
            height: "187px",
            background: "#DDE9FF",
            borderRadius: "10px",
            marginTop: "25px",
          }}
        >
          <div
            className="text-center"
            style={{
              width: "350px",
              height: "60px",
              background: "#6460F2",
              color: "white",
              paddingTop: "20px",
              fontSize: "20px",
              boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <b>Refunded amount</b>
          </div>
          <div
            style={{
              marginTop: "25px",
              marginLeft: "16%",
              fontSize: "18px",
            }}
          >
            <p>
              <b
                style={{
                  fontSize: "15.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                  fontWeight: 600,
                }}
              >
                Refund to user:
              </b>{" "}
              <b
                style={{
                  fontSize: "15.5px",
                  color: "#817EB7",
                  marginLeft: "15px",
                  fontWeight: 500,
                }}
              >
                $185
              </b>
            </p>
            <p>
              <b
                style={{
                  fontSize: "14.5px",
                  color: "#6460F2",
                  marginRight: "10px",
                }}
              >
                Refund to instructor:
              </b>{" "}
              <b
                style={{
                  fontSize: "14.5px",
                  color: "#817EB7",
                  fontWeight: 400,
                  marginLeft: "15px",
                }}
              >
                $100
              </b>
            </p>
          </div>
        </div>
      </Col>
      {showModal && (
        <Chat showModal={showModal} handleCallback={handleParentCallback} />
      )}
    </Row>
  );
};

export default CancelledClass;
