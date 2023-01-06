import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import { getStatus } from "../../utils";
import Chat from "../Chat";
import { ToastContainer, toast } from "react-toastify";

var options: any = { year: "numeric", month: "numeric", day: "numeric" };

const DateFuncN = (val: any) => {
  const formatedDate = new Date(val).toLocaleString(
    "en-US",
    options
  );
  let dateType = formatedDate.replaceAll("/", "-")
  return dateType;
}

const axiosConfig: any = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
  },
};

const CancelledClass: React.FC = () => {
  const { id }  = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("classId", ""));
  const imageBaseUrl = "https://d7eyk7icw439d.cloudfront.net/";
  const [classData, setClassData] : any[] = useState([]);
  const [totalCost, setTotalCost] =useState(0);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [processStatus, setProcessStatus] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {

    BaseUrl.get(`/class/${id}`, axiosConfig).then((res) => {
      if(res.status === 200){
        if(res.data) {
          if(res.data.data) {
            setClassData(res.data.data);
            console.log(res.data.data);
            setTotalCost(res.data.data.cost);
            if(res.data.data.processed_instructor === true){
              setPaymentStatus(1);
            } else {
              if(res.data.data.processed_system === true){
                setPaymentStatus(2)
              } else{
                setPaymentStatus(0);
              }
            }
            if(res.data.data.payment === "Hold Payment"){
              setPaymentStatus(4);
            }
            console.log(res.data.data);
          }
        }
      }
    })
  }, [id]);

  const handleRefundUser = () => {
    setProcessStatus(1);
  };
  const handleReleaseInstructor = () => {
    setProcessStatus(2);
  };

  const handlePayment = ()=> {
    const data = {
      class_id: Number(id),
      status: "hold"
    };
    BaseUrl.post(`/update-class-payment`, data, axiosConfig).then((res)=>{
      if(res.status === 200){
        toast.success(res.data.message && res.data.message);
      }
    });
    setPaymentStatus(4);
  };

  const handleSubmitStatus = (()=> {
    if(processStatus === 2) {
      const data = {
        class_id: Number(id),
        status: "process"
      };
      BaseUrl.post(`/update-class-payment`, data, axiosConfig).then((res)=>{
        if(res.status === 200){
          toast.success(res.data.message && res.data.message);
        } else{
          console.log(res);
        }
      });
      setPaymentStatus(3);
    }else if(processStatus === 1) {
      const cdata = {
        status: "refund",
        class_id: Number(id)
      };
      BaseUrl.post(`/update-class-payment`, cdata, axiosConfig).then((res)=>{
        if(res.status === 200){
          toast.success(res.data.message && res.data.message);
        } else{
          console.log(res);
        }
      });
    } else{
      toast.error("Select one of them!");
    }
  });
  
  return (
  <Fragment>
    <ToastContainer />
    <Row style={{ margin: "10px" }}>
      <Col md={{ span: 8 }} style={{ marginTop: "25px" }}>
        <Row>
          <Col md={{ span: 6 }}>
            <Card
              style={{
                width: "100%",
                border: "none",
                background: "#FFFFFF",
                boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
                borderRadius: "10px",
              }}
            > 
              <Row className="no-gutters">
                <Col md={4} lg={4}>
                  <Card.Img
                    variant="top"
                    src={classData && classData.user_profile_pic ? imageBaseUrl+classData.user_profile_pic : "/profile.png"}
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
                        fontSize: "15px",
                            color: "#6460F2",
                            marginRight: "10px",
                      }}
                    >
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
                          {classData && classData.user_name}
                        </b><br></br><br></br>
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
                            {classData && classData.user_id}
                          </Link>
                        </b>
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
                    src={classData && classData.teacher_profile_pic ? imageBaseUrl+classData.teacher_profile_pic : "/profile.png"}
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
                          {classData && classData.teacher_name}
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
                            to={`/instuctors/${classData && classData.teacher_id}`}
                            style={{ color: "#817EB7" }}
                          >
                            {classData && classData.teacher_id}
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
                {classData && classData.class_type}
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
                {classData && getStatus(classData.status)}
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
                {classData && classData.sub_type}
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
                {classData && classData.cancelled_by}
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
                {classData && DateFuncN(classData.class_date)}
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
                {classData && classData.cancellation_time}
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
                {classData && classData.class_time}
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
                {classData && classData.processed_system === true ? "Yes" : "No"}
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
                {classData && classData.duration} min
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
                {classData && classData.processed_instructor === true ? "Yes" : "No"}
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
                {classData && classData.students}
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
                {classData && classData.cancellation_policy}
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
                ${classData && classData.cost}
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
                {classData && classData.cancellation_reason}
              </b>
            </div>
          </Col>
        </Row>
      </Col>
      {/* ==================================================================================================================================================================================================== */}
      <Col md={{ span: 4 }}>
      { paymentStatus === 1 && 
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
                ${classData.refund_amount}
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
                Released to instructor:
              </b>{" "}
              <b
                style={{
                  fontSize: "14.5px",
                  color: "#817EB7",
                  fontWeight: 400,
                  marginLeft: "15px",
                }}
              >
                ${classData.cost}
              </b>
            </p>
          </div>
        </div> }
      { paymentStatus === 2 && 
        <div>
          <div
          style={{
            width: "360px",
            // height: "187px",
            background: "#DDE9FF",
            borderRadius: "15px",
            marginTop: "25px",
            paddingBottom: "25px",
            textAlign: "center",
          }}
          >
            <p
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "19px",
                lineHeight: "160%",
                paddingTop: "13%",
                textAlign: "center",
                color: "#6460F2",
                marginBottom: "10px",
              }}
            >
              Teache Received : {totalCost}
            </p>
            
              <Button
                style={{
                  marginTop: "15px",
                  background: "#6460F2",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 600,
                  height: "40px",
                  fontSize: "16px",
                }}
                onClick = {handlePayment}
              >
                Hold Payment
              </Button>
          </div>
          <div
          style={{
            width: "360px",
            color: "#6460F2",
            marginTop: "25px",
            paddingTop: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingBottom: "20px",
            background: "#DDE9FF",
            borderRadius:'10px'
          }}
          >
            <Row>
              <Button
              onClick={handleRefundUser}
              style={{
                backgroundColor: "#6460F2",
                color: "white",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "160%",
                borderRadius: "8px",
                height: "40px",
                marginBottom: "16px"
              }}
              >Refund to user</Button>
            </Row>
            <Row>
            <Button
              onClick={handleReleaseInstructor}
              style={{
                backgroundColor: "white",
                color: "#6460F2",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "160%",
                borderRadius: "8px",
                height: "40px",
                marginBottom: "16px"
              }}
              >Release to Instructor</Button>
            </Row>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <Button
                variant="primary"
                onClick={handleSubmitStatus}
                style={{
                  backgroundColor: "#6460F2",
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "160%",
                  borderRadius: "8px",
                  height: "50px",
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      }
      { paymentStatus === 4 && 
        <div>
          <div
            style={{
              width: "360px",
              // height: "187px",
              background: "#DDE9FF",
              borderRadius: "15px",
              marginTop: "25px",
              paddingBottom: "15px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "160%",
                paddingTop: "25px",
                textAlign: "center",
                color: "#6460F2",
              }}
            >
              Hold Payment
            </p>
            <p
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "19px",
                lineHeight: "160%",
                paddingTop: "16px",
                textAlign: "center",
                color: "#6460F2",
              }}
            >
              Cost: {totalCost}
            </p>
          </div>
          <div
          style={{
            width: "360px",
            color: "#6460F2",
            marginTop: "25px",
            paddingTop: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingBottom: "20px",
            background: "#DDE9FF",
            borderRadius:'10px'
          }}
          >
            <Row>
              <Button
              onClick={handleRefundUser}
              style={{
                backgroundColor: "#6460F2",
                color: "white",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "160%",
                borderRadius: "8px",
                height: "40px",
                marginBottom: "16px"
              }}
              >Refund to user</Button>
            </Row>
            <Row>
            <Button
              onClick={handleReleaseInstructor}
              style={{
                backgroundColor: "white",
                color: "#6460F2",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "160%",
                borderRadius: "8px",
                height: "40px",
                marginBottom: "16px"
              }}
              >Release to Instructor</Button>
            </Row>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <Button
                variant="primary"
                onClick={handleSubmitStatus}
                style={{
                  backgroundColor: "#6460F2",
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "160%",
                  borderRadius: "8px",
                  height: "50px",
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      }
      { paymentStatus === 3 ?
        <div
        style={{
          width: "360px",
          // height: "187px",
          background: "#DDE9FF",
          borderRadius: "15px",
          marginTop: "25px",
          paddingBottom: "15px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "160%",
            paddingTop: "25px",
            textAlign: "center",
            color: "#6460F2",
          }}
        >
          {processStatus===1 && "Refunded to user"}
          {processStatus===2 && "Release to Instructor"}
        </p>
        <p
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "19px",
            lineHeight: "160%",
            paddingTop: "16px",
            textAlign: "center",
            color: "#6460F2",
          }}
        >
          Cost: {totalCost}
        </p>
      </div> : ""
      }
      </Col>
      {showModal && (
        <Chat 
          showModal={showModal} 
          userId = {classData && classData.user_id}
          teacherId = {classData && classData.teacher_user_id}
          userName = {classData && classData.user_name}
          teacehrName = {classData && classData.teacher_name}
          classId = {classData && classData.id}
          handleCallback={handleParentCallback} />
      )}
    </Row>
    </Fragment>
  );
};

export default CancelledClass;
