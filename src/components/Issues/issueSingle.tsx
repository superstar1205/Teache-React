import { type } from "os";
import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { usePubNub } from 'pubnub-react';
import BaseUrl from "../../BaseUrl/BaseUrl";
import moment from 'moment';
import Chat from "../Chat";
import { ToastContainer, toast } from "react-toastify";
interface issuesinfo {
  issuesInfo:any,
}

export default function IssueSingle(props: issuesinfo) {
  console.log(props);
  const issueData = props.issuesInfo.issueInfo;
  const [issueStatus, setIssueStatus] = useState(props.issuesInfo.issuesStatus);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [teacherId, setTeacherId] =useState("");
  const [classId, setClassId] =useState("");
  const [userName, setUserName] =useState("");
  const [teacherName, setTeacherName] =useState("");
  const [txtValue, setTxtValue] = useState("");

  const pubNub = usePubNub();

  const [messages, _setMessages] = useState<any[]>([]);
  const messagesRef = React.useRef(messages);
  const setMessages = (data) => {
    messagesRef.current = data;
      _setMessages(data);
  };

  let channelId: string = '';
  if (issueData.user_id && issueData.class_id) {
    channelId = issueData.user_id + '_channel_admin_class_' + issueData.class_id; //"461_channel_admin_class_1142";
  }

  let receiverId: string;

  const extractReceiverId = () => {
    return issueData.user_id;
  };

  useEffect(() => {
    receiverId = extractReceiverId();
  }, [channelId]);

  useEffect(() => {
    if (pubNub) {
      const listener = {
        message: envelope => {
          console.log('envelope: ', envelope.message[0]);
          let newMessages = [...messagesRef.current];
          newMessages.push(envelope.message[0]);
          setMessages(newMessages);
        },
        signal: function (s) {
          //  let typingUserId = s.publisher;
        },
        presence: function (event) {
          console.log('presence: ', event);
        },
      };
      pubNub.addListener(listener);

      pubNub.subscribe({
        channels: [channelId],
        withPresence: true,
      });
      return () => {
        pubNub.removeListener(listener);
        pubNub.unsubscribeAll();
      };
    }
  }, [pubNub]);

  useEffect(() => {
    if (channelId) {
      pubNub.history(
        {channel: channelId, count: 100, reverse: true},
        (status, res) => {
          console.log('history status: ', status);
          let newMessage: any[] = [];
          res.messages.forEach(function (element, index) {
            newMessage[index] = element.entry[0];
          });
          setMessages(newMessage);
        },
      );
    }
  }, []);

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleChange = (e)=>{
    setTxtValue(e.target.value);
  }

  const handleSend = () => {

    if (txtValue.trim().length < 1) return;

    const msg = [{
      _id: new Date().getTime().toString(),
      createdAt: new Date(),
      text: txtValue,
      user: {"_id": "admin"}
    }];
    
    setTxtValue("");
    
    pubNub
      .publish({message: msg, channel: channelId})
      .then(res => {
        console.log('send message: ', res);
      })
      .catch();

    // Publish message for backend
    pubNub
      .publish({
        message: {
          ...msg[0],
          type: 'admin',
          receiver_id: receiverId,
          channel_name: channelId,
          sender_name: 'admin',
          role: 'admin',
          subjectTeach: '',
          profilePic: '',
        },
        channel: 'adminNewMessage',
      })
      .then(res => console.log('sent a message to admin: ', res))
      .catch(err => console.log('message error: ', err));
  }

  const handleShowModal = (id: any, user_id: string, teacher_id: string, user_name: string, teacher_name: string) => {
    setShowModal(true);
    setUserId(user_id);
    setTeacherId(teacher_id);
    setClassId(id);
    setUserName(user_name);
    setTeacherName(teacher_name);
  };

  const handleSetIssus = (status: any) => {
    if(status === false){
      setIssueStatus(true);
      const data = {
        issue_id: issueData.id,
        solved: true
      };
      const axiosConfig: any = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
        },
      };
      BaseUrl.post(`/update-issue-status`, data, axiosConfig)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
      });
    } else{
      setIssueStatus(false);
      const data = {
        issue_id: issueData.id,
        solved: false
      };
      const axiosConfig: any = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
        },
      };
  
      BaseUrl.post(`/update-issue-status`, data, axiosConfig)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
      });
    }
  }

  var options: any = { year: "numeric", month: "numeric", day: "numeric" };

  const DateFunc = (val: any) => {
    const formatedDate = new Date(parseInt(val)).toLocaleString(
      "en-US",
      options
    );
    let dateType = formatedDate.replaceAll("/", "-")
    return dateType;
  };

  const renderMessage = (msgProp: {
    _id: string;
    createdAt: string;
    text: string;
    user: {
      _id: number | string;
    }
  }) => {
    return (
      <>
        {/* {msgProp.user._id === 461 ? */}
        {msgProp.user._id !== 'admin' ?
          <div className="yours messages">
            <div id="writer">{issueData.user_name}</div>
            <div className="yours message last">
                {msgProp.text}
              <p>{moment(msgProp.createdAt).format('LT')}</p>
            </div>
          </div>
          :
          <div className="mine messages">
            <div id="writer">{'Admin'}</div>
            <div className="message last">
              {msgProp.text}
              <p>{moment(msgProp.createdAt).format('LT')}</p>
            </div>
          </div>
        }
      </>
    );
  };
  
  return (
    <Fragment>
      <ToastContainer/>
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
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    <tr className="issueTr">
                      <td style={{ paddingLeft: 15 + "px", color: "#817EB7" }}>
                        {issueData.id}
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
                        {issueData.user_name}
                      </td>

                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        {issueData.teacher_name}
                      </td>
                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        {issueData.class_date}
                      </td>
                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        {issueData.payment}
                      </td>
                      <td style={{ color: "#817EB7", textAlign: "center" }}>
                        ${issueData.cost}
                      </td>
                      <td
                        style={{
                          color: "#817EB7",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {DateFunc(issueData.created)}
                      </td>
                      <td
                        style={{
                          color: "#817EB7",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Button
                          onClick={() => handleShowModal(issueData.id, issueData.user_id, issueData.teacher_user_id, issueData.user_name, issueData.teacher_name)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#817EB7",
                          }}
                        >
                          Chat
                        </Button>
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
                <div>
                  {messages.map((message, key) => {
                    return (
                      <div key={key}>
                        {renderMessage(message)}
                      </div>
                    )
                  })}       
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
                    onChange={handleChange}
                    value={txtValue}
                    disabled={issueStatus ? true : false}
                    style={{ border: "none", padding: "30px" }}
                    placeholder="Type your message..."
                  />
                </div>
                <div style={{ width: "10%", float: "right" ,textAlign:'right'}}>
                  <Button
                    className="btn btn-block"
                    onClick={handleSend}
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
                    onClick={()=>handleSetIssus(issueStatus)}
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
                    {issueStatus ? "Re-Open" : "Close issue"}
                  </Button>
                </div>
              </div>
              {showModal && (
                <Chat
                  classId = {classId}
                  userId = {userId}
                  teacherId = {teacherId}
                  userName = {userName}
                  teacherName = {teacherName}
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
