import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import ViewUserDetail from "../Users/ViewUserDetail";
import BaseUrl from "../../BaseUrl/BaseUrl";
import EditUserDetail from "../Users/EditUserDetail";
import { FormControl, Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";

function getBadge(status: string) {
  let bg, fontColor, _status;
  switch (status) {
    case "active":
      bg = "#B8F4DB";
      fontColor = "#246B4D";
      _status = "Active";
      break;
    case "inactive":
      bg = "#FFD6D2";
      fontColor = "#A8433A";
      _status = "Inactive";
      break;
    case "block":
      bg = "#DDE9FF";
      fontColor = "#A8433A";
      _status = "Block";
      break;
    default:
      break;
  }
  return (
    <h5>
      <a
        href="#"
        className="badge"
        style={{
          backgroundColor: bg,
          color: fontColor,
          textDecoration: "none",
          borderRadius: "20px",
        }}
      >
        {_status}
      </a>
      {/* <Badge pill style={{ backgroundColor: bg, color: fontColor }}>
        {status}
      </Badge> */}
    </h5>
  );
}

const Users: React.FC = () => {
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

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
        <div className="card mb-4" style={{border: 'none'}}>
            <div className="card-body">
              <div style={{ marginBottom: 10 }}>
                <Row>
                  <Col
                    style={{
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "160%",
                      color: "#5D59B4",
                      padding: "30px 20px 0px",
                    }}
                  >
                    ID : 22
                  </Col>
                  <Col xs={4}>
                    <InputGroup
                      className="mb-2"
                      style={{                        
                        borderRadius: "10px",
                        paddingTop: '20px'
                      }}
                    >
                      <FormControl
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        id="inlineFormInputGroup"
                        placeholder="Search User"
                        style={{boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",}}
                      />
                      <InputGroup.Text>
                        <i className="fa fa-search"></i>
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
                  <Col
                    style={{
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "160%",
                      color: "#5D59B4",
                      textAlign: "right",
                      padding: "30px 20px 0px 0px",
                    }}
                  >
                    <span
                      style={{
                        width: "50px",
                      }}
                    >
                      {"Total instructors : 6"}
                    </span>
                  </Col>
                </Row>
              </div>
              {showModal && (
                <EditUserDetail
                  userId={userId}
                  userStatus={userStatus}
                  showModal={showModal}
                  handleCallback={handleParentCallback}
                />
              )}
              {viewDetail && (
                <ViewUserDetail
                  detail={detail}
                  viewDetail={viewDetail}
                  handleViewParentCallback={handleViewParentCallback}
                />
              )}
              <div className="table-responsive portlet">
                <table className="table">
                  <thead>
                    <tr
                      style={{   backgroundColor: "#807CD6", color: "white" }}
                      className="rounded-top"
                    >
                      {/* <th scope="col">#</th> */}
                      <th scope="col" style={{ paddingLeft: 20 + "px" }}>
                        Instructor
                      </th>
                      <th scope="col">Ins ID</th>
                      <th scope="col">City</th>
                      <th scope="col">State</th>
                      <th scope="col">Email</th>
                      <th scope="col">Classes</th>
                      <th scope="col">Revenue</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {userData &&
                      userData.length > 0 &&
                      userData.map((item: any, index) => (
                        <tr key={index}>
                          {/* <td>{index+1}</td> */}
                          <td style={{ paddingLeft: 20 + "px" }}>
                            {item.first_name} {item.last_name}
                          </td>
                          <td>
                            <Link
                              className="nav-link"
                              to={{
                                pathname: `/users/${item.id}}`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                            >
                              <span>{item.id}</span>
                            </Link>
                          </td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>{item.email}</td>
                          <td>
                            <Link
                              className="nav-link"
                              to={{
                                pathname: `/users/${item.id}}`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                            >
                              <span>{'2334'}</span>
                              {/* <span>{item.classes}</span> */}
                            </Link>
                          </td>
                          <td>{getBadge(item.status)}</td>
                          <td>{item.activated}</td>
                          {/* <td>
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                          </td> */}
                          <td
                            className="justify-content-center"
                            style={{ paddingLeft: "30px" }}
                          >
                            <button
                              style={{
                                marginRight: 10,
                                background: "#6460F2",
                                color: "#FFFFFF",
                                border: "1px solid #DDE9FF",
                                borderRadius: "5px",
                              }}
                              className="btn btn-primary btn-sm"
                              onClick={() => handleViewShowModal(item)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              style={{
                                marginRight: 10,
                                background: "#DDE9FF",
                                color: "#807CD6",
                                border: "1px solid #DDE9FF",
                                borderRadius: "5px",
                              }}
                              onClick={() =>
                                handleShowModal(item.id, item.status)
                              }
                              className="btn btn-secondary btn-sm"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              style={{
                                marginRight: 10,
                                background: "#DDE9FF",
                                color: "#807CD6",
                                border: "1px solid #DDE9FF",
                                borderRadius: "5px",
                                width: "32px",
                              }}
                              className="btn btn-danger btn-sm"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
