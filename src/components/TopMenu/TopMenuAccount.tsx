import React, { useState, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/account.actions";
//import { IStateType } from "../../store/models/root.interface";

function TopMenuAccount(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  //const email: string = useSelector((state: IStateType) => state.account.email);
  const [isShow, setShow] = useState(false);

  return (
    <li className="nav-item dropdown no-arrow">
      <a
        className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        href="# "
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ paddingRight: "0px" }}
      >
        <span
          className="mr-2 d-none d-lg-inline small cadet "
          style={{
            color: "#554df1",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "160%,",
          }}
        >
          <b>Hello, {localStorage.getItem("userName")}</b>
        </span>
        <img
          className="img-profile rounded"
          style={{ borderRadius: "10px", width: "56px", height: "56px" }}
          alt=""
          src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
        />
      </a>

      <div
        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
          isShow ? "show" : ""
        }`}
        aria-labelledby="userDropdown"
      >
        <a
          className="dropdown-item"
          onClick={() => dispatch(logout())}
          href="# "
          data-toggle="modal"
          data-target="#logoutModal"
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
}

export default TopMenuAccount;
