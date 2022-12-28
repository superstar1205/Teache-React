import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import BaseUrl from "../../BaseUrl/BaseUrl";
import EditUserDetail from "../Users/EditUserDetail";
import { Col, Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { getBadge } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { getStatus, getAbbr } from "../../utils";
import Chat from "../Chat";
import ViewTeacherDetail from "./ViewTeacherDetail";
import BackdropLoader from "../../common/components/BackdropLoader";

var options: any = { year: "numeric", month: "numeric", day: "numeric" };

  const DateFunc = (val: any) => {
    const formatedDate = new Date(parseInt(val)).toLocaleString(
      "en-US",
      options
    );
    let dateType = formatedDate.replaceAll("/", "-")
    return dateType;
  };
  const DateFuncN = (val: any) => {
    const formatedDate = new Date(val).toLocaleString(
      "en-US",
      options
    );
    let dateType = formatedDate.replaceAll("/", "-")
    return dateType;
  }

const Users: React.FC = (props: object) => {
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [classesData, setClassesData] = useState([]);
  const [teacherData, setTeacherData] : any[] = useState([]);
  const [teacherClassType, setTeacherClassType] = useState("");
  const [techerUId, seteacherUId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [totalCount, setTotalCount] = useState(1);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [showModal_, setShowModal_] = useState(false);
  const [viewDetail_, setViewDetail_] = useState(false);
  const [showDelete, setDeleteModal] =useState(false);
  const [itemNumber, setItemNumber] = useState(10);
  const [showerCount, setShowerCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [selectedUserid, setSelectedUserid] = useState("");
  const [selectedClassid, setSelectedClassid] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [teacherName, setTacherName] = useState("");

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleViewParentCallback_ = (childData: any) => {
    setViewDetail_(childData);
  };

  const handleParentCallback_ = (childData: any) => {
    if(childData){
      setShowModal_(false);
    } else{
      setShowModal_(false);
    }
  };

  const handleShowModal = (classid: any, user_id: any, user_name: any) => {
    setShowModal(true);
    setSelectedClassid(classid);
    setSelectedUserid(user_id);
    setSelectedUserName(user_name);
  };

  const handleShowModal_ = (userId: any, userStatus: string) => {
    setShowModal_(true);
    setUserStatus(userStatus);
  };

  const handleViewShowModal_ = (id: any, user: any) => {
    console.log("ID:", id, "user", user);
    setViewDetail_(true);
  };

  const handleDeleteModal = (id: any) => {
    setDeleteModal(true);
  }

  const ConfirmDelete = (id: any) => {
    setDeleteModal(false);
    setLoader(true);
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };

    BaseUrl.delete(`/delete-user/${techerUId}`, axiosConfig)
      .then((res) => {
        toast.success(res.data.message);
        cancelDelete();
        setLoader(false);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
          cancelDelete();
          setLoader(false);
        }
      });
  };
  const cancelDelete = () => {
    setDeleteModal(false);
  };

  const imageBaseUrl = "https://d7eyk7icw439d.cloudfront.net/";

  useEffect(() => {
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };
    BaseUrl.get(`/teachers/${id}`, axiosConfig).then((res) => {
      if (res.status === 200){
        if (res.data) {
          if (res.data.data){
            console.log(res.data.data);
            if (res.data.data.user){
              setTeacherData(res.data.data.user);
              setTeacherClassType(res.data.data.class.title);
              setTeacherId(res.data.data.id);
              seteacherUId(res.data.data.user.id);
              setTacherName(res.data.data.user.first_name+" "+res.data.data.user.last_name);
            }
          }
        } else {
        setTotalCount(0);
        setTeacherData([]);
      }
    }
    }).catch((err) => {
      if (err.response) {
        setLoader(false);
        setTeacherData([]);
        setLoader(false);
      }
    });
  }, [showModal_, id]);

  useEffect(() => {
    setLoader(true);
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };
    BaseUrl.get(
      `/classes/${id}?limit=${itemNumber}&&page=${page}`,
      axiosConfig
    ).then((res) => {
      setLoader(false);
      if (res.status === 200) {
        if (res.data) {
          setTotalCount(res.data.count);
          setClassesData(res.data.data);
          setPageNumber(res.data.page);
          setPagesNumber(res.data.pages);
          if(res.data.data){
            setShowerCount(res.data.data.length);
          }
          console.log(res.data.data);
        } else {
          setClassesData([]);
          setTotalCount(0);
        }
      } else {
        setClassesData([]);
        setTotalCount(0);
      }
    });
  }, [id, itemNumber, page]);

  const handlePrevious = (page:any) => {
    if(page <= 1){
      page = 1;
      setPage(page)
    }
    else{
      let current_page = page;
      let previous_page = Number(current_page-1);
      setPage(previous_page);
    }
  }
  const handleNext = (page:any) => {
    if(page < pagesNumber){
      let current_page = page;
      let next_page = Number(current_page)+1;
      setPage(next_page);
    }
  }

  const handleOption = () => {
    let content = [];
    for (var index = 1; index <= pagesNumber; index++) {
      content.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }
    return content;
  };
  const handleSelectItem = (e: any) => {
    setItemNumber(e.target.value);
  }
  const handleSelectedOption = (e: any) => {
    setPage(e.target.value);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Modal
        centered
        show={showDelete}
        backdrop="static"
        onHide={() => setDeleteModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="p-3">
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you sure to delete this teacher ?
          </Modal.Title>

          <Modal.Body>
            <div className=" d-flex flex-row w-100  mt-2">
              <button
                onClick={cancelDelete}
                className="btn btn-danger  mr-3 btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={ConfirmDelete}
                className="btn btn-primary btn-sm"
              >
                Confirm
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <div className="row" style={{ background: "#F3F7FF" }}>
        <div className="col-xl-12 col-lg-12" style={{ padding: "0px" }}>
          <div
            className="card mb-4"
            style={{
              border: "none",
              borderRadius: "0px",
              background: "#F9FBFF",
            }}
          >
            <div
              className="card-header"
              style={{ border: "none", background: "#F3F7FF", padding: "25px" }}
            >
              <div>
                <Col md={{ span: 2, offset: 5 }} style={{textAlign: 'center'}}>
                  <Image
                    className="customAvatar"
                    fluid
                    src={teacherData && teacherData.profile_pic ? imageBaseUrl + teacherData.profile_pic : "/profile.png" }
                    style={{
                      borderRadius: "20px",
                      width: "110px",
                      height: "110px",
                    }}
                  />
                </Col>
              </div>
            </div>
            <div
              className="card-body"
              style={{ padding: "0px", background: "#F3F7FF" }}
            >
              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  width: "98%",
                }}
              >
                <table className="table teacher">
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
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Ins ID
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        City
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        State
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Class Type
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Email
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Classes
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Status
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Activated
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Last
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2", background: "white" }}>
                    {teacherData && 
                      <tr>
                        <td
                          style={{
                            paddingLeft: 15 + "px",
                            color: "#817EB7",
                          }}
                        >
                          {teacherData.first_name} {teacherData.last_name}
                        </td>
                        <td style={{ color: "#817EB7" }}>{id}</td>
                        <td style={{ color: "#817EB7" }}>{ teacherData && teacherData.userlocation &&
                        teacherData.userlocation.map((value_user:any, index_user:any) => (
                          value_user.type === "home" ? value_user.city : ""
                        ) )}</td>
                        <td style={{ color: "#817EB7", textAlign: "center" }}>
                        { teacherData && teacherData.userlocation &&
                        teacherData.userlocation.map((value_user:any, index_user:any) => (
                          value_user.type === "home" ? getAbbr(value_user.state) : ""
                        ) )}
                        </td>
                        <td style={{ color: "#817EB7" }}>{teacherClassType}</td>
                        <td style={{ color: "#817EB7" }}>
                          {teacherData.email}
                        </td>
                        <td style={{ color: "#817EB7", textAlign: "center" }}>
                          <Link
                            style={{ color: "#817EB7" }}
                            to={`/users/${teacherData.id}`}
                          >
                            {teacherData.classes_count}
                          </Link>
                        </td>
                        <td style={{ color: "#817EB7", textAlign: "center" }}>
                          {teacherData.status === "active" ? getBadge("active") : getBadge("block")}
                        </td>
                        <td style={{ color: "#817EB7" }}>
                          {DateFunc(teacherData.created_at)}
                        </td>
                        <td style={{ color: "#817EB7" }}>
                          {DateFunc(teacherData.updated_at)}
                        </td>
                        <td
                          className="justify-content-center t1"
                          style={{
                            color: "#817EB7",
                            textAlign: "center",
                          }}
                        >
                          <div id="btn_container">
                            <i
                              className="fas fa-ellipsis-h"
                              style={{ color: "#817EB7" }}
                            ></i>
                            <div id="btn_group">
                              <button
                                className="btn btn-primary btn-sm actionBtn"
                                onClick={() =>
                                  handleViewShowModal_(
                                    id,
                                    teacherData
                                  )
                                }
                              >
                                <img
                                  src="/eye.png"
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  handleShowModal_(
                                    teacherData.id,
                                    teacherData.status
                                  )
                                }
                                className="btn btn-secondary btn-sm actionBtn2"
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
                              onClick={()=> handleDeleteModal(
                                teacherData.id
                              )} 
                              className="btn btn-danger btn-sm actionBtn2">
                                {/* <i className="fas fa-trash"></i> */}
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
                            </div>
                          </div>
                          {/* <Button
                            // variant="light"
                            style={{
                              color: "#817EB7",
                              background: "#F3F7FF",
                              border: "none",
                            }}
                            onClick={() => handleViewShowModal("item")}
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Button> */}
                        </td>
                        <td
                          className="justify-content-center t2"
                          style={{
                            color: "#817EB7",
                            textAlign: "center",
                          }}
                        >
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
                            onClick={() =>
                              handleViewShowModal_(id, teacherData)
                            }
                          >
                            <img src="/eye.png" alt="" width={16} height={16} />
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
                              handleShowModal_(
                                teacherData.id,
                                teacherData.status
                              )
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
                          onClick={()=> handleDeleteModal(
                            teacherData.id
                          )} 
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
                            {/* <i className="fas fa-trash"></i> */}
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
                    }
                  </tbody>
                </table>
              </div>

              <div className="d-flex mb-2" style={{ marginTop: "30px" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "32px",
                    lineHeight: "160%",
                    color: "#6460F2",
                    paddingLeft: "1%",
                  }}
                >
                  <b>Classes</b>
                </div>
                <div
                  className="ms-auto"
                  style={{ paddingTop: "30px", paddingRight: "1.5%" }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#817EB7",
                    }}
                  >
                    Total Classes
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#5D59B4",
                      paddingLeft: "20px",
                      textAlign: "center",
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
                  width: "98%",
                }}
              >
                <table className="table">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#DDE9FF",
                        color: "#6460F2",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 15 + "px",
                          verticalAlign: "middle",
                          border: "none",
                        }}
                      >
                        Class ID
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        User ID
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", border: "none" }}
                      >
                        Class Date
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Cost
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="text-center"
                        style={{ verticalAlign: "middle", border: "none" }}
                      >
                        Chat
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                  {loader && 
                    <tr>
                      <td colSpan={8}>
                      <BackdropLoader />
                      </td>
                    </tr>}
                    {classesData &&
                      classesData.length > 0 &&
                      classesData.map((item: any, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              paddingLeft: 15 + "px",
                              color: "#817EB7",
                            }}
                          >
                            <span>{item.id}</span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Link
                              to={{
                                pathname: `/cancelledclasses/${item.id}`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                              style={{ color: "#817EB7" }}
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <span>{item.user_id}</span>
                          </td>
                          <td style={{ color: "#817EB7" }}>{DateFuncN(item.class_date)}</td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {getStatus(item.status)}
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            $ {item.cost}
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {item.payment}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Button
                              onClick={() =>
                                handleShowModal(item.id, item.user_id, item.name)
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
                    <label
                      className="totaluser"
                      style={{ marginRight: 10, color: "#817EB7" }}
                    >
                      Item per page:
                    </label>
                    <select
                      value={itemNumber}
                      onChange={(e) => handleSelectItem(e)}
                      className="classic"
                      style={{
                        paddingLeft: "16px",
                        paddingRight: "16px"
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <div>
                    <label
                      className="totaluser"
                      style={{ marginRight: 10, color: "#817EB7" }}
                    >
                      Move to:
                    </label>
                    <select
                      value={page}
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
                    <label
                      className="totaluser"
                      style={{ color: "#817EB7", marginRight: "20px" }}
                    >
                      {showerCount + (pageNumber-1)*itemNumber} of {totalCount}
                    </label>
                    <button
                      style={{
                        marginRight: 10,
                        background: "#DDE9FF",
                        width: "42px",
                        height: "42px",
                      }}
                      type="button"
                      onClick={()=>handlePrevious(pageNumber)}
                      className="btn btn-default btn-sm"
                    >
                      <i
                        style={{ color: "#5D59B4" }}
                        className="fas fa-angle-left"
                      ></i>
                    </button>

                    <button
                      type="button"
                      onClick={()=>handleNext(pageNumber)}
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
                    {showModal_ && (
                      <EditUserDetail
                        userId={teacherId}
                        userStatus={userStatus}
                        showModal={showModal_}
                        handleCallback={handleParentCallback_}
                      />
                    )}
                    {viewDetail_ && (
                      <ViewTeacherDetail
                        // detail={detail}
                        userId = {teacherId}
                        viewDetail={viewDetail_}
                        handleViewParentCallback={handleViewParentCallback_}
                      />
                    )}
                    {showModal && (
                      <Chat
                        classId={selectedClassid}
                        userId={selectedUserid}
                        teacherId={techerUId}
                        userName = {selectedUserName}
                        teacherName = {teacherName}
                        showModal={showModal}
                        handleCallback={handleParentCallback}
                      />
                    )}
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
