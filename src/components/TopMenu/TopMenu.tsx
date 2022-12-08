import React from "react";
import TopMenuAccount from "./TopMenuAccount";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { BiChevronLeft } from "react-icons/bi";
import "./TopMenu.css";

const TopMenu: React.FC = () => {
  let history = useHistory();
  const goToPreviousPath = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const btnStyle = {
    width: "42px",
    height: "42px",
    background: "#FFFFFF",
    borderRadius: "5px",
    border: "none",
    paddingLeft: "5px",
    marginRight: "15px",
  };

  const getTitle = (pathname: any) => {
    let temp = pathname.slice(1).split("/");

    switch (temp[0]) {
      case "cancelledclasses":
        temp[0] = "class";
        break;

      default:
        break;
    }

    if (temp.length > 1) {
      temp[1] = " ID : ".concat(temp[1]);
      return (
        <>
          <Button style={btnStyle} onClick={goToPreviousPath}>
            <BiChevronLeft
              width={42}
              height={42}
              style={{ color: "#5D59B4", fontSize: "30px" }}
            />
          </Button>
          {temp[0].concat(temp[1])}
        </>
      );
    }
    return temp;
  };

  return (
    <nav
      className="navbar navbar-expand navbar-light bg-custom-dark topbar  static-top "
      style={{ background: "#E7EEFC", height: "73px" }}
    >
      <ol
        className="breadcrumb "
        style={{
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "160%",
          color: "#554DF1",
          textTransform: "capitalize",
          marginTop: "22px",
          marginBottom: "25px",
          // marginLeft: "10px",
          background: "#E7EEFC",
        }}
      >
        {/* {(getTitle(useLocation().pathname) > 1)} */}
        <li className="breadcrumb-item">{getTitle(useLocation().pathname)}</li>
        {/* <li className="breadcrumb-item"><a href="# ">{page ? page.subArea : null}</a></li> */}
      </ol>

      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <TopMenuAccount />
      </ul>
    </nav>
  );
};

export default TopMenu;
