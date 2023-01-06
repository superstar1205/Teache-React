import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { usePubNub } from 'pubnub-react';
import moment from 'moment';
import { Modal } from "react-bootstrap";

export default function EditUserDetail(props: any) {
  const [show, setShow] = useState(props.showModal);
  const pubNub = usePubNub();
  const [messages, setMessages] = useState<any[]>([]);
  var dateStatus = "";
  const date = {
    today : new Date(),
  };
  var todayDate = moment(date.today).format('LL');
  let channelId: string = '';
  if (props.userId && props.teacherId) {
    channelId = props.userId + '_channel_inst' + props.teacherId; //"461_channel_inst463";
  }

  useEffect(() => {
    if (pubNub) {
      const listener = {
        message: envelope => {
          console.log('envelope: ', envelope.message[0]);
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

  const handleClose = () => {
    props.handleCallback(false);
  };

  const renderMessage = (msgProp: {
    _id: string;
    createdAt: string;
    text: string;
    user: {
      _id: number;
    }
  }) => {
    return (
      <>
        {/* {msgProp.user._id === 461 ? */}
        {msgProp.user._id === props.teacherId ?
          <div className="yours messages">
            <div id="writer">{props.teacherName}</div>
            <div className="yours message last">
                {msgProp.text}
              <p>{moment(msgProp.createdAt).format('LT')}</p>
            </div>
          </div>
          :
          <div className="mine messages">
            <div id="writer">{props.userName}</div>
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
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header
          className="text-center"
          closeButton
          style={{
            backgroundColor: "#DDE9FF",
            color: "#5D59B4",
            paddingRight: "30px",
          }}
        >
          <Modal.Title
            style={{
              marginLeft: "40%",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "160%",
              border: "none",
              textTransform: "capitalize",
            }}
          >
            Chat History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "#F9FBFF",
            height: "600px",
            padding: "20px 30px",
            overflow: "scroll",
          }}
        >
          <div>
          { messages &&
                  messages.map((message, key) => {
                    console.log("Init Date", dateStatus);
                    if(todayDate === moment(message.createdAt).format('LL')){
                      todayDate = "";
                      dateStatus = moment(message.createdAt).format('LL');
                      return (
                        <div key={key}>
                          <p className="text-center text-primary">Today</p>
                          {renderMessage(message)}
                        </div>
                      );
                    } else if(dateStatus === moment(message.createdAt).format('LL')){
                      return (
                        <div key={key}>
                          {renderMessage(message)}
                        </div>
                      );
                    } else{
                      dateStatus = moment(message.createdAt).format('LL');
                      return (
                        <div key={key}>
                          <p className="text-center text-info">{moment(message.createdAt).format('LL')}</p>
                          {renderMessage(message)}
                        </div>
                      );
                    }
                  })}      
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
