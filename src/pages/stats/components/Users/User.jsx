import React from "react";
import UserButton from "../UserButton";

const User = ({ license }) => {
  return (
    <>
      <tr>
        <td className="dimension">
          {license?.email}
          <p style={{ fontSize: "10px" }}>({license.uid})</p>
        </td>
        <>
          <td className="dimension">
            <img
              src={license?.team?.img}
              className="logo-img"
              alt={license?.team?.firstName + " " + license?.team?.secondName}
            />
          </td>
          <td className="dimension">
            {license?.team?.firstName + " " + license?.team?.secondName}
          </td>
          <td className="dimension">{license?.team?.sport}</td>
        </>
        <td className="dimension">{license?.license}</td>
        <td className="dimension">
          <UserButton user={license?.uid} />
        </td>
      </tr>
    </>
  );
};

export default User;
