import React, { Fragment, Dispatch , useState} from "react";
import { useDispatch} from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
// import ViewUserDetail from "./ViewUserDetail";
// import BaseUrl from "../../BaseUrl/BaseUrl";
// import EditUserDetail from "./EditUserDetail";
import { FormControl, Col, Row } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from "react-bootstrap/Form";
import ViewTransactionDetail from "./ViewTransactionDetail";

const TransactionHistory: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
//   const [showModal, setShowModal] = useState(false);
//   const [viewDetail, setViewDetail] = useState(false);
//   const [userData, setUserData] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [userStatus, setUserStatus]= useState('');
//   const [detail, setDetail] = useState();
  const [searchText, setSearchText] = useState('');
//   const [totalCount , setTotalCount] = useState(1);
//   const [selectedOption, setSelectedOption]= useState(0);
  const [selectedStaus , setSelectedStatus] = useState('');
  const [viewDetail, setViewDetail] = useState(false);

//   const handleParentCallback = (childData: any) => {
//     setShowModal(childData);
//   };

  const handleViewParentCallback = (childData: any) => {
    setViewDetail(childData);
  };
  
//   const handleShowModal = (id:any, status:string) => {
//     setShowModal(true);
//     setUserId(id)
//     setUserStatus(status)
//   };

  const handleViewShowModal = () => {
    setViewDetail(true);
  };

//   useEffect(()=>{
//     const axiosConfig:any = {
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('teache_token')}`
//       }
//     }
//     BaseUrl.get(`/user?page=${selectedOption}&search=${searchText}&filter=${selectedStaus}`, axiosConfig).then(res=>{
//       console.log(res)
//       setUserData(res.data.data);
//       setTotalCount(res.data.count);
  
//     })

//   },[showModal, searchText, selectedOption, selectedStaus])

  const handleClear =()=>{
    setSearchText('');
  }

//   const handleOption =()=>{
//     let content = [];
//     for (var index = 1; index < Math.ceil(totalCount/10); index++) {
//       content.push(<option key={index} value={index}>{index}</option>);
//     }
//     return content;
    
//   }
//   const handleSelectedOption =(e:any)=>{
//     setSelectedOption(e.target.value)
//   }
  const handleStatusSelection = (e:any) =>{
    setSelectedStatus(e.target.value)
  }



  return (
    <Fragment>
                      {viewDetail && (
                <ViewTransactionDetail
                viewDetail={viewDetail}
                handleViewParentCallback={handleViewParentCallback}
                />
              )}
      <div className="row">
        <div className="col-xl-12 col-lg-12">
        <div className="card mb-4" style={{border: 'none'}}>
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold" style={{fontSize:'20px', color:'#5a67de' }}>
                Transactions List
              </h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div style={{marginBottom:20}}>

                <Row>
              
            <Col lg="4" xs="auto" > 
      <InputGroup className="mb-2">
        <InputGroup.Text><i className="fa fa-search"></i></InputGroup.Text>
        <FormControl value={searchText} onChange={(e)=>setSearchText(e.target.value)} id="inlineFormInputGroup" placeholder="Search User" />
        {searchText!=='' && <button style={{ marginRight: 5 }} className="btn btn-secondary btn-sm" onClick={handleClear}>
       Clear
        </button>}
      </InputGroup>
     
    </Col>
    <Col lg="3" >

    <Form.Select value={selectedStaus} onChange={handleStatusSelection}
            
            aria-label="Default select example"
          >
            <option value="" disabled selected>Filter By Status</option>
            <option value="in-active">Fixed</option>
            <option value="active">Un Resolved</option>
          </Form.Select>
    </Col>
    </Row>
    </div>
              <div className="table-responsive portlet">
                <table style={{textAlign:'center', fontSize:14}} className="table">
                  
                  <thead className="thead-light">
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col">User</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Class</th>
                      <th scope="col">Instructor</th>
                      
                      <th scope="col">Class Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">View Detail</th>
        
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <td><a href="/issues">Tom Day</a></td>
                      <td >New York</td>
                      <td >Brooklyn</td>
                      <td >Boxing</td>
                      <td >lennie Cassidy</td>
                      <td >09/09/2021</td>
                      <td >3:00 PM</td>
                      <td >$250.00</td>
                      <td >Processed</td>
                      <td><button
                          style={{ marginRight: 10 }}
                          onClick={handleViewShowModal}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fas fa-eye"></i>
                        </button></td>
        
                      
     
                    </tr>
                    <tr>
                      <td><a href="/issues">Tom Day</a></td>
                      <td >New York</td>
                      <td >Brooklyn</td>
                      <td >Boxing</td>
                      <td >lennie Cassidy</td>
                      <td >09/09/2021</td>
                      <td >3:00 PM</td>
                      <td >$250.00</td>
                      <td >Processed</td>
                      <td><button
                          style={{ marginRight: 10 }}
                          className="btn btn-primary btn-sm"
                          onClick={handleViewShowModal}
                        >
                          <i className="fas fa-eye"></i>
                        </button></td>
 
                      
     
                    </tr>
                    <tr>
                      <td><a href="/issues">Tom Day</a></td>
                      <td >New York</td>
                      <td >Brooklyn</td>
                      <td >Boxing</td>
                      <td >lennie Cassidy</td>
                      <td >09/09/2021</td>
                      <td >3:00 PM</td>
                      <td >$250.00</td>
                      <td >Processed</td>
                      <td><button
                          style={{ marginRight: 10 }}
                          className="btn btn-primary btn-sm"
                          onClick={handleViewShowModal}
                        >
                          <i className="fas fa-eye"></i>
                        </button></td>
             
                      
     
                    </tr>
                    <tr>
                      <td><a href="/issues">Tom Day</a></td>
                      <td >New York</td>
                      <td >Brooklyn</td>
                      <td >Boxing</td>
                      <td >lennie Cassidy</td>
                      <td >09/09/2021</td>
                      <td >3:00 PM</td>
                      <td >$250.00</td>
                      <td >Processed</td>
                      <td><button
                          style={{ marginRight: 10 }}
                          className="btn btn-primary btn-sm"
                          onClick={handleViewShowModal}
                        >
                          <i className="fas fa-eye"></i>
                        </button></td>

                    </tr>
                  </tbody>
                </table>
                <div>

                  {/* <label style={{marginRight:10}}>Move to:</label>
                  <select value= {selectedOption} onChange={(e)=>handleSelectedOption(e)}>
                 {
                   handleOption()
                 }
                 </select> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default TransactionHistory;
