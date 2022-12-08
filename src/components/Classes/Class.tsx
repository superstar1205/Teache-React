import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { FormControl, Col, Row, Button, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import { AiOutlineCaretDown } from "react-icons/ai";

const classes = [
  "Aerobics",
  "Computer Programming",
  "Rock Climbing",
  "Cooking",
];

const classesNum = [10, 24, 6, 4, 10, 2];

const Class: React.FC = () => {
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
          console.log(res.data, "------------count");
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
        {/* <AddClass
          userId={userId}
          userStatus={userStatus}
          showModal={showModal}
          handleCallback={handleParentCallback}
        /> */}
        {showModal && (
          <AddClass
            showModal={showModal}
            userId={userId}
            userStatus={userStatus}
            handleCallback={handleParentCallback}
          />
        )}
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
                <div
                  style={{
                    //  marginLeft: "20px",
                    marginLeft: "1%",
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
                <div style={{ display: "flex" }}>
                  <Button
                    style={{
                      background: "#6460F2",
                      borderRadius: "8px",
                      border: "none",
                      height: "50px",
                      width: "145px",
                      marginLeft: "40px",
                    }}
                    className='addClass'
                    onClick={() => handleShowModal("userId", "userStatus")}
                  >
                    Add a Class
                  </Button>
                </div>
                <div
                  className="ms-auto"
                  style={{ paddingTop: "30px", paddingRight: "1.5%" }}
                >
                  <span
                  className="totaluser"
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#817EB7",
                    }}
                  >
                    Total users
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#5D59B4",
                      paddingLeft: "20px",
                    }}
                  >
                    {totalCount}
                  </span>
                </div>
              </div>
              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  // marginLeft: "20px",
                  // borderRadius: "10px",
                  // boxShadow: "rgb(27 30 123 / 10%) -10px 1px 53px 7px",
                  width: "98%",
                  // width: "auto",
                  // border: '10px solid black'
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
                        Class
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
                        Class ID
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
                        Instuctors
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
                        Added
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
                        Icon
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Picture
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {userData &&
                      userData.length > 0 &&
                      userData.map((item: any, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              paddingLeft: 15 + "px",
                              lineHeight: "160%",
                            }}
                          >
                            <Link
                              to={{
                                pathname: `/cooking`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                              style={{ color: "#5D59B4" }}
                            >
                              {classes[index % 4]}
                              {/* {item.first_name} {item.last_name} */}
                            </Link>
                          </td>

                          <td style={{ textAlign: "center" }}>
                            <Link
                              to={{
                                pathname: `/cooking`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                              style={{ color: "#817EB7" }}
                            >
                              <span>{item.id}</span>
                            </Link>
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {classesNum[index]}
                          </td>
                          {/* <td>{item.city}</td> */}
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            01-08-2022
                          </td>
                          {/* <td>{item.state}</td> */}
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Link
                              // className="nav-link"
                              to="#"
                              style={{
                                color: "#817EB7",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              Icon
                              {/* <span>{item.classes}</span> */}
                            </Link>
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Link
                              // className="nav-link"
                              to="#"
                              style={{
                                color: "#817EB7",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              Picture
                              {/* <span>{item.classes}</span> */}
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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

export default Class;
