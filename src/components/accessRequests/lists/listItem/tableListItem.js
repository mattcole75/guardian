import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const TableListItem = (props) => {
  const navigate = useNavigate();

  const { item } = props;
  const accessRequest = item[Object.keys(item)];

  const [hasPermit, setHasPermit] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    accessRequest.permit.map((permit) => {
      if (permit.date === new Date().toISOString().slice(0, 10)) {
        setHasPermit(true);
      }
    });
  }, [accessRequest]);

  const open = (event) => {
    event.stopPropagation();
    navigate(`/accessrequest/${Object.keys(item)}`);
  };

  const permit = (event) => {
    event.stopPropagation();
    navigate(`/accessrequest/permit/${Object.keys(item)}`);
  };

  let statusCSS = [];
  statusCSS.push("badge d-inline-block text-nowrap");

  switch (accessRequest && accessRequest.status) {
    case "Draft":
      statusCSS.push("bg-secondary");
      break;
    case "Submitted":
      statusCSS.push("bg-warning text-dark");
      break;
    case "Under Review":
      statusCSS.push("bg-info");
      break;
    case "Denied":
      statusCSS.push("bg-danger");
      break;
    case "Granted":
      statusCSS.push("bg-success");
      break;
    case "Completed":
      statusCSS.push("bg-secondary");
      break;
    case "Cancelled":
      statusCSS.push("bg-info");
      break;
    default:
      break;
  }

  return (
    <tr
      className="border-bottom cursor-pointer"
      onClick={(event) => open(event)}
    >
      <td className="ps-3 pe-3">
        <div>{accessRequest && accessRequest.siteDetails.siteDescription}</div>
      </td>
      <td className="ps-3 pe-3">
        {accessRequest && accessRequest.siteDetails.accessFirstDay
          ? moment(accessRequest.siteDetails.accessFirstDay).format(
              "DD/MM/YYYY"
            )
          : "Not Set"}
      </td>
      <td className="ps-3 pe-3">
        {accessRequest && accessRequest.siteDetails.accessLastDay
          ? moment(accessRequest.siteDetails.accessLastDay).format("DD/MM/YYYY")
          : "Not Set"}
      </td>
      <td className="ps-3 pe-3">
        {accessRequest && moment(accessRequest.updated).fromNow()}
      </td>
      <td className="ps-3 pe-3">
        {
          <small className={statusCSS.join(" ")}>
            {accessRequest && accessRequest.status}
          </small>
        }
      </td>
      {accessRequest.status === "Granted" && hasPermit ? (
        <td className="ps-3 pe-3">
          <button className="btn btn-link" onClick={(event) => permit(event)}>
            Link
          </button>
        </td>
      ) : (
        <td className="ps-3 pe-3">
          <small className="badge d-inline-block text-nowrap bg-info">
            Not available
          </small>
        </td>
      )}
    </tr>
  );
};

export default TableListItem;
