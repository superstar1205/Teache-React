import React from "react";

export function getBadge(status: string) {
  let bg, fontColor, _status;
  switch (status) {
    case "active":
      bg = "#B8F4DB";
      fontColor = "#246B4D";
      _status = "Active";
      break;
    case "in-active":
      bg = "#FFD6D2";
      fontColor = "#A8433A";
      _status = "Inactive";
      break;
    case "block":
      bg = "#DDE9FF";
      fontColor = "#C4C2E9";
      _status = "Block";
      break;
    default:
      break;
  }
  return (
    <span
      // href="#"
      className="badge"
      style={{
        backgroundColor: bg,
        color: fontColor,
        textDecoration: "none",
        borderRadius: "20px",
        width: "86px",
        height: "36px",
        justifyContent: "center",
        alignItems: "center",
        // padding: "6px",
        // padding: '5px 18px',
        padding: "auto",
        margin: "auto",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "160%",
        verticalAlign: "middle",
      }}
    >
      {_status}
    </span>
  );
}

export function getTeacherBadge(status: string) {
  let bg, fontColor, _status;
  switch (status) {
    case "accepted":
      bg = "#B8F4DB";
      fontColor = "#246B4D";
      _status = "Accepted";
      break;
    case "awaiting":
      bg = "#FFD6D2";
      fontColor = "#A8433A";
      _status = "Awaiting";
      break;
    case "rejected":
      bg = "#DDE9FF";
      fontColor = "#C4C2E9";
      _status = "Rejected";
      break;
    default:
      break;
  }
  return (
    <span
      // href="#"
      className="badge"
      style={{
        backgroundColor: bg,
        color: fontColor,
        textDecoration: "none",
        borderRadius: "20px",
        width: "86px",
        height: "36px",
        justifyContent: "center",
        alignItems: "center",
        // padding: "6px",
        // padding: '5px 18px',
        padding: "auto",
        margin: "auto",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "160%",
        verticalAlign: "middle",
      }}
    >
      {_status}
    </span>
  );
}

export function getStatus(status: string) {
  let bg, fontColor, _status;
  switch (status) {
    case "upcoming":
      bg = "#DDE9FF";
      fontColor = "#807CD6";
      _status = "Upcomming";
      break;
    case "completed":
      bg = "#B8F4DB";
      fontColor = "#246B4D";
      _status = "Completed";
      break;
    case "cancelled":
      bg = "#FFD6D2";
      fontColor = "#A8433A";
      _status = "Cancelled";
      break;
    default:
      break;
  }
  return (
    <span
      // href="#"
      className="badge"
      style={{
        backgroundColor: bg,
        color: fontColor,
        textDecoration: "none",
        borderRadius: "20px",
        width: "117px",
        height: "36px",
        justifyContent: "center",
        alignItems: "center",
        // padding: "6px",
        // padding: '5px 18px',
        padding: "auto",
        margin: "auto",
        // fontSize: "16px",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "160%",
        verticalAlign: "middle",
      }}
    >
      {_status}
    </span>
  );
}

export function getAbbr(country: string) {
  let abbr;
  switch (country) {
    case "New York":
      abbr = "NY";
      break;
    case "Virginia":
      abbr = "VA";

      break;
    case "Mc Lean":
      abbr = "ML";

      break;
    case "Brooklyn":
      abbr = "Bk";

      break;

    default:
      break;
  }
  return abbr
}
