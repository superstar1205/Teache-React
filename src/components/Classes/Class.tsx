import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { FormControl, Modal, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import EditClass from "./EditClass";
import { AiOutlineCaretDown } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const Class: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [classTypeId, setClassTypeId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editIcon, setEditicon] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPic, setEditPic] = useState("");
  const [classData, setClassData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(1);
  const [showerCount, setShowerCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [itemNumber, setItemNumber] = useState(10);
  const [loader, setLoader] = useState(false);
  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };
  const handleParentEditCallback = (childData: any) => {
    setShowEditModal(childData);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleEdit = (id: any, icon:string, title:string, picture: string) => {
    setShowEditModal(true);
    setEditId(id);
    setEditicon(icon);
    setEditTitle(title);
    setEditPic(picture);
  }

  const handledelete = (id:any) => {
    setDeleteModal(true);
    setClassTypeId(id);
  }

  const cancelDelete = () => {
    setClassTypeId(null);
    setDeleteModal(false);
  };

  const ConfirmDelete = async () => {
    setLoader(true);
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };

    BaseUrl.delete(`/delete-class-type/${classTypeId}`, axiosConfig)
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

  useEffect(() => {
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };
    BaseUrl.get(
      `/class-types?limit=${itemNumber}&&page=${selectedOption}&&search=${searchText}`,
      axiosConfig
    ).then((res) => {
      if (res.status === 200) {
        if (res.data) {
          console.log(res.data);
          setTotalCount(res.data.count);
          setClassData(res.data.data);
          setPageNumber(res.data.page);
          setPagesNumber(res.data.pages);
          setShowerCount(res.data.data.length);
        } else {
          setTotalCount(0);
        }
      } else {
        setTotalCount(0);
      }
    });
  }, [showModal, showEditModal, deleteModal, itemNumber, searchText, selectedOption]);

  const handleClear = () => {
    setSearchText("");
    setSelectedOption(1);
  };

  const handlePrevious = (page:any) => {
    if(page <= 1){
       page=1;
       setSelectedOption(page)
    }
    else{
      let current_page = page;
      let previous_page = Number(current_page-1);
      setSelectedOption(previous_page);
     }
  }
  const handleNext = (page:any) => {
    if(page < pagesNumber){
      let current_page = page;
      let next_page = Number(current_page)+1;
      setSelectedOption(next_page);
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
  const handleSelectedOption = (e: any) => {
    setSelectedOption(e.target.value);
  };
  const handleSelectItem = (e: any) => {
    setItemNumber(e.target.value);
    setSelectedOption(1);
  }

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(classData);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loader && <BackdropLoader />}
      <div className="row">
        {showModal && (
          <AddClass
            showModal={showModal}
            handleCallback={handleParentCallback}
          />
        )}
        {showEditModal && (
          <EditClass
          showModal={showEditModal}
          editId={editId}
          editIcon = {editIcon}
          editTitle = {editTitle}
          editPic = {editPic}
          handleCallback={handleParentEditCallback}
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
            <Modal
              centered
              show={deleteModal}
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
            <div className="card-body" style={{ padding: "0px" }}>
              <div className="d-flex mb-2" style={{ marginTop: "30px" }}>
                <div
                  style={{
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
                    onClick={() => handleShowModal()}
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
                    Total Classes
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
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 15 + "px",
                          verticalAlign: "middle",
                        }}
                      >
                        Class
                        <AiOutlineCaretDown
                         onClick={() => requestSort('title')}
                         className={getClassNamesFor('title')}/>
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Class ID
                        <AiOutlineCaretDown
                         onClick={() => requestSort('id')}
                         className={getClassNamesFor('id')}/>
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Instuctors
                        <AiOutlineCaretDown
                         onClick={() => requestSort('teachers')}
                         className={getClassNamesFor('teachers')}/>
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Added
                        <AiOutlineCaretDown
                        onClick={() => requestSort('created_at')}
                        className={getClassNamesFor('created_at')}/>
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Icon
                        <AiOutlineCaretDown
                        onClick={() => requestSort('icon_type')}
                        className={getClassNamesFor('icon_type')}/>
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Picture
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                        className="text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {items ?
                      items.length > 0 &&
                      items.map((item: any, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              paddingLeft: 15 + "px",
                              lineHeight: "160%",
                            }}
                          >
                            <Link
                              to={{
                                pathname: `/class/${item.id}/${item.title}`
                              }}
                              style={{ color: "#817EB7" }}
                            >
                              {item.title}
                            </Link>
                          </td>

                          <td style={{ textAlign: "center" }}>
                            <Link
                              to={{
                                pathname: `/class/${item.id}/${item.title}`
                              }}
                              style={{ color: "#817EB7" }}
                            >
                              <span>{item.id}</span>
                            </Link>
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {item.teachers}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {item.created_at && DateFunc(item.created_at)}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Link
                              to="#"
                              style={{
                                color: "#817EB7",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              {
                                <img
                                src={item.icon_type ? item.icon_type === "male/female" ? "/icons/sex.svg" : "/icons/"+item.icon_type+".svg" :"/upload_img.png"}
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "16px",
                                  border: "1px solid #edf"
                                }}
                                alt={item.icon_type}
                              />
                              }
                              {<label style={{ paddingLeft: "8px", margin: "0px"}}>{item.icon_type}</label>}
                            </Link>
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Link
                              to="#"
                              style={{
                                color: "#817EB7",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              {
                                <img
                                src={item.picture ? item.picture :"/upload_img.png"}
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "8px",
                                  border: "1px solid #edf"
                                }}
                                alt=""
                              />
                              }
                            </Link>
                          </td>
                          <td style={{ textAlign: "center" }} className="t1">
                            <button
                              className="btn btn-secondary btn-sm actionBtn2"
                              onClick={()=>handleEdit(item.id, item.icon_type, item.title, item.picture)}
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
                              className="btn btn-danger btn-sm actionBtn2"
                              onClick={()=>handledelete(item.id)}
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
                          <td style={{ textAlign: "center" }} className="t2">
                            <div id="btn_container">
                              <i
                                className="fas fa-ellipsis-h"
                                style={{ color: "#817EB7" }}
                              ></i>
                              <div id="btn_group">
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
                                  className="btn btn-secondary btn-sm"
                                  onClick={()=>handleEdit(item.id, item.icon_type, item.title, item.picture)}
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
                                  onClick={()=>handledelete(item.id)}
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
                              </div>
                            </div>
                          </td>
                        </tr>
                      )): <tr><td colSpan={7} className="text-center">No Class</td></tr>}
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
                      value={itemNumber}
                      onChange={(e) => handleSelectItem(e)}
                      className="classic"
                      style={{
                        paddingLeft: "16px",
                        paddingRight: "16px"
                      }}
                    >
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="300">300</option>
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
                      style={{
                        paddingLeft: "16px",
                        paddingRight: "16px"
                      }}
                    >
                      {handleOption()}
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    marginRight: "1.5%",
                    paddingTop: "8px",
                  }}
                >
                  <div>
                    <label className="totaluser" style={{ color: "#817EB7", marginRight: "20px" }}>
                    {(pageNumber-1)*itemNumber + showerCount} of {totalCount}
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
                      onClick={()=>handlePrevious(pageNumber)}
                    >
                      <i
                        style={{ color: "#5D59B4" }}
                        className="fas fa-angle-left"
                      ></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      onClick={()=>handleNext(pageNumber)}
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
