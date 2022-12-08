import React, { Fragment, Dispatch, useState, useEffect } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { FormControl, Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { AiOutlineCaretDown } from "react-icons/ai";
import Chat from "../Chat";

import { Tab, Tabs, Card, Table, NavItem, Nav } from "react-bootstrap";

const payment = ["Pending", "Processed", "Cancelled"];

const Issues: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [btnStatus1, setbtnStatus1] = useState(1);
  const [btnStatus2, setbtnStatus2] = useState(1);

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

  const handleBtnStatus1 = (status: number) => {
    setbtnStatus1(status);
  };
  const handleBtnStatus2 = (status: number) => {
    setbtnStatus2(status);
  };

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

  let btnClass2 = {
    borderRadius: "8px",
    marginLeft: "3px",
    background: "white",
    border: "none",
    color: "#6460F2",
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12" style={{ padding: "0px" }}>
          <div
            className="card mb-4"
            style={{
              border: "none",
              borderRadius: "0px",
              background: "#F3F7FF",
            }}
          >
            <div className="card-body" style={{ padding: "0px" }}>
              <div className="d-flex mb-2" style={{ marginTop: "30px" }}>
                <div style={{ marginLeft: "1%" }}>
                  <ToggleButtonGroup
                    type="radio"
                    name="options1"
                    defaultValue={1}
                    style={{
                      paddingTop: "10px",
                      paddingRight: "4px",
                      borderRadius: "10px",
                      boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                      background: "white",
                    }}
                  >
                    <ToggleButton
                      id="tbg-radio-1"
                      value={1}
                      // style={btnClass}
                      style={
                        btnStatus1 == 1 ? { ...btnClass } : { ...btnClass2 }
                      }
                      onClick={() => handleBtnStatus1(1)}
                    >
                      <i
                        className="fas fa-briefcase"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Instructors
                    </ToggleButton>
                    <ToggleButton
                      id="tbg-radio-2"
                      value={2}
                      style={
                        btnStatus1 == 2 ? { ...btnClass } : { ...btnClass2 }
                      }
                      onClick={() => handleBtnStatus1(2)}
                    >
                      <i
                        className="fas fa-users"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Users
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    // marginRight: "auto",
                  }}
                >
                  <InputGroup
                    className="searchbar" 
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
                      style={{ height: "100%", border: "none" }}
                    />
                    <InputGroup.Text
                      style={{
                        color: "#807CD6",
                        background: "#DDE9FF",
                        width: "56px",
                        border: "none",
                      }}
                    >
                      {/* <i
                          style={{ width: "24px", height: "18px" }}
                          className="fa fa-search"
                        ></i> */}
                      <img
                        src="/search.png"
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          marginLeft: "5px",
                        }}
                      />
                    </InputGroup.Text>
                    {searchText !== "" && (
                      <button
                        // style={{ marginRight: 5 }}
                        className="btn btn-secondary btn-sm "
                        onClick={handleClear}
                      >
                        Clear
                      </button>
                    )}
                  </InputGroup>
                </div>

                <div
                  className="ms-auto"
                  style={{ paddingBottom: "20px", paddingRight: "1.5%" }}
                >
                  <ToggleButtonGroup
                    type="radio"
                    name="options2"
                    defaultValue={1}
                    style={{
                      paddingTop: "10px",
                      paddingRight: "4px",
                      borderRadius: "10px",
                      boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                      background: "white",
                    }}
                  >
                    <ToggleButton
                      id="tbg-radio-3"
                      value={1}
                      style={
                        btnStatus2 == 1 ? { ...btnClass } : { ...btnClass2 }
                      }
                      onClick={() => handleBtnStatus2(1)}
                    >
                      Active
                    </ToggleButton>
                    <ToggleButton
                      id="tbg-radio-4"
                      value={2}
                      // style={{
                      //   ...btnClass,
                      //   background: "white",
                      //   color: "#6460F2",
                      // }}
                      style={
                        btnStatus2 == 2 ? { ...btnClass } : { ...btnClass2 }
                      }
                      onClick={() => handleBtnStatus2(2)}
                    >
                      Closed
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  width: "98%",
                }}
              >
                <table className="table">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#6460F2",
                        color: "white",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      {/* <th scope="col">#</th> */}
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 15 + "px",
                          verticalAlign: "middle",
                        }}
                      >
                        ClassID
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle"}}
                      >
                        User
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle" }}
                      >
                        Instructor
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Class Date
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Payment
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Cost
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Reported
                        <AiOutlineCaretDown
                          color="#BFBDFF"
                          style={{
                            paddingLeft: "2px",
                            width: "16x",
                            height: "width:16x",
                          }}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Chat
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle" }}
                        className="text-center"
                      >
                        Issue
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {userData &&
                      userData.length > 0 &&
                      userData.map((item: any, index) => (
                        <tr key={index}>
                          <td style={{ paddingLeft: 15 + "px" }}>
                            <Link
                              to={`/classes/${item.id}`}
                              style={{ color: "#817EB7" }}
                            >
                              {item.id}
                            </Link>
                          </td>
                          <td
                            style={{
                              paddingLeft: 15 + "px",
                              fontWeight: 600,
                              lineHeight: "160%",
                              color: "#5D59B4",
                            }}
                          >
                            {item.first_name} {item.last_name}
                          </td>

                          <td style={{ color: "#817EB7"}}>
                            Tony C
                          </td>
                          {/* <td>{item.city}</td> */}
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            12-05-2022
                          </td>
                          {/* <td>{item.state}</td> */}
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {/* {item.email} */}
                            {payment[index % 3]}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            $450.00
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            12-05-2022
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <Button
                              onClick={() =>
                                handleShowModal(item.id, item.status)
                              }
                              style={{
                                background: "none",
                                border: "none",
                                color: "#817EB7",
                              }}
                            >
                              Chat
                            </Button>
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <Link
                              // className="nav-link"
                              to={`/issues/${item.id}`}
                              style={{
                                color: "#817EB7",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              Issue
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {showModal && (
                <Chat
                  userId={userId}
                  userStatus={userStatus}
                  showModal={showModal}
                  handleCallback={handleParentCallback}
                />
              )}
              <div
                className="d-flex"
                style={{ color: "#6460F2", marginTop: "30px" }}
              >
                <div className="p-2 flex-grow-1">
                  <div style={{ paddingLeft: "1%" }}>
                    <label className="totaluser" style={{ marginRight: 10, color: "#817EB7" }}>
                      Item per page:
                    </label>
                    <select
                      value={selectedOption}
                      onChange={(e) => handleSelectedOption(e)}
                      className="classic"
                    >
                      {handleOption()}
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <div>
                    <label className="totaluser" style={{ marginRight: 10, color: "#817EB7" }}>
                      Move to:
                    </label>
                    <select
                      value={selectedOption}
                      onChange={(e) => handleSelectedOption(e)}
                      className="classic"
                    >
                      {handleOption()}
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    marginRight: "1.5%",
                    // marginLeft: "20px",
                    paddingTop: "8px",
                  }}
                >
                  <div>
                    <label className="totaluser" style={{ color: "#817EB7", marginRight: "20px" }}>
                      10 of 250
                    </label>
                    <button
                      style={{
                        marginRight: 10,
                        background: "#DDE9FF",
                        width: "42px",
                        height: "42px",
                      }}
                      type="button"
                      className="btn btn-default btn-sm"
                    >
                      <i
                        style={{ color: "#5D59B4" }}
                        className="fas fa-angle-left"
                      ></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      style={{
                        background: "#DDE9FF",
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <i
                        style={{ color: "#5D59B4" }}
                        className="fas fa-angle-right"
                      ></i>
                    </button>
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

export default Issues;
