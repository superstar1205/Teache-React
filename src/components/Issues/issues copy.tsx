import React, { Fragment, Dispatch, useState, useEffect } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { FormControl, Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
// import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


const Issues: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [userData, setUserData] = useState([]);
  console.log("userData", userData);
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [detail, setDetail] = useState();
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStaus, setSelectedStatus] = useState("");
  const [loader, setLoader] = useState(true);

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleViewParentCallback = (childData: any) => {
    setViewDetail(childData);
  };

  const handleShowModal = (id: any, status: string) => {
    setShowModal(true);
    setUserId(id);
    setUserStatus(status);
  };

  const handleViewShowModal = (item: any) => {
    setViewDetail(true);
    setDetail(item);
  };

  useEffect(() => {
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };
    BaseUrl.get(
      `/user?page=${selectedOption}&search=${searchText}&filter=${selectedStaus}`,
      axiosConfig
    ).then((res) => {
      if (res.status === 200) {
        if (res.data) {
          setUserData(res.data.data);
          setTotalCount(res.data.count);
          console.log(res.data.count, "------------count");
        } else {
          setUserData([]);
          setTotalCount(0);
        }
      } else {
        setUserData([]);
        setTotalCount(0);
      }
    });
  }, [showModal, searchText, selectedOption, selectedStaus]);

  const handleClear = () => {
    setSearchText("");
    setSelectedOption("");
  };
  const handleSelectedClear = () => {
    setSelectedStatus("");
    setSelectedOption("");
  };

  const handleOption = () => {
    let content = [];
    for (var index = 1; index <= Math.ceil(totalCount / 10); index++) {
      content.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }
    console.log(Math.ceil(totalCount / 10), "-----------content");
    return content;
  };
  const handleSelectedOption = (e: any) => {
    setSelectedOption(e.target.value);
  };
  const handleStatusSelection = (e: any) => {
    setSelectedStatus(e.target.value);
  };

  let btnClass = {
    borderRadius: "8px",
    marginLeft: "3px",
    background: "#6460F2",
    border: "none",
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
        <div className="card mb-4" style={{border: 'none'}}>
            {/* <div className="card-header py-3">
              <h6
                className="m-0 font-weight-bold"
                style={{ fontSize: "20px", color: "#5a67de" }}
              >
                Issues List
              </h6>
              <div className="header-buttons"></div>
            </div> */}
            <div className="card-body">
              <div style={{ marginBottom: 20 }}>
                <Row>
                  <Col lg="4" xs="auto">
                    <ToggleButtonGroup
                      type="radio"
                      name="options1"
                      defaultValue={1}
                      style={{
                        paddingTop: "10px",
                        paddingRight: "4px",
                        borderRadius: "10px",
                        boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                        background:'white'
                      }}
                    >
                      <ToggleButton id="tbg-radio-1" value={1} style={btnClass}>
                        <i
                          className="fas fa-briefcase"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Instructors
                      </ToggleButton>
                      <ToggleButton id="tbg-radio-2" value={2} style={{...btnClass,background:'white',color:'#6460F2'}}>
                        <i
                          className="fas fa-users"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Users
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                  <Col lg="4" xs="auto" style={{ paddingTop: "8px" }}>
                  <InputGroup
                      className="mb-2"
                      style={{
                        height: "51px",
                        width: "445px",
                        background: "#FFFFFF",
                        boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                        borderRadius: "10px",
                      }}
                    >
                      <FormControl
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        id="inlineFormInputGroup"
                        placeholder="Search User"
                        style={{ height: "51px",border: 'none' }}
                      />
                      <InputGroup.Text
                        style={{
                          color: "#807CD6",
                          background: "#DDE9FF",
                          width: "56px",
                          border: 'none'
                        }}
                      >
                        <i
                          style={{ width: "24px", height: "18px" }}
                          className="fa fa-search"
                        ></i>
                      </InputGroup.Text>
                      {searchText !== "" && (
                        <button
                          style={{ marginRight: 5 }}
                          className="btn btn-secondary btn-sm"
                          onClick={handleClear}
                        >
                          Clear
                        </button>
                      )}
                    </InputGroup>
                  </Col>
                  <Col lg="4" xs="auto">
                    <Row>
                      <Col md={{ span: 3, offset: 6 }}>
                        <ToggleButtonGroup
                          type="radio"
                          name="options2"
                          defaultValue={1}
                          style={{
                            paddingTop: "10px",
                            paddingRight: "4px",
                            borderRadius: "10px",
                            boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                            background:'white'
                          }}
                          // style={{
                          //   paddingTop: "8px",
                          //   paddingRight: "4px",
                          //   borderRadius: "10px",
                          // }}
                        >
                          <ToggleButton
                            id="tbg-radio-3"
                            value={1}
                            style={btnClass}
                          >
                            Active
                          </ToggleButton>
                          <ToggleButton
                            id="tbg-radio-4"
                            value={2}
                            style={{...btnClass, background:'white',color:'#6460F2'}}
                          >
                            Closed
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div className="table-responsive portlet">
                <table
                  style={{ textAlign: "center", fontSize: 14 }}
                  className="table"
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#807CD6",
                        color: "white",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      {/* <th scope="col" style={{ verticalAlign: "middle" }}>#</th> */} 
                      <th scope="col" style={{ paddingLeft: 20 + "px", verticalAlign: "middle"}}>
                        ClassID
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>User</th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>Instructor</th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>Class Date</th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>Payment</th>

                      <th scope="col" style={{ verticalAlign: "middle" }}>Cost</th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>Reported</th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>Chat</th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>Payment Status</th>
                      {/* <th className="col-3" scope="col">
                        Message
                      </th> */}
                      <th scope="col" style={{ verticalAlign: "middle" }}>Issue</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    <tr>
                      <td>Tom Day</td>
                      <td>New York</td>
                      <td>Brooklyn</td>
                      <td>Boxing</td>
                      <td>lennie Cassidy</td>
                      <td>09/09/2021</td>
                      {/* <td>3:00 PM</td> */}
                      {/* <td>$250.00</td>
                      <td>Processed</td> */}
                      <td>
                        <a href="/message" style={{ textDecoration: "none" }}>
                          I have a problem with the Instructor.He is not .....
                        </a>
                      </td>
                      <td>
                        <button className="btn" style={{ color: "#6460F2" }}>
                          Chat
                        </button>
                      </td>
                      <td>
                        <i
                          style={{ color: "green" }}
                          className="fas fa-check"
                        ></i>
                      </td>
                      <td>
                        <Link to={`/issues/${2343}`}>Issue</Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Tom Day</td>
                      <td>New York</td>
                      <td>Brooklyn</td>
                      <td>Boxing</td>
                      <td>lennie Cassidy</td>
                      <td>09/09/2021</td>
                      {/* <td>3:00 PM</td> */}
                      {/* <td>$250.00</td>
                      <td>Processed</td> */}
                      <td>
                        <a href="/message" style={{ textDecoration: "none" }}>
                          I have a problem with the Instructor.He is not .....
                        </a>
                      </td>
                      <td>
                        <button className="btn" style={{ color: "#6460F2" }}>
                          Chat
                        </button>
                      </td>
                      <td>
                        <i
                          style={{ color: "green" }}
                          className="fas fa-check"
                        ></i>
                      </td>
                      <td>
                        <Link to={`/issues/${2343}`}>Issue</Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Tom Day</td>
                      <td>New York</td>
                      <td>Brooklyn</td>
                      <td>Boxing</td>
                      <td>lennie Cassidy</td>
                      <td>09/09/2021</td>
                      {/* <td>3:00 PM</td> */}
                      {/* <td>$250.00</td>
                      <td>Processed</td> */}
                      <td>
                        <a href="/message" style={{ textDecoration: "none" }}>
                          I have a problem with the Instructor.He is not .....
                        </a>
                      </td>
                      <td>
                        <button className="btn" style={{ color: "#6460F2" }}>
                          Chat
                        </button>
                      </td>
                      <td>-</td>
                      <td>
                        <Link to={`/issues/${2343}`}>Issue</Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Tom Day</td>
                      <td>New York</td>
                      <td>Brooklyn</td>
                      <td>Boxing</td>
                      <td>lennie Cassidy</td>
                      <td>09/09/2021</td>
                      {/* <td>3:00 PM</td> */}
                      {/* <td>$250.00</td>
                      <td>Processed</td> */}
                      <td>
                        <a href="/message" style={{ textDecoration: "none" }}>
                          I have a problem with the Instructor.He is not .....
                        </a>
                      </td>
                      <td>
                        <button className="btn" style={{ color: "#6460F2" }}>
                          Chat
                        </button>
                      </td>
                      <td>-</td>
                      <td>
                        <Link to={`/issues/${2343}`}>Issue</Link>
                        {/* <i
                          style={{ color: "red" }}
                          className="fas fa-check"
                        ></i>*/}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex" style={{ color: "#6460F2" }}>
                  <div className="p-2 flex-grow-1">
                    <div style={{ paddingLeft: 20 + "px" }}>
                      <label style={{ marginRight: 10 }}>Item per page:</label>
                      <select
                        value={selectedOption}
                        onChange={(e) => handleSelectedOption(e)}
                      >
                        {handleOption()}
                      </select>
                    </div>
                  </div>
                  <div className="p-2">
                    <div>
                      <label style={{ marginRight: 10 }}>Move to:</label>
                      <select
                        value={selectedOption}
                        onChange={(e) => handleSelectedOption(e)}
                      >
                        {handleOption()}
                      </select>
                    </div>
                  </div>
                  <div className="p-2">
                    <div>
                      <label style={{ marginRight: 10 }}>10 of 250</label>
                      <button
                        style={{ marginRight: 10 }}
                        type="button"
                        className="btn btn-default btn-sm"
                      >
                        <i className="fas fa-angle-left"></i>
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-angle-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div> */}
                {/* <label style={{marginRight:10}}>Move to:</label>
                  <select value= {selectedOption} onChange={(e)=>handleSelectedOption(e)}>
                 {
                   handleOption()
                 }
                 </select> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Issues;
