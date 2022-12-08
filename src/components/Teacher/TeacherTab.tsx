import { AutoComplete } from "antd";
import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Table,
  Row,
  Col,
  NavItem,
  Nav,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

export default function TeacherTab(props: any) {
  const [key, setKey] = useState("home");
  const fontStyle: any = {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "160%",
    textTransform: "capitalize",
    color: "#A2A0D0",
    marginBottom: "5px",
  };
  const boxStyle: any = {
    border: "none",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "160%",
    textTransform: "capitalize",
    color: "#5D59B4",
    boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
    borderRadius: "10px",
    minHeight: "48px",
    marginTop: "8px",
    marginBottom: "15px",
    padding: "11px 20px",
    background: "#F9FBFF",
  };
  const schedule1: any = {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "160%",

    color: "#817EB7",
  };
  const schedule2: any = {
    padding: "50px",
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "160%",

    color: "#5D59B4",
  };
  const colStyle: any = {
    width: "410px",
    height: "299px",
    background: "#FFFFFF",
    boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
    borderRadius: "0px 0px 10px 10px",
    margin: "10px",
    overflowY: "auto",
  };

  const profileQuestion = {
    a: "What are you teaching",
    b: "Tell users about you and your experience on the subject you want to teach",
    c: "What students should expect on your class",
    d: "Where do you teach classes",
    e: "What level of student are you teaching",
    f: "What students need to have to take your class",
    g: "How long does your class last",
    h: "Cancellation Policy - Specify refund for clients who cancel class",
    i: "What class do you offer",
    j: "Number of students in group classes",
    k: "price per group class",
    l: "price per private class",
    m: "What is your Discount policy for group classes",
    n: "What is your Discount policy for private classes",
    o: "Class Images",
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row style={{ marginTop: "30px" }}>
        <Col sm={12} style={{ marginBottom: "30px" }}>
          <Nav
            variant="pills"
            style={{
              width: "72%",
              background: "white",
              borderRadius: "10px",
              justifyContent: "center",
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              marginLeft: "10px",
            }}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="first"
                style={{ fontSize: "16px", fontWeight: 600, margin: "10px" }}
              >
                Profile Information
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="second"
                style={{ fontSize: "16px", fontWeight: 600, margin: "10px" }}
              >
                Class Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="third"
                style={{ fontSize: "16px", fontWeight: 600, margin: "10px" }}
              >
                Classes Availability
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            {/* *********************************************************************************************************** */}
            <Tab.Pane eventKey="first">
              <ListGroup>
                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.a}</span>
                  <Card style={boxStyle}>
                  {props.teacherDetail.subject_sub_category}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.b}</span>
                  <Card style={boxStyle}>
                  {props.teacherDetail.experience_on_subject}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.c}</span>
                  <Card style={boxStyle}>
                   {props.teacherDetail.expected_students}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.d}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.locations_of_class}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.e}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.level_of_student}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.f}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.student_need_to_have}
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.g}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.class_duration} minutes
                  </Card>
                </ListGroup.Item>
              </ListGroup>
            </Tab.Pane>
            {/* *********************************************************************************************************** */}

            <Tab.Pane eventKey="second">
              <ListGroup>
                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.h}</span>
                  {props.teacherDetail.cancellation && props.teacherDetail.cancellation.length > 0 ? props.teacherDetail.cancellation.map((value_c_cp:any, index:any ) => (<Card style={boxStyle}>
                    {value_c_cp.policy}: {value_c_cp.percentage}%
                    </Card>)) : <Card>No Policy</Card>}
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.i}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.type_of_class}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.j}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.number_of_students}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.k}</span>
                  <Card style={boxStyle}>
                    ${props.teacherDetail.price_per_group_class}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.l}</span>
                  <Card style={boxStyle}>
                    ${props.teacherDetail.price_per_private_class}
                  </Card>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.m}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.discount_policies && props.teacherDetail.discount_policies.length >0 ? props.teacherDetail.discount_policies.map((value_c_d:any, index:any) => (
                      value_c_d.type === "group" ? value_c_d.policy +": "+value_c_d.percentage+"%, " : " "
                    ) ) : "No Policy" }
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.n}</span>
                  <Card style={boxStyle}>
                  {props.teacherDetail.discount_policies && props.teacherDetail.discount_policies.length >0 ? props.teacherDetail.discount_policies.map((value_c_d:any, index:any) => (
                      value_c_d.type === "private" ? value_c_d.policy +": "+value_c_d.percentage+"%, " : " "
                    ) ) : "No Policy"}
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ border: "none", background: "#F9FBFF" }}
                >
                  <span style={fontStyle}>{profileQuestion.o}</span>
                  <Card style={boxStyle}>
                    {props.teacherDetail.class_duration}
                  </Card>
                </ListGroup.Item>
              </ListGroup>
            </Tab.Pane>
            {/* *********************************************************************************************************** */}

            <Tab.Pane eventKey="third">
              <Row
                style={{
                  height: "62px",

                  borderRadius: "10px 10px 0px 0px",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "160%",
                  color: "#6460F2",
                  padding: "0px 20px",
                }}
              >
                  <Col md={6} style={{background:'#DDE9FF',borderRadius: '10px 0px 0px 0px'}}>
                    <div style={{paddingLeft:'10px', paddingTop:'18px'}}>Day</div>
                  </Col>
                  <Col md={6} style={{background:'#DDE9FF',borderRadius: '0px 10px 0px 0px'}}>
                    <div style={{paddingLeft:'10px', paddingTop:'18px'}}>Time & Class</div>
                  </Col>
              </Row>
              { props.teacherDetail.classes && props.teacherDetail.classes.length >0 ? props.teacherDetail.classes.map(( value: any, index:any)=>(
                
                <Row key={index} style={{ padding: "0px 10px 0px 10px" }}>
                <Col
                  style={{
                    ...colStyle,
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: "160%",
                    padding: "20px",
                    color: "#5D59B4",
                    paddingBottom: "0px",
                  }}
                >
                  {value.day}
                </Col>
                <Col style={{ ...colStyle, padding: "20px" }}>
                  { value.teacher_class_timings.map((value_child:any, index_c:any)=>(
                    <p key={index_c}>
                      <span style={schedule1}>{value_child.time}</span>
                      <span style={schedule2}>{value_child.type}</span>
                    </p>
                  ))}
                </Col>
              </Row>
              )) : <Row style={{ padding: "0px 10px 0px 10px" }}>
              <Col
                style={{
                  ...colStyle,
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: "160%",
                  padding: "20px",
                  color: "#5D59B4",
                  paddingBottom: "0px",
                }}
              >
                
              </Col>
              <Col style={{ ...colStyle, padding: "20px" }}>
              </Col>
            </Row> }
            </Tab.Pane>
            {/* *********************************************************************************************************** */}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
