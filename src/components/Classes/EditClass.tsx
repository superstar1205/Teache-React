import React, { useState, useRef } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditClass(props: any) {
  const id = props.editId;
  const [show, setShow] = useState(props.showModal);
  const [classType, setClassType] = useState(props.editTitle);
  const picRef = useRef<HTMLInputElement>(null);
  const [picData, setPicData] = useState(props.editPic);
  const [iconData, setIconData] = useState(props.editIcon);
  const icons = [
    "academics", "aid", "air", "american football", "art", "ball", "beans", "bike", "board game", "camera", "cards", "clothes", "coin", "communication", "computer", "design", "disc ", "dog", "drama", "drink", "drive", "fast", "flower", "food", "game console", "gymnastics", "hand making", "horse", "house", "meditation", "mountain", "music", "pen", "phone", "plane", "precission ", "raquet", "rope", "science", "self defence", "shoes", "skating", "smell", "snow", "star", "strenght", "styling", "tools", "water", "wheelchair sports"
  ];

  const reader = new FileReader();
  const handleShowIcon = (e: any) => {
    console.log(e.target.value);
    setIconData(e.target.value)
  }

  const handlePicChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      reader.addEventListener("load", () => {
        setPicData(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handlePicDialog = (e: any) => {
    picRef.current.click();
  };

  const handleClose = () => {
    setShow(false);
    props.handleCallback(false);
  };
  const handleChange = (e: any) => {
    setClassType(e.target.value);
  };

  const handleSubmitStatus = () => {
    if(classType === ""){
      toast.error("Please Enter Class Type!");
    } else if(iconData === null){
      toast.error("Please Select Class Icon!");
    } else if(picData === null){
      toast.error("Please Enter Class Picture!");
    } else {
      const axiosConfig: any = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
        },
      };
      const formData = new FormData();
      formData.append('class_picture', picData);
      BaseUrl.post(`/upload-file`, formData, axiosConfig).then((res) => {
        if(res.status === 200){
          toast.success("File upload successfully!");
          const cdata = {
            icon : iconData,
            picture : res.data.data.Location,
            title : classType,
          };
          BaseUrl.post(`/update-class-type/${id}`, cdata, axiosConfig).then((res) => {
            if(res.status === 200){
              toast.success("Class added successfully!");
            }
          });
        } else{
          toast.error(res.data.message ? res.data.message : "Something was wrong!");
        }
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <ToastContainer />
        <Modal.Header
          className="text-center"
          closeButton
          style={{ backgroundColor: "#DDE9FF", color: "#5D59B4" }}
        >
          <Modal.Title style={{ marginLeft: "35%" }}>
            <b>Edit Class</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#5D59B4" }}>
          <p
            id="classtype"
            style={{
              fontSize: "15px",
              lineHeight: "160%",
              marginBottom: "7px",
              marginTop: "17px",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            Class Type
          </p>
          <Form.Control
            className="custom"
            onChange={handleChange}
            aria-label="Default select example"
            type="text"
            value={classType}
            placeholder={classType}
            style={{
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              borderRadius: "10px",
              background: "#FFFFFF",
              border: "none",
              height: "45px",
              color: "#817EB7",
            }}
          ></Form.Control>
          <p
            id="classicon"
            style={{
              fontSize: "15px",
              lineHeight: "160%",
              marginBottom: "7px",
              marginTop: "17px",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            Class Icon
          </p>
          <Form.Select
          id="classIcon"
          className="custom"
          aria-label="Default select example"
          onChange={handleShowIcon}
          style={{
            boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
            borderRadius: "10px",
            background: "#FFFFFF",
            border: "none",
            height: "45px",
            color: "#817EB7",
          }}>
            <option value={iconData}>{iconData}</option>
            {icons.map((item: any, key) => (
              <option value={item} key={key}>{item}</option>
            ))}
          </Form.Select>

          <Row style={{ marginTop: "20px" }}>
            <Col>
              <div
                style={{
                  background: "white",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  height: "194px",
                  textAlign: "center",
                }}
              >
                <div
                  className="text-center"
                  style={{
                    paddingTop: "8%",
                    color: "#5D59B4",
                    fontWeight: 600,
                    paddingRight: "7px",
                    textAlign: "center",
                  }}
                >
                  Icon
                </div>
                  <img
                    src={iconData ? "/icons/"+iconData+".svg" : "/upload_icon.png"}
                    style={{
                      width: "36px",
                      height: "36px",
                      marginTop: "16%",
                    }}
                    alt=""
                  />
              </div>
            </Col>
            <Col>
              <div
                style={{
                  background: "white",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  height: "194px",
                  textAlign: "center",
                }}
              >
                <div
                  className="text-center"
                  style={{
                    paddingTop: "8%",
                    color: "#5D59B4",
                    fontWeight: 600,
                  }}
                >
                  Picture
                </div>
                <div>
                  <img
                    src={picData ? picData :"/upload_img.png"}
                    style={{
                      width: "96px",
                      height: "96px",
                      marginTop: "8px",
                    }}
                    alt=""
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <input
                    ref={picRef}
                    className="d-none"
                    onChange={handlePicChange}
                    type="file"
                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                  />
                  <button
                    style={{
                      backgroundColor: "#DDE9FF",
                      border: "none",
                      borderRadius: "8px",
                      height: "36px",
                      color: "#807CD6",
                      marginTop: "8px",
                      fontWeight: 600,
                    }}
                    onClick={handlePicDialog}
                  >
                    Add Picture
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          style={{
            border: "none",
            textAlign: "center",
            justifyContent: "center",
            paddingTop: "0px",
          }}
        >
          <Button
            variant="primary"
            onClick={handleSubmitStatus}
            style={{
              backgroundColor: "#6460F2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              height: "45px",
            }}
          >
            Edit Class
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
