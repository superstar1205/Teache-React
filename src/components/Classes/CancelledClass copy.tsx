import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import Teacher from "../Teacher/Teacher";

const CancelledClass: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("classId", ""));

  return (
    <Fragment>

        <Col md={{ span: 8 }}>
          <Row>
            <Col md={{ span: 6 }}>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  background: "#FFFFFF",
                  /* shadow */

                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                  borderRadius: "15px",
                }}
              >
                <Row className="no-gutters">
                  <Col md={4} lg={4}>
                    <Card.Img
                      variant="top"
                      src="/userInfo.png"
                      style={{
                        borderRadius: "15px",
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
                          <b style={{ color: "#6460F2" }}>User:</b>{" "}
                          <b style={{ color: "#817EB7" }}>Tim C</b>
                        </p>
                        <p>
                          <b style={{ color: "#6460F2" }}>UserID:</b>{" "}
                          <b style={{ color: "#817EB7" }}>2243</b>
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
                  width: "20rem",
                  border: "none",
                  background: "#FFFFFF",
                  /* shadow */

                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                  borderRadius: "15px",
                }}
              >
                <Row className="no-gutters">
                  <Col md={4} lg={4}>
                    <Card.Img
                      variant="top"
                      src="/intstructor.png"
                      style={{
                        borderRadius: "15px",
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
                          <b style={{ color: "#6460F2" }}>Instructor:</b>{" "}
                          <b style={{ color: "#817EB7" }}>Lara C</b>
                        </p>
                        <p>
                          <b style={{ color: "#6460F2" }}>Instructor ID:</b>{" "}
                          <b style={{ color: "#817EB7" }}>Lara C</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 10 }}
              style={{
                boxSizing: "border-box",
                // width: "1001px",
                height: "62px",
                background: "#6460F2",
                border: "1px solid #000000",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px 0px 0px 10px",
                paddingTop: "10px",
              }}
            >
              <b style={{ color: "white", fontSize: "25px" }}>Class Details</b>
            </Col>
            <Col
              md={{ span: 2 }}
              style={{
                // width: "135px",
                height: "62px",
                background: "#DDE9FF",
                borderRadius: "0px 10px 10px 0px",
              }}
            >
              <div>
                <Image
                  src="/clock.png"
                  style={{ width: "30px", height: "30px", marginTop: "13px" }}
                />
              </div>
              <div
                style={{
                  margin: "-25px 35px",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "160%",
                  /* identical to box height, or 29px */

                  textDecorationLine: "underline",

                  /* blue */

                  color: "#6460F2",
                }}
              >
                Chat
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Class:</b>{" "}
                          <b style={{ color: "#817EB7" }}>
                            Computer Programming
                          </b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Status :</b>{" "}
                          <b style={{ color: "#817EB7" }}>Cancelled</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Subcategory:</b>{" "}
                          <b style={{ color: "#817EB7" }}>Flexible</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Cancelled by:</b>{" "}
                          <b style={{ color: "#817EB7" }}>Instructor</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Date:</b>{" "}
                          <b style={{ color: "#817EB7" }}>01-08-2022 C</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Cancellation time</b>{" "}
                          <b style={{ color: "#817EB7" }}>2.40pm</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Time:</b>{" "}
                          <b style={{ color: "#817EB7" }}>3.00pm</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>
                            Payment Processed by Teache:
                          </b>{" "}
                          <b style={{ color: "#817EB7" }}>No</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Duration:</b>{" "}
                          <b style={{ color: "#817EB7" }}>60 min</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>
                            Payment Processed to Instructor:
                          </b>{" "}
                          <b style={{ color: "#817EB7" }}>No</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>
                            Number Of Participants:
                          </b>{" "}
                          <b style={{ color: "#817EB7" }}>2</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>
                            Cancellation Policy:
                          </b>{" "}
                          <b style={{ color: "#817EB7" }}>On the day-30%</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>Cost:</b>{" "}
                          <b style={{ color: "#817EB7" }}>$285</b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "20rem",
                  border: "none",
                  borderRadius: "15px",
                  margin: "5px",
                  boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                }}
              >
                <Row className="no-gutters">
                  <Col>
                    <Card.Body style={{ padding: "0rem 2rem" }} className="classes">
                      <Card.Text
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <b style={{ color: "#6460F2" }}>
                            Cancellation Reqason:
                          </b>{" "}
                          <b style={{ color: "#817EB7" }}>
                            My plans have changed
                          </b>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 4 }}>
          <div
            style={{
              width: "435px",
              height: "187px",
              background: "#DDE9FF",
              borderRadius: "15px",
            }}
          >
            <div
              className="text-center"
              style={{
                width: "435px",
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
                <b style={{ color: "#6460F2" }}>Refund to user:</b>{" "}
                <b style={{ color: "#817EB7", marginLeft: "15px" }}>$185</b>
              </p>
              <p>
                <b style={{ color: "#6460F2" }}>Refund to instructor:</b>{" "}
                <b style={{ color: "#817EB7", marginLeft: "15px" }}>$100</b>
              </p>
            </div>
          </div>
        </Col>

    </Fragment>
  );
};

export default CancelledClass;
