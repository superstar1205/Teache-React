import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import ListGroup from 'react-bootstrap/ListGroup';
export default function ViewTransactionDetail(props: any) {
  const [show, setShow] = useState(props.viewDetail);
//   var options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

//   const DateFunc = (val:any)=>{
    
//     console.log(val)
//    const formatedDate =  new Date(parseInt(val)).toLocaleString("en-US", options)
//    console.log(formatedDate)
//    return formatedDate

//   }

  const handleClose = () => {
    setShow(false);
    props.handleViewParentCallback(false);
  };
  
//   const fontStyle:any= {
//     fontSize:10,
//     color:'grey',
//     fontWeight:'bold'
//   }

//   const profileQuestion = {
//     'a':'First Name',
//     'b':'Last Name',
//     'c':'Address1',
//     'd':'Address2',
//     'e':'Zip Code',
//     'f':'city',
//     'g':'state',
//     'h':'Email',
//     'i':'Phone',
//     'j':'Signup Date',
//     'k':'Last Updated At',
//     'l':'price per private class',
//     'm':'What is your Discount policy for group classes',
//     'n':'What is your Discount policy for private classes',
//     'o':'Class Images'
//   }


  return (
    <>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* {JSON.stringify(props.detail)} */}

            <p>Transaction id : 3sew11121221</p>
            <Button size="sm" variant="primary" onClick={handleClose}>
            View History
          </Button>
  
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
