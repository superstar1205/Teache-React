import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import ChangePayment from './ChangePayment';


const CompletedClass: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("classId", ""));
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState("");


  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleShowModal = (id: any, status: string) => {
    setShowModal(true);
    setUserId(id);
    setUserStatus(status);
  };

  return (
    <Row>
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
                style={{ width: "30px", height: "30px", marginBottom:'3px' }}
              />
            </div>
            <div
              style={{
                margin: "-25px 35px",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "160%",
                textDecorationLine: "underline",
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>Class:</b>{" "}
                        <b style={{ color: "#817EB7" }}>Computer Programming</b>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>Cost :</b>{" "}
                        <b style={{ color: "#817EB7" }}>$285</b>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>Status:</b>{" "}
                        <b style={{ color: "#817EB7" }}>Completed</b>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>
                          Payment Processed By Teache:
                        </b>{" "}
                        <b style={{ color: "#817EB7" }}>Yes</b>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>
                          Payment Processed To Instructor:
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>Class Issue:</b>{" "}
                        <b style={{ color: "#817EB7" }}>Yes</b>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
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
                  <Card.Body style={{ padding: "0rem 2rem" }}>
                    <Card.Text
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <p>
                        <b style={{ color: "#6460F2" }}>Cancellation:</b>{" "}
                        <b style={{ color: "#817EB7" }}>On the day-30%</b>
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
          <p
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "160%",
              /* identical to box height, or 32px */
              paddingLeft: "25%",
              paddingTop: "10%",
              /* blue */
              color: "#6460F2"
            }}
          >
            Teache Received : $285.00
          </p>
          <Button
            style={{
              // padding: "12px 18px",
              // gap: "20px",
              background: "#6460F2",
              borderRadius: "8px",
              // width: "151px",
              height: "50px",
              marginLeft: "33%",
            }}
            onClick={() =>
              handleShowModal('item.id', 'item.status')
            }
          >
            Hold a payment
          </Button>
        </div>
        {showModal && (
          <ChangePayment
            userId={'userId'}
            userStatus={'userStatus'}
            showModal={showModal}
            handleCallback={handleParentCallback}
          />
        )}
      </Col>
    </Row>
  );
};

export default CompletedClass;
