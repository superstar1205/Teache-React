import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddClass(props: any) {
  const [show, setShow] = useState(props.showModal);
  const [classType, setClassType] = useState("");

  const iconRef = useRef<HTMLInputElement>(null);
  const picRef = useRef<HTMLInputElement>(null);
  const [picImage, setPicImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [picData, setPicData] = useState(null);
  const [iconData, setIconData] = useState(null);


  useEffect(() => {
    console.log("I", iconImage);
    console.log("P", picImage);
  }, [picImage, iconImage]);
  const reader = new FileReader();
  const handleIconChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setIconImage(file);
      reader.addEventListener("load", () => {
        setIconData(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleIconDialog = (e: any) => {
    iconRef.current.click();
  };

  const handlePicChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPicImage(file);
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
      toast.error("Api doesn't exist!");
      // const axiosConfig: any = {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      //   },
      // };
      // const formData = new FormData();
      // formData.append('class_type', classType);
      // formData.append('class_icon', iconData);
      // formData.append('class_picture', picData);
      // BaseUrl.put(`/addclass`, formData, axiosConfig).then((res) => {
      //   if(res.status === 200){
      //     toast.success("Class added successfully!");
      //   } else{
      //     toast.error(res.data.message ? res.data.message : "Something was wrong!");
      //   }
      // });
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
            <b>Add Class</b>
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
            placeholder="Enter Class Type"
            style={{
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              borderRadius: "10px",
              background: "#FFFFFF",
              border: "none",
              height: "45px",
              color: "#817EB7",
            }}
          ></Form.Control>

          <Row style={{ marginTop: "20px" }}>
            <Col>
              <div
                style={{
                  background: "white",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  height: "193px",
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
                <div>
                  <img
                    src={iconData ? iconData : "/upload_icon.png"}
                    style={{
                      width: "35px",
                      height: "35px",
                      marginTop: "10%",
                    }}
                    alt=""
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <input
                    ref={iconRef}
                    className="d-none"
                    type="file"
                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    onChange={handleIconChange}
                  />
                  <button
                    style={{
                      backgroundColor: "#DDE9FF",
                      border: "none",
                      borderRadius: "8px",
                      height: "45px",
                      color: "#807CD6",
                      marginTop: "10%",
                      fontWeight: 600,
                    }}
                    onClick={handleIconDialog}
                  >
                    Change Icon
                  </button>
                </div>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  background: "white",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  borderRadius: "10px",
                  height: "193px",
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
                      width: "35px",
                      height: "35px",
                      marginTop: "10%",
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
                      height: "45px",
                      color: "#807CD6",
                      marginTop: "10%",
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
          <p
            style={{
              fontSize: "16px",
              lineHeight: "160%",
              /* identical to box height, or 29px */
              fontWeight: 500,
              textTransform: "capitalize",
              marginTop: "30px",
              marginBottom: "8px",
            }}
          >
            Class ID <span style={{ color: "#C4C2E9" }}>(Auto generated)</span>
          </p>
          <Form.Control
            className="custom"
            onChange={handleChange}
            aria-label="Default select example"
            type="text"
            placeholder="234"
            style={{
              boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
              borderRadius: "10px",
              background: "#FFFFFF",
              border: "none",
              height: "45px",
              color: "#817EB7",
            }}
          ></Form.Control>
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
            Add a Class
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
