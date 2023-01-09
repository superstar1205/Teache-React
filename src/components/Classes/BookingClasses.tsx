import React, { Fragment, Dispatch, useState, useEffect, useCallback, Children } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { Row, Col, Card, Image, Accordion } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getStatus } from "../../utils";
import Chat from "../Chat";
import ClassPayment from "./ClassPayment";

const axiosConfig: any = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
  },
};

const BookingClasses: React.FC = () => {
  const { id }  = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("classId", ""));
  const imageBaseUrl = "https://d7eyk7icw439d.cloudfront.net/";
  const [classData, setClassData] : any[] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedUserid, setSelectedUserid] = useState("");
  const [selectedTeacherid, setSelectedTeacherid] = useState("");
  const [selectedClassid, setSelectedClassid] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");

  const style:any = {
    hrow: {
      width: "100%",
      border: "none",
      background: "#FFFFFF",
      boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
      borderRadius: "15px",
    },
    himg: {
      borderRadius: "15px",
      width: "91px",
      height: "91px",
      margin: "12px 0px 12px 12px",
    },
    hbtext: {
      fontSize: "16px",
      color: "#6460F2",
      marginRight: "8px",
    },

    row: {
      lineHeight: "56px",
      height: "56px",
      boxSizing: "border-box",
      background: "#6460F2",
      border: "none",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "10px 0px 0px 10px",
      marginLeft: "15px",
      width: "82%",
    },
    p: {
      lineHeight: 1.5,
      display: "inline-block",
      background: "#6460F2",
      color: "white",
      fontSize: "17px",
      marginLeft: "8px",
    },
    rowcol: {
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
    },
    bf: {
      lineHeight: 1.5,
      display: "inline-block",
      fontSize: "14.5px",
      color: "#6460F2",
      marginRight: "10px",
    },
    bs: {
      lineHeight: 1.5,
      display: "inline-block",
      fontSize: "14.5px",
      marginRight: "10px",
      color: "#817EB7",
      fontWeight: 400,
    },
  };

  const handleParentCallback = (childData: any) => {
    toast.error(childData);
  };

  const handleChatModal = (id: any, userid: any, teacherid: any, username: string, teachername: string) => {
    setShowChatModal(true);
    setSelectedUserid(userid);
    setSelectedClassid(id);
    setSelectedTeacherid(teacherid);
    setSelectedUserName(username);
    setSelectedTeacherName(teachername);
  };

  // const handlePaymentParentCallback = ((Children:any) => {
  //   toast.error(Children);
  // });

  useEffect(() => {
    BaseUrl.get(`/booking-classes/${id}`, axiosConfig).then((res) => {
      if(res.status === 200){
        if(res.data) {
          if(res.data.data) {
            console.log(res.data.data);
            setClassData(res.data.data);
          }
        }
      }
    })
  }, [id]);
  
  return (
  <Fragment>
    <ToastContainer/>
    <div style={{marginLeft: "10px"}}>
      <Col md={12} lg={8} style={{marginTop: "16px"}}>
        <Row>
          <Col md={6}>
            <Card
              style={style.hrow}
            >
              <div className="d-flex">
                <Card.Img
                    variant="top"
                    src={classData[0] && classData[0].user_profile_pic ? imageBaseUrl+classData[0].user_profile_pic : "/profile.png"}
                    style={style.himg}
                  />
                  <Card.Body>
                    <Card.Text style={{paddingTop: "10px"}}>
                      <b style={style.hbtext}>
                        User:
                      </b>{" "}
                      <b
                        style={{
                          ...style.hbtext,
                          color: "#817EB7",
                        }}
                      >
                        {classData[0] && classData[0].user_name}
                      </b>
                    </Card.Text>
                    <Card.Text>
                      <b style={style.hbtext}>
                        UserID:
                      </b>{" "}
                      <b>
                        <Link
                          to={`/users/${classData[0] && classData[0].user_id}`}
                          style={{ color: "#817EB7" }}
                        >
                          {classData[0] && classData[0].user_id}
                        </Link>
                      </b>
                    </Card.Text>
                  </Card.Body>
              </div>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={style.hrow}>
              <div className="d-flex">
                  <Card.Img
                    variant="top"
                    src={classData[0] && classData[0].teacher_profile_pic ? imageBaseUrl+classData[0].teacher_profile_pic : "/profile.png"}
                    style={style.himg}
                  />
                  <Card.Body>
                    <Card.Text style={{paddingTop:"10px"}}>
                      <b style={style.hbtext}
                        >
                          Instructor:
                        </b>{" "}
                        <b style={{ ...style.hbtext, color: "#817EB7"}}>
                          {classData[0] && classData[0].teacher_name}
                        </b>
                      </Card.Text>
                      <Card.Text>
                        <b style={style.hbtext}>
                          Instructor ID:
                        </b>{" "}
                        <b style={{ ...style.hbtext, color: "#817EB7"}}>
                          <Link
                            to={`/instuctors/${classData[0] && classData[0].teacher_id}`}
                            style={{ color: "#817EB7" }}
                          >
                            {classData[0] && classData[0].teacher_id}
                          </Link>
                        </b>
                    </Card.Text>
                  </Card.Body>
                </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
    <Accordion defaultActiveKey="0"
    style={{ marginLeft: "10px", marginRight: "10px", marginTop: "20px" }}
    >
      {classData && classData.length>0 && classData.map((classItem: any, key: any) => {
        let itemstatus;
        if(classItem.processed_instructor === true){
          itemstatus = 1;
        } else{
          if(classItem.processed_system === true){
            itemstatus = 2;
          }else{
            itemstatus = 3;
          }
        }
        return(
        <Accordion.Item eventKey={''+key} key={key}>
          <Accordion.Header><b style={{fontSize: "24px"}}>Class ID: {classItem.id}</b></Accordion.Header>
          <Accordion.Body style={{ background: "#f4f7ff"}}>
            <Row>
              <Col md={8}>
                <Row style={{
                  marginBottom: "7px",
                }}>
                  <div style = {style.row}>
                    <p style={style.p}>
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
                    onClick={() => handleChatModal(classItem.id, classItem.user_id, classItem.teacher_id, classItem.user_name, classItem.teacher_name)}
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
                      }}>
                      Chat
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col>
                    <div style={style.rowcol} className="classes">
                      <b style={style.bf}>
                        Class:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.class_type}
                      </b>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b
                        style={style.bf}
                      >
                        Cost:
                      </b>{" "}
                      <b
                        style={style.bs}
                      >
                        ${classItem.cost}
                      </b>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Subcategory :
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.sub_type}
                      </b>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Status:
                      </b>{" "}
                      <b style={style.bs}>
                        {getStatus(classItem.status)}
                      </b>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Date:
                      </b>{" "}
                      <b style={style.bs} >
                        {classItem.class_date}
                      </b>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Payment processed by Teache:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.processed_system && classItem.processed_system === true ? "Yes" : "No"}
                      </b>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Time:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.class_time}
                      </b>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        payment processed to instructor:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.processed_instructor && classItem.processed_instructor === true ? "Yes" : "No"}
                      </b>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Duration:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.duration} mins
                      </b>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Class issue:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.processed_instructor && classItem.processed_instructor === true ? "Yes" : "No"}
                      </b>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Number of Participants:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.students}
                      </b>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={style.rowcol}
                      className="classes"
                    >
                      <b style={style.bf}>
                        Cancellation policy:
                      </b>{" "}
                      <b style={style.bs}>
                        {classItem.cancellation_policy ? classItem.cancellation_policy : "No" }
                      </b>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <ClassPayment
                  classId = {classItem && classItem.id}
                  cost = {classItem && classItem.cost}
                  status = {itemstatus}
                  // handleCallback = {handlePaymentParentCallback}
                ></ClassPayment>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      )})}
    </Accordion>
    {showChatModal && (
      <Chat
        classId={selectedClassid}
        userId={selectedUserid}
        teacherId={selectedTeacherid}
        userName = {selectedUserName}
        teacherName = {selectedTeacherName}
        showModal={showChatModal}
        handleCallback={handleParentCallback}
      />
    )}
  </Fragment>
  );
};

export default BookingClasses;
