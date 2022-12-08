import React, { useState } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import { Row, Col, Form } from "react-bootstrap";
export default function ViewUserDetail(props: any) {
  console.log(props)
  const [show, setShow] = useState(props.viewDetail);
  var options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const DateFunc = (val: any) => {
    const formatedDate = new Date(parseInt(val)).toLocaleString(
      "en-US",
      options
    );
    console.log(formatedDate);
    return formatedDate;
  };

  const handleClose = () => {
    setShow(false);
    props.handleViewParentCallback(false);
  };

  const fontStyle: any = {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "160%",
    textTransform: "capitalize",
    color: "#A2A0D0",
  };

  const profileQuestion = {
    a: "First Name",
    b: "Last Name",
    c: "Address1",
    d: "Address2",
    e: "Zip Code",
    f: "city",
    g: "state",
    h: "Email",
    i: "Phone",
    j: "Signup Date",
    k: "Last Updated At",
    l: "price per private class",
    m: "What is your Discount policy for group classes",
    n: "What is your Discount policy for private classes",
    o: "Class Images",
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          className="text-center"
          closeButton
          style={{ backgroundColor: "#DDE9FF", color: "#5D59B4" }}
        >
          <Modal.Title
            style={{
              marginLeft: "35%",
              fontWeight: 600,
              fontSize: "23px",
              lineHeight: "160%",
              textTransform: "capitalize",
            }}
          >
            {props.detail.first_name} {props.detail.last_name}'s Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            color: "#A2A0D0",
            background: "#F9FBFF",
            paddingRight: "25px",
            paddingLeft: "25px",
          }}
        >
          {/* {JSON.stringify(props.detail)} */}
          <Row>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.a}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.first_name}
              </Card>
            </Col>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.b}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.last_name}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.c}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.address1}
              </Card>
            </Col>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.d}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.address2}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.e}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.zip_code}
              </Card>
            </Col>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.f}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.city}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.g}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.state}
              </Card>
            </Col>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.h}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.email}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.i}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {props.detail.country_code} {props.detail.phone_number}
              </Card>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.j}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {DateFunc(props.detail.created_at)}
              </Card>
            </Col>
            <Col style={{ marginTop: "15px" }}>
              <span style={fontStyle}>{profileQuestion.k}</span>
              <Card
                style={{
                  fontWeight: 500,
                  height: "45px",
                  marginTop: "4px",
                  background: "#FFFFFF",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  padding: "11px 20px",
                  color: "#5D59B4",
                  border: "none",
                }}
              >
                {DateFunc(props.detail.updated_at)}
              </Card>
            </Col>
          </Row>
          <Row style={{ justifyContent: "right", paddingRight: "15px", paddingTop:'15px' }}>
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
                width: "82px",
                height: "50px",
              }}
            >
              Close
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
