import React, { Fragment, Dispatch  } from "react";
import { useDispatch} from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

const Message: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));


  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
        <div className="card mb-4" style={{border: 'none'}}>
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold" style={{fontSize:'20px', color:'#5a67de' }}>
                Message
              </h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div style={{marginBottom:20}}>

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
                     
                      <th  scope="col">Chat</th>
                      <th  scope="col">Fixed</th>
                      <th  scope="col">Unresolved</th>
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
                      <td ><button className="btn">Chat</button></td>
                      <td ><i style={{color:'green'}} className="fas fa-check"></i></td>
                      <td >-</td>
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

<button className="col-lg-12">Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default Message;
