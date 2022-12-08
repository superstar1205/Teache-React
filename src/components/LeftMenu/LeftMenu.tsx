import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";


const LeftMenu: React.FC = () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);
    let [activestate, setActivestate] = useState([1,0,0,0]);
    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }
    function clicktest() {
        // console.log("dfd",activestate)
        setActivestate([1,0,0,0]);
        console.log("dfd",activestate)
    }
    
    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button bg-white" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            
            <ul className={`navbar-nav sidebar sidebar-dark ${getCollapseClass()}`}
                id="collapseMenu" >

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/" style={{backgroundColor:'white'}}>
                    <div className="sidebar-brand-text mx-3" > <img src='./Teache.png' alt="logo" width="160px" height="30px"/></div>
                </a>

                {/* <li className="nav-item active">

                    <Link className="nav-link" to="Home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{fontSize:'15px'}}>Dashboard</span>
                    </Link>
                </li> */}

                <li className="nav-item">
                    <Link className="nav-link" to={`/users`} onClick={()=> clicktest()}>
                        <i className={`fas fa-fw fa-users side-menu-icon ${activestate[0] === 1}? "side-menu-active" : "" `}></i>
                        <span className="side-menu-text">Users</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher`}>
                        <i className="fas fa-fw fa-briefcase side-menu-icon"></i>
                        <span className="side-menu-text">Instructors</span>
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link" to={`/classes`}>
                        <i className="fas fa-fw fa-filter side-menu-icon"></i>
                        <span className="side-menu-text">Classes</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/issues`}>
                        <i className="fas fa-fw fa-bug side-menu-icon"></i>
                        <span className="side-menu-text">Issues</span>
                    </Link>
                </li>

                {/* <li className="nav-item">
                    <Link className="nav-link" to={`/messages`}>
                        <i className="fas fa-fw fa-comment"></i>
                        <span style={{fontSize:'15px'}}>Messages</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/class-type`}>
                        <i className="fas fa-fw fa-filter"></i>
                        <span style={{fontSize:'15px'}}>Class Type</span>
                    </Link>
                </li>

                

                <li className="nav-item">
                    <Link className="nav-link" to={`/transaction-history`}>
                        <i className="fas fa-fw fa-users"></i>
                        <span style={{fontSize:'15px'}}>Transaction History</span>
                    </Link>
                </li> */}

            </ul>
            
        </Fragment>
    );
};

export default LeftMenu;
