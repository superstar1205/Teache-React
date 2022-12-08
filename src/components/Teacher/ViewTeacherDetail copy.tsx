import React,{useMemo, useState} from "react";
import {Button , Modal} from 'react-bootstrap';
import '../../styles/style.css';
import TeacherTab from './TeacherTab';
import BaseUrl from "../../BaseUrl/BaseUrl";

export default function ViewTeacherDetail(props:any) {
    const [show, setShow] = useState(props.viewDetail);
    const [teacherDetail , setTeacherDetail]:any[] = useState([])

    const handleClose = () =>{
        setShow(false);
    props.handleViewParentCallback(false)
    }

    useMemo(()=>{
      BaseUrl.get(`/teachers/${props.userId}`).then(res=>{
        console.log(res)
        setTeacherDetail(res.data.data)

      })


    },[props.userId])
  
    return (
      <>
        <Modal size = "lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title color="blue">View Teacher Detail </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{textAlign:'center'}}>
            <div className="img-style"></div>
            <h5>{props.user.first_name}{' '}{props.user.last_name}</h5>
            <span><b>Email:</b> {props.user.email}</span> <br/>  <span><b>Phone:</b>{props.user.country_code}{' '}{props.user.phone_number}</span>
           <p> <b>Location:</b> {props.user.city}{', '}{props.user.state}</p>

            </div>
            <TeacherTab teacherDetail = {teacherDetail}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
