import React, { Fragment } from "react";
// import LeftMenu from "../LeftMenu/LeftMenu";
import LeftMenu from "../LeftMenu/DemoLeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route, Redirect } from "react-router";
import Users from "../Users/Users";
import Teacher from "../Teacher/Teacher";
import TeacherSingle from "../Teacher/TeacherSingle";
// import Home from "../Home/Home";
import Notifications from "../../common/components/Notification";
import Issues from "../Issues/issues";
import IssueSingle from "../Issues/issueSingle";
import Message from "../Message/message";
import TransactionHistory from "../Transactions/TransactionHistory";
import UserInfo from "../Users/UserInfo";
import CompletedClass from "../Classes/CompletedClass";
import CancelledClass from "../Classes/CancelledClass";
import Class from "../Classes/Class";
import Classinfo from "../Classes/Classinfo";

const Admin: React.FC = () => {
  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div
            className="container-fluid"
            style={{
              // height: "90vh",
              overflowY: "hidden",
              background: "#F3F7FF",
              // padding: "auto",
            }}
          >
            <Switch>
              <Route path={`/users`} exact>
                <Users />
              </Route>
              <Route path={`/users/:id`}>
                <UserInfo />
              </Route>
              <Route path={`/classes/:id`}>
                <CompletedClass />
              </Route>
              <Route path={`/cancelledclasses/:id`}>
                <CancelledClass />
              </Route>
              <Route path={`/instructor`} exact>
                <Teacher />
              </Route>
              <Route path={`/instructor/:id`}>
                <TeacherSingle />
              </Route>
              <Route path={`/classes`}>
                <Class />
              </Route>
              <Route path={`/issues`} exact>
                <Issues />
              </Route>
              <Route 
                path={`/issues/:id`}
                render={({location})=>{
                  return <IssueSingle issuesInfo = {location.state } />
                }}
              />
              <Route path={`/message`}>
                <Message />
              </Route>
              <Route path={`/class`}>
                <Classinfo />
              </Route>
              <Route path={`/transaction-history`}>
                <TransactionHistory />
              </Route>
              <Redirect to={"/users"} />
              {/* <Route path="/">
                <Home />
              </Route> */}
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
