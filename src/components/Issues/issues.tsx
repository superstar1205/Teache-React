import React, { Fragment, Dispatch, useState, useMemo, useEffect } from "react";
import BaseUrl from "../../BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { FormControl, Col, Row } from "react-bootstrap";
import BackdropLoader from "../../common/components/BackdropLoader";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { AiOutlineCaretDown } from "react-icons/ai";
import Chat from "../Chat";

const Issues: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [btnStatus1, setbtnStatus1] = useState(1);
  const [btnStatus2, setbtnStatus2] = useState(1);

  const [issueData, setIssueData] = useState([]);
  const [userId, setUserId] = useState("");
  const [teacherId, setTeacherId] =useState("");
  const [classId, setClassId] =useState("");
  const [userName, setUserName] =useState("");
  const [teacherName, setTeacherName] =useState("");
  const [issueStatus, setIssueStatus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);
  const [loader, setLoader] = useState(true);
  const [showerCount, setShowerCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [itemNumber, setItemNumber] = useState(10);

  var options: any = { year: "numeric", month: "numeric", day: "numeric" };

  const DateFunc = (val: any) => {
    const formatedDate = new Date(parseInt(val)).toLocaleString(
      "en-US",
      options
    );
    let dateType = formatedDate.replaceAll("/", "-")
    return dateType;
  };

  const handleBtnStatus1 = (status: number) => {
    setbtnStatus1(status);
  };
  const handleBtnStatus2 = (status: number) => {
    setbtnStatus2(status);
    if (status === 2){
      setIssueStatus(true);
    } else{
      setIssueStatus(false);
    }
  };

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };


  const handleShowModal = (id: any, user_id: string, teacher_id: string, user_name: string, teacher_name: string) => {
    setShowModal(true);
    setUserId(user_id);
    setTeacherId(teacher_id);
    setClassId(id);
    setUserName(user_name);
    setTeacherName(teacher_name);
  };

  const handleClear = () => {
    setSearchText("");
    setSelectedOption(0);
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
  }

  useEffect(() => {
    setLoader(true);
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };
    BaseUrl.get(
      `/issues?limit=${itemNumber}&page=${selectedOption}&search=${searchText}&solved=${issueStatus}`,
      axiosConfig
    ).then((res) => {
      if (res.status === 200) {
        if (res.data) {
          setLoader(false);
          setTotalCount(res.data.count);
          setIssueData(res.data.data);
          setPageNumber(res.data.page)
          setPagesNumber(res.data.pages);
          if(res.data.data){
            setShowerCount(res.data.data.length);
          }
        } else {
          setIssueData([]);
          setTotalCount(0);
        }
      } else {
        setIssueData([]);
        setTotalCount(0);
      }
    });
  }, [itemNumber, searchText, selectedOption, issueStatus]);

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
  
    const sortedItems = useMemo(() => {
      if(items){
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
      }
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

  const { items, requestSort, sortConfig } = useSortableData(issueData);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
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
      {loader && <BackdropLoader />}
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
                        btnStatus1 === 1 ? { ...btnClass } : { ...btnClass2 }
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
                        btnStatus1 === 2 ? { ...btnClass } : { ...btnClass2 }
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
                        btnStatus2 === 1 ? { ...btnClass } : { ...btnClass2 }
                      }
                      onClick={() => handleBtnStatus2(1)}
                    >
                      Active
                    </ToggleButton>
                    <ToggleButton
                      id="tbg-radio-4"
                      value={2}
                      style={
                        btnStatus2 === 2 ? { ...btnClass } : { ...btnClass2 }
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
                          onClick={() => requestSort('class_id')}
                          className={getClassNamesFor('class_id')}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle"}}
                      >
                        User
                        <AiOutlineCaretDown
                          onClick={() => requestSort('user_name')}
                          className={getClassNamesFor('user_name')}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle" }}
                      >
                        Instructor
                        <AiOutlineCaretDown
                          onClick={() => requestSort('teacher_name')}
                          className={getClassNamesFor('teacher_name')}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Class Date
                        <AiOutlineCaretDown
                          onClick={() => requestSort('created')}
                          className={getClassNamesFor('created')}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Payment
                        <AiOutlineCaretDown
                          onClick={() => requestSort('payment')}
                          className={getClassNamesFor('payment')}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Cost
                        <AiOutlineCaretDown
                          onClick={() => requestSort('cost')}
                          className={getClassNamesFor('cost')}
                        />
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Reported
                        <AiOutlineCaretDown
                          onClick={() => requestSort('updated')}
                          className={getClassNamesFor('updated')}
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
                    {items ?
                      items.length > 0 &&
                      items.map((item: any, index) => (
                        <tr key={index}>
                          <td style={{ paddingLeft: 15 + "px" }}>
                            <Link
                              to={`/classes/${item.class_id}`}
                              style={{ color: "#817EB7" }}
                            >
                              {item.class_id}
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
                            {item.user_name}
                          </td>

                          <td style={{ color: "#817EB7"}}>
                            {item.teacher_name}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                          {item.class_date}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {item.payment}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {item.cost}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center", verticalAlign: "middle", }} >
                            {DateFunc(item.created)}
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center", verticalAlign: "middle", }} >
                            <Button
                              onClick={() =>
                                handleShowModal(item.class_id, item.user_id, item.teacher_id, item.user_name, item.teacher_name )
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
                              to={{
                                pathname: `/issues/${item.id}`,
                                state: {
                                  issueInfo: item,
                                  issuesStatus: issueStatus,
                                },
                              }}

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
                      )) : <tr><td colSpan={9} className="text-center">No Data</td></tr> }
                  </tbody>
                </table>
              </div>
              {showModal && (
                <Chat
                  classId = {classId}
                  userId = {userId}
                  teacherId = {teacherId}
                  userName = {userName}
                  teacherName = {teacherName}
                  showModal = {showModal}
                  handleCallback = {handleParentCallback}
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
                      <option value="50">50</option>
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
                    // marginLeft: "20px",
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
                      onClick={()=>handlePrevious(pageNumber)}
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
