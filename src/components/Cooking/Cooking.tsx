import React, { Fragment, Dispatch, useState, useEffect } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { FormControl, Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineCaretDown } from "react-icons/ai";
import { getBadge } from "../../utils";
import EditUserDetail from "../Users/EditUserDetail";
import ViewUserDetail from "../Users/ViewUserDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cities = [
  "Abilene",
  "Phoenix",
  "Seattle",
  "Las Vegas",
  "Abilene",
  "Seattle",
];

const states = ["AL", "FL", "MR", "NB", "AL", "MR"];

const classes = [10, 24, 6, 4, 10, 2];

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

  // const handleParentCallback = (childData: any) => {
  //   setShowModal(childData);
  // };

  const handleParentCallback = (childData: any) => {
    if (childData) {
      setShowModal(false);
      toast.success("Status Changed");
    } else {
      setShowModal(false);
    }
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
      `/users?page=${selectedOption}&search=${searchText}&filter=${selectedStaus}`,
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
      <ToastContainer />
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
                <div
                  style={{
                    paddingTop: "30px",
                    paddingRight: "1.5%",
                    marginLeft: "2%",
                  }}
                >
                  <span className="totaluser"
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#817EB7",
                    }}
                  >
                    ID:
                  </span>
                  <span className="totaluser"
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#5D59B4",
                      paddingLeft: "10px",
                    }}
                  >
                    222
                  </span>
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
                        style={{ marginRight: 5 }}
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
                  style={{ paddingTop: "30px", paddingRight: "1.5%" }}
                >
                  <span className="totaluser"
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
                    5
                  </span>
                </div>
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
                        Ins ID
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
                        City
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
                        State
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
                        Email
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
                        Classes
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
                        Rvenue
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
                        Status
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
                        className="text-center"
                      >
                        Action
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
                              fontWeight: 600,
                              lineHeight: "160%",
                              color: "#5D59B4",
                            }}
                          >
                            {item.first_name} {item.last_name}
                          </td>
                          <td
                            style={{
                              paddingLeft: 15 + "px",
                              textAlign: "center",
                              color: "#5D59B4",
                            }}
                          >
                            {item.id}
                          </td>

                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {cities[index]}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {states[index]}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {item.email}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Link
                              to={`/users/${item.id}`}
                              style={{ color: "#817EB7" }}
                            >
                              {classes[index]}
                            </Link>
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            $450
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {getBadge(item.status)}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              style={{
                                marginRight: 3,
                                background: "#6460F2",
                                color: "#FFFFFF",
                                border: "1px solid #DDE9FF",
                                borderRadius: "5px",
                                width: "36px",
                                height: "36px",
                              }}
                              className="btn btn-primary btn-sm"
                              onClick={() => handleViewShowModal(item)}
                            >
                              <img
                                src="/eye.png"
                                alt=""
                                width={16}
                                height={16}
                              />
                            </button>
                            <button
                              style={{
                                marginRight: 3,
                                background: "#DDE9FF",
                                color: "#807CD6",
                                border: "1px solid #DDE9FF",
                                borderRadius: "5px",
                                width: "36px",
                                height: "36px",
                              }}
                              onClick={() =>
                                handleShowModal(item.id, item.status)
                              }
                              className="btn btn-secondary btn-sm"
                            >
                              <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.571 2.82325L14.0292 6.28141L5.27558 15.035L1.81936 11.5769L10.571 2.82325ZM16.6533 1.98923L15.1111 0.44701C14.5151 -0.149003 13.5473 -0.149003 12.9492 0.44701L11.4719 1.9243L14.9301 5.38248L16.6533 3.65931C17.1156 3.19701 17.1156 2.4515 16.6533 1.98923ZM0.00962331 16.4376C-0.0533112 16.7208 0.202413 16.9746 0.485682 16.9057L4.33925 15.9714L0.883025 12.5132L0.00962331 16.4376Z"
                                  fill="#807CD6"
                                />
                              </svg>
                            </button>
                            <button
                              style={{
                                marginRight: 3,
                                background: "#DDE9FF",
                                color: "#807CD6",
                                border: "1px solid #DDE9FF",
                                borderRadius: "5px",
                                width: "36px",
                                height: "36px",
                              }}
                              className="btn btn-danger btn-sm"
                            >
                              <svg
                                width="17"
                                height="19"
                                viewBox="0 0 17 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.375 3.25H11.625V2.625C11.625 1.59125 10.7837 0.75 9.75 0.75H7.25C6.21625 0.75 5.375 1.59125 5.375 2.625V3.25H1.625C0.935625 3.25 0.375 3.81063 0.375 4.5V5.125C0.375 5.47 0.655 5.75 1 5.75H16C16.345 5.75 16.625 5.47 16.625 5.125V4.5C16.625 3.81063 16.0644 3.25 15.375 3.25ZM6.625 2.625C6.625 2.28062 6.90562 2 7.25 2H9.75C10.0944 2 10.375 2.28062 10.375 2.625V3.25H6.625V2.625Z"
                                  fill="#807CD6"
                                />
                                <path
                                  d="M2.25 7V16.375C2.25 17.4087 3.09125 18.25 4.125 18.25H12.875C13.9087 18.25 14.75 17.4087 14.75 16.375V7H2.25ZM10.8169 13.4331C11.0613 13.6775 11.0613 14.0725 10.8169 14.3169C10.5725 14.5613 10.1775 14.5613 9.93312 14.3169L8.5 12.8837L7.06687 14.3169C6.8225 14.5613 6.4275 14.5613 6.18313 14.3169C5.93875 14.0725 5.93875 13.6775 6.18313 13.4331L7.61625 12L6.18313 10.5669C5.93875 10.3225 5.93875 9.9275 6.18313 9.68312C6.4275 9.43875 6.8225 9.43875 7.06687 9.68312L8.5 11.1163L9.93312 9.68312C10.1775 9.43875 10.5725 9.43875 10.8169 9.68312C11.0613 9.9275 11.0613 10.3225 10.8169 10.5669L9.38375 12L10.8169 13.4331Z"
                                  fill="#807CD6"
                                />
                              </svg>
                            </button>
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

export default Issues;
