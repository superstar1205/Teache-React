import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTeacherDetail(props: any) {
  const [show, setShow] = useState(props.showModal);
  const [status, setStaus] = useState("");
  const [currentStatus , setCurrentStatus] = useState('');

  const handleClose = () => {
    setShow(false);
    props.handleCallback(false);
  };
  const handleChange = (e: any) => {
    setStaus(e.target.value);
  };

  const handleSubmitStatus = () => {

    if(status!==''){
      const data = {
        status: status,
        user_id: props.userId,
      }
      BaseUrl.post('/accept-reject-teacher',data).then(res=>{
        toast.success("Status Changed");
        setCurrentStatus(status)
        
      
      }).catch(err=>{
        toast.error("Something Went Wrong");
      })

    }
    else{
      toast.error("Please Select Status Option.")
    }

  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
      <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Teacher Current Status: {currentStatus===''?<span style={{color:props.userStatus==='accepted'?'green':'red', fontWeight:'bold'}}>{props.userStatus.toUpperCase()}</span>:<span style={{color:currentStatus==='accepted'?'green':'red', fontWeight:'bold'}}>{currentStatus.toUpperCase()}</span>}
          
          </p>

          <Form.Select
            onChange={handleChange}
            aria-label="Default select example"
            placeholder="Select Status"
          >
             <option value="" disabled selected>Select Status</option>
            <option value="awaiting">Awaiting</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
