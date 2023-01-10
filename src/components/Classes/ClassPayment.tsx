import React, { useEffect, useState } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { Modal, Row, Button} from "react-bootstrap";

import { toast } from "react-toastify";

const axiosConfig: any = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
  },
};

export default function ClassPayment(props:any) {
    console.log(props);
    const id = props.classId;
    const cost = props.cost;
    const fee = props.fee;
    const refund_amount = props.refund;
    const [paymentModal, setPaymentModal] = useState(false);
    const [selectedPayment, setSelectedpayment] = useState("");
    const [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status);
    }, [props])

    const style:any = {
        pptxt: {
        marginTop: "25px",
        fontSize: "18px",
        textAlgin: "center",
        },
        pbtxt: {
        fontSize: "15.5px",
        color: "#6460F2",
        fontWeight: 600,
        },
        pbtn: {
        border: "none",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "160%",
        borderRadius: "8px",
        height: "40px",
        marginBottom: "16px"
        },
    };

    const handleRefundUser = () => {
        setSelectedpayment("refund");
        setPaymentModal(true);
    };
    const handleReleaseInstructor = () => {
        setSelectedpayment("process");
        setPaymentModal(true);
    };

    const cancelPayment = () => {
        setSelectedpayment("");
        setPaymentModal(false);
    }

    const ConfirmPayment = () => {
        if(selectedPayment === "refund"){
        const cdata = {
            status: "refund",
            class_id: Number(id)
        };
        BaseUrl.post(`/update-class-payment`, cdata, axiosConfig)
        .then((res)=>{
            if(res.status === 200){
                setStatus(3);
            toast.success(res.data.message && res.data.message);
            }
        })
        .catch(function (error) {
            if (error.response) {
            toast.error(error.response.data && error.response.data.message);
            } else if (error.request) {
            console.log(error.request);
            } else {
            console.log('Error', error.message);
            }
        });
        setPaymentModal(false);
        } else if(selectedPayment === "process"){
        const data = {
            class_id: Number(id),
            status: "process"
        };
        BaseUrl.post(`/update-class-payment`, data, axiosConfig)
        .then((res)=>{
            if(res.status === 200){
            setStatus(4);
            toast.success(res.data.message && res.data.message);
            }
        })
        .catch(function (error) {
            if (error.response) {
                toast.error(error.response.data && error.response.data.message);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
        setPaymentModal(false);
        }
    }

    const handleHoldPayment = ()=> {
        const data = {
        class_id: Number(id),
        status: "hold"
        };
        BaseUrl.post(`/update-class-payment`, data, axiosConfig)
        .then((res)=>{
        if(res.status === 200){
            setStatus(1);
            toast.success(res.data.message && res.data.message);
        }
        })
        .catch(function (error) {
        if (error.response) {
            toast.error(error.response.data && error.response.data.message);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        });
    };
  
  return (
  <>
    <Modal
      centered
      show={paymentModal}
      backdrop="static"
      onHide={() => setPaymentModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <div className="p-3">
        <Modal.Title id="example-modal-sizes-title-sm">
          {selectedPayment === "refund" ? "Are you sure to refund to user?" : "Are you sure to release to Instructor?"}
        </Modal.Title>

        <Modal.Body>
          <div className=" d-flex flex-row w-100  mt-2">
            <button
              onClick={cancelPayment}
              className="btn btn-danger  mr-3 btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={ConfirmPayment}
              className="btn btn-primary btn-sm"
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
    {status === 1 && <div>
      <div
      style={{
        maxWidth: "360px",
        background: "#DDE9FF",
        borderRadius: "15px",
        paddingBottom: "16px",
        textAlign: "center",
      }}
      >
        <p
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "19px",
            lineHeight: "120%",
            paddingTop: "30px",
            textAlign: "center",
            color: "#6460F2",
          }}
        >
          Payment Status : Hold
        </p>
        
        <p
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "19px",
            lineHeight: "120%",
            textAlign: "center",
            marginTop: "10px",
            color: "#6460F2",
          }}
        >
          Hold Amount :  ${cost}
        </p>
      </div>
      <div
      style={{
        maxWidth: "360px",
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
            ...style.pbtn,
            backgroundColor: "#6460F2",
            color: "white"
          }}
          >Refund to user</Button>
        </Row>
        <Row>
        <Button
          onClick={handleReleaseInstructor}
          style={{
            ...style.pbtn,
            backgroundColor: "white",
            color: "#6460F2",
          }}
          >Release to Instructor</Button>
        </Row>
      </div>
    </div>}
    {status === 2 && 
      <div
      style={{
        maxWidth: "360px",
        background: "#DDE9FF",
        borderRadius: "15px",
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
          Teache Received : {cost}
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
            onClick = {handleHoldPayment}
          >
            Hold Payment
          </Button>
      </div>}
    {status === 3 && <div
        style={{
          width: "360px",
          height: "128px",
          background: "#DDE9FF",
          borderRadius: "10px",
          marginTop: "16px",
        }}
      >
        <div
          className="text-center"
          style={{
            height: "60px",
            background: "#6460F2",
            color: "white",
            paddingTop: "20px",
            fontSize: "16px",
            boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <b>Refund to User</b>
        </div>
        <p className="text-center" style={style.pptxt}>
          <b
            style={style.pbtxt}
          >
            Refund Amount:
          </b>{" "}
          <b
            style={{
              ...style.pbtxt,
              color: "#817EB7",
              fontWeight: 500,
            }}
          >
            ${refund_amount}
          </b>
        </p>
    </div>}
    {status === 4 && <div
        style={{
          width: "360px",
          height: "128px",
          background: "#DDE9FF",
          borderRadius: "10px",
          marginTop: "16px",
        }}
      >
        <div
          className="text-center"
          style={{
            height: "60px",
            background: "#6460F2",
            color: "white",
            paddingTop: "20px",
            fontSize: "16px",
            boxShadow: "19px 10px 53px 7px rgba(27, 30, 123, 0.06)",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <b>Processed to Instructor</b>
        </div>
        <p className="text-center" style={style.pptxt}>
          <b
            style={style.pbtxt}
          >
            Process Amount:
          </b>{" "}
          <b
            style={{
              ...style.pbtxt,
              color: "#817EB7",
              fontWeight: 500,
            }}
          >
             ${fee}
          </b>
        </p>
    </div>}
  </>
  );
}
