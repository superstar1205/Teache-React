import React, { Fragment, Dispatch, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { Row, Col, Card, Image } from "react-bootstrap";
import { getStatus } from "../../utils";
import Chat from "../Chat";
import ClassPayment from './ClassPayment';
import { ToastContainer } from "react-toastify";
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

const axiosConfig: any = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
  },
};

const CancelledClass: React.FC = () => {
  const { id }  = useParams();

  console.log('ID', id);
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("classId", ""));
  const imageBaseUrl = "https://d7eyk7icw439d.cloudfront.net/";
  const [classInfo, setClassInfo] : any[] = useState([]);
  const [showModal, setShowChatModal] = useState(false);
  const handleParentCallback = (childData: any) => {
    setShowChatModal(childData);
  };

  const handleChatModal = () => {
    setShowChatModal(true);
  };

  useEffect(() => {
    BaseUrl.get(`/class/${id}`, axiosConfig).then((res) => {
      if(res.status === 200 && res.data && res.data.data){
        setClassInfo(res.data.data);
      }
    })
  }, [id]);

  return (
  <Fragment> 
    <ToastContainer />
    <Row style={{ marginLeft: "10px" }}>
      <Col md={8} style={{ marginTop: "16px" }}>
        <Row>
          <Col md={6}>
            <Card
              style={style.hrow}
            >
              <div className="d-flex">
                <Card.Img
                    variant="top"
                    src={classInfo && classInfo.user_profile_pic ? imageBaseUrl+classInfo.user_profile_pic : "/profile.png"}
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
                        {classInfo && classInfo.user_name}
                      </b>
                    </Card.Text>
                    <Card.Text>
                      <b style={style.hbtext}>
                        UserID:
                      </b>{" "}
                      <b>
                        <Link
                          to={`/users/${classInfo && classInfo.user_id}`}
                          style={{ color: "#817EB7" }}
                        >
                          {classInfo && classInfo.user_id}
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
                    src={classInfo && classInfo.teacher_profile_pic ? imageBaseUrl+classInfo.teacher_profile_pic : "/profile.png"}
                    style={style.himg}
                  />
                  <Card.Body>
                    <Card.Text style={{paddingTop:"10px"}}>
                      <b style={style.hbtext}
                        >
                          Instructor:
                        </b>{" "}
                        <b style={{ ...style.hbtext, color: "#817EB7"}}>
                          {classInfo && classInfo.teacher_name}
                        </b>
                      </Card.Text>
                      <Card.Text>
                        <b style={style.hbtext}>
                          Instructor ID:
                        </b>{" "}
                        <b style={{ ...style.hbtext, color: "#817EB7"}}>
                          <Link
                            to={`/instuctors/${classInfo && classInfo.teacher_id}`}
                            style={{ color: "#817EB7" }}
                          >
                            {classInfo && classInfo.teacher_id}
                          </Link>
                        </b>
                    </Card.Text>
                  </Card.Body>
                </div>
            </Card>
          </Col>
        </Row>
        <Row style={{marginBottom: "7px"}}>
          <div style = {{...style.row, marginTop: "16px"}}>
            <p style={style.p}>
              Class Details
            </p>
          </div>
          <div
            className="classChat"
            style={{
              marginTop: "16px",
              lineHeight: "56px",
              height: "56px",
              boxSizing: "border-box",
              background: "#DDE9FF",
              border: "none",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0px 10px 10px 0px",
              width: "15%",
            }}
            onClick={() => handleChatModal()}
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
                {classInfo.class_type}
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
                ${classInfo.cost}
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
                {classInfo.sub_type}
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
                {getStatus(classInfo.status)}
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
                {classInfo.class_date}
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
                {classInfo.processed_system && classInfo.processed_system === true ? "Yes" : "No"}
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
                {classInfo.class_time}
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
                {classInfo.processed_instructor && classInfo.processed_instructor === true ? "Yes" : "No"}
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
                {classInfo.duration} mins
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
                {classInfo.processed_instructor && classInfo.processed_instructor === true ? "Yes" : "No"}
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
                {classInfo.students}
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
                {classInfo.cancellation_policy ? classInfo.cancellation_policy : "No" }
              </b>
            </div>
          </Col>
        </Row>
      </Col>
      {/* ==================================================================================================================================================================================================== */}
      <Col md={4} style={{marginTop: "16px"}}>
        <ClassPayment
          classId = {classInfo && classInfo.id}
          cost = {classInfo && classInfo.cost}
          status={ classInfo && classInfo.processed_instructor ? 1 : classInfo.processed_system ? 2 : 3}
          />
      </Col>
      {showModal && (
        <Chat 
          showModal={showModal} 
          userId = {classInfo && classInfo.user_id}
          teacherId = {classInfo && classInfo.teacher_user_id}
          userName = {classInfo && classInfo.user_name}
          teacehrName = {classInfo && classInfo.teacher_name}
          classId = {classInfo && classInfo.id}
          handleCallback={handleParentCallback} />
      )}
    </Row>
    </Fragment>
  );
};

export default CancelledClass;
