import React, { Fragment, Dispatch } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import TopCard from "../../common/components/TopCard";
import { updateCurrentPath } from "../../store/actions/root.actions";
const issueSingle: React.FC = () => {
  // const dispatch: Dispatch<any> = useDispatch();
  // dispatch(updateCurrentPath("issueSingle", ""));

  return (
    <Fragment>
      <div className="table-responsive portlet">
        <table className="table">
          <thead>
            <tr
              style={{                         backgroundColor: "#807CD6", color: "white", height: "62px" }}
            >
              {/* <th scope="col">#</th> */}
              <th
                scope="col"
                style={{
                  paddingLeft: 20 + "px",
                  borderColor: "#DDE9FF",
                  verticalAlign: "middle",
                }}
              >
                Class ID
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                User
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Instructor
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Class Date
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Payment
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Cost
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Reported
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Chat
              </th>
              <th
                scope="col"
                style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}
              >
                Issue
              </th>
            </tr>
          </thead>
          <tbody style={{ color: "#6460F2" }}>
            <tr>
              <td style={{ paddingLeft: 20 + "px" }}>389</td>
              <td>Miguel</td>
              <td>
                <Link to={"/#"}>Tony C</Link>
              </td>
              <td>01-08-2022</td>
              <td>Pending</td>
              <td>$450.00</td>
              <td>01-08-2022</td>
              <td>Chat</td>
              <td>Issue</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="yours messages">
          <div className="message last">hello</div>
        </div>
        <div className="mine messages">
          <div className="message last">how`s it going?</div>
        </div>
      </div>
      <div style={{marginTop:'90px'}}>
        <div style={{ width: "80%", float: "left" }}>
          <Form.Control as="textarea" rows={4} />
        </div>
        <div style={{ width: "20%", float: "left", paddingLeft: "5%" }}>
          <Button
            className="btn btn-block"
            style={{
              width: "128px",
              height: "50px",
              left: "1742px",
              top: "869px",
              background: "#6460F2",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "160%",
              color: "#FFFFFF",
            }}
          >
            Send
          </Button>
          <Button className="btn btn-block" style={{
              width: "128px",
              height: "50px",
              left: "1742px",
              top: "869px",
              background: "#DDE9FF",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "160%",
              color: "#807CD6",
              border:'none'
            }}>Close issue</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default issueSingle;
