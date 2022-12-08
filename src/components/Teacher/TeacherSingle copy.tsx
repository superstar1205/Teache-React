import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import ViewTeacherDetail from "./ViewTeacherDetail";
import BaseUrl from "../../BaseUrl/BaseUrl";
import EditUserDetail from "../Users/EditUserDetail";
import { Col, Row, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

var options: any = { year: "numeric", month: "long", day: "numeric" };
const DateFunc = (val: any) => {
  const formatedDate = new Date(parseInt(val)).toLocaleString("en-US", options);
  return formatedDate;
};

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
    </h5>
  );
}

const Users: React.FC = (props: object) => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [userData, setUserData] = useState([]);

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
          console.log(res.data.data, "------------count");
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
          <div className="card  mb-4" style={{border:'none'}}>
            <div className="card-header py-3" style={{ border: "none" }}>
              <Row>
                <Col md={{ span: 2, offset: 5 }}>
                  <Image
                    width={110}
                    height={110}
                    src="/teacher.png"
                    style={{ borderRadius: "15px" }}
                  />
                  {/* <img  src="/userInfo.png" alt="alt" /> */}
                </Col>
              </Row>
            </div>
            <div className="card-body" style={{ paddingTop: "0px" }}>
              <div style={{ marginBottom: 20 }}></div>
              {showModal && (
                <EditUserDetail
                  userId={userId}
                  userStatus={userStatus}
                  showModal={showModal}
                  handleCallback={handleParentCallback}
                />
              )}
              {viewDetail && (
                <ViewTeacherDetail
                  detail={detail}
                  viewDetail={viewDetail}
                  handleViewParentCallback={handleViewParentCallback}
                />
              )}
              <div className="table-responsive portlet">
                <table className="table">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#807CD6",
                        color: "white",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 20 + "px",
                          verticalAlign: "middle",
                        }}
                      >
                        Instructor
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Ins ID
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        City
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        State
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Email
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Classes
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Status
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Activated
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Lasted
                      </th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {userData && userData.length ? (
                      <tr>
                        <td style={{ paddingLeft: "20px" }}>
                          {userData[0].first_name} {userData[0].last_name}
                        </td>
                        <td>
                          <Link
                            className="nav-link"
                            to={`/users/${userData[0].id}`}
                          >
                            {userData[0].id}
                          </Link>
                        </td>
                        <td>{userData[0].city}</td>
                        <td>{userData[0].state}</td>
                        <td>{userData[0].email}</td>
                        <td>
                          <Link
                            className="nav-link"
                            to={`/users/${userData[0].id}`}
                          >
                            {userData[0].classes}
                          </Link>
                        </td>
                        <td>{getBadge(userData[0].status)}</td>
                        <td>{DateFunc(userData[0].created_at)}</td>
                        <td>{DateFunc(userData[0].updated_at)}</td>
                        <td
                          className="justify-content-center"
                          style={{ paddingLeft: "30px" }}
                        >
                          <Button
                            variant="light"
                            onClick={() => handleViewShowModal("item")}
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </div>
              {/* ************************ */}
              <Row
                style={{
                  marginTop: "20px",
                  marginBottom: "15px",
                  color: "#6460F2",
                }}
              >
                <Col
                  md={{ span: 3 }}
                  style={{ fontSize: "30px", paddingLeft: "15px" }}
                >
                  <b>Classes</b>
                </Col>
                <Col md={{ span: 3, offset: 6 }} style={{ paddingTop: "30px" }}>
                  <span>Total Classes : </span> 4
                </Col>
              </Row>
              <div className="table-responsive portlet">
                <table className="table">
                  <thead>
                    <tr
                      style={{ backgroundColor: "#DDE9FF", color: "#6460F2" ,height: '62px'}}
                    >
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 20 + "px",
                          borderColor: "#DDE9FF",
                          verticalAlign: "middle",
                        }}
                      >
                        Class Type
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Class ID
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Instructor
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Ins ID
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Date
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Status
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Cost
                      </th>
                      <th scope="col" style={{ borderColor: "#DDE9FF", verticalAlign: "middle" }}>
                        Payment
                      </th>
                      <th
                        scope="col"
                        style={{ borderColor: "#DDE9FF" }}
                        className="text-center"
                      >
                        Chat
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
                              to={`/classes/${item.id}`}
                            >
                              <span>{item.id}</span>
                            </Link>
                          </td>
                          <td>{item.state}</td>
                          <td>{item.email}</td>
                          <td>
                            <Link
                              className="nav-link"
                              to={`/classes/${item.id}`}
                            >
                              <span>{item.classes}</span>
                            </Link>
                          </td>
                          <td>{getBadge(item.status)}</td>
                          <td>{item.activated}</td>
                          <td>{item.last}</td>
                          {/* <td>
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                          </td> */}
                          <td
                            className="justify-content-center"
                            style={{ paddingLeft: "30px" }}
                          >
                            <Link
                              className="nav-link"
                              to={{
                                pathname: `/users/${item.id}}`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                            >
                              Chat
                            </Link>
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
