import React, { useMemo, useState } from "react";
import { Button, Modal, Card, Image, Row, Col } from "react-bootstrap";
import "../../styles/style.css";
import TeacherTab from "./TeacherTab";
import BaseUrl from "../../BaseUrl/BaseUrl";

const btnStyle: any = {
  width: "82px",
  height: "50px",
  background: "#DDE9FF",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "160%",
  color: "#807CD6",
  border: "none",
  justifyContent: "right",
  marginRright: "15px",
};

export default function ViewTeacherDetail(props: any) {
  const [show, setShow] = useState(props.viewDetail);
  const [teacherDetail, setTeacherDetail] = useState(props.user);
  //const [teacherDetail, setTeacherDetail]: any[] = useState([]);

  const handleClose = () => {
    setShow(false);
    props.handleViewParentCallback(false);
  };

  // useMemo(() => {
  //   BaseUrl.get(`/teachers/${props.id}`).then((res) => {
  //     setTeacherDetail(res.data.data);
  //   });
  // }, [props.id]);
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          className="text-center"
          closeButton
          style={{ backgroundColor: "#DDE9FF", color: "#5D59B4" }}
        >
          <Modal.Title style={{ marginLeft: "30%" }}>
            <b>View Teacher Detail</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F9FBFF", height: '600px', overflow:'scroll' }}>
          <Card
            style={{
              width: "20rem",
              border: "none",
              background: "##F9FBFF",
              /* shadow */

              // boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
              borderRadius: "15px",
            }}
          >
            <Row className="no-gutters">
              <Col md={4} lg={4} style={{ background: "#F9FBFF" }}>
                <Card.Img
                  variant="top"
                  src="/teacher.png"
                  style={{
                    borderRadius: "15px",
                    width: "118px",
                    height: "118px",
                    margin: "15px 20px 10px 30px",
                  }}
                />
              </Col>
              <Col md={8} lg={8}>
                <Card.Body style={{ width: "600px" }}>
                  <Card.Text
                    style={{
                      paddingTop: "0px",
                      marginLeft: "10%",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "160%",
                    }}
                  >
                    <p style={{ marginBottom: "11px", width: "600" }}>
                      <b style={{ color: "#6460F2" }}>Email:</b>{" "}
                      <b style={{ color: "#817EB7", marginLeft: "7px" }}>
                      {props.user.user.email}
                      </b>
                    </p>
                    <p style={{ marginBottom: "11px", width: "600" }}>
                      <b style={{ color: "#6460F2" }}>Phone:</b>{" "}
                      <b style={{ color: "#817EB7", marginLeft: "7px" }}>
                        {props.user.user.country_code+" "+props.user.user.phone_number}
                      </b>
                    </p>
                    <p style={{ marginBottom: "11px", width: "600" }}>
                      <b style={{ color: "#6460F2" }}>Location:</b>{" "}
                      <b style={{ color: "#817EB7", marginLeft: "7px" }}>
                      {props.user.city}
                      </b>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <TeacherTab 
          teacherDetail={teacherDetail} 
          />
          <Row
            style={{
              justifyContent: "right",
              marginRight: "15px",
            }}
          >
            <Button style={btnStyle} variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
