import React from "react";
import UserButton from "../UserButton";

type props = {
  user: {
    email: string;
    uid: string;
    img?: string;
    name?: string;
    sport?: string;
    license: string;
  };
};

const User = ({ user }: props) => {
  return (
    <>
      <tr>
        <td className="dimension">
          {user.email}
          <p style={{ fontSize: "10px" }}>({user.uid})</p>
        </td>
        <>
          <td className="dimension">
            <img src={user.img} className="logo-img" alt={user?.name} />
          </td>
          <td className="dimension">{user?.name}</td>
          <td className="dimension">{user?.sport}</td>
        </>
        <td className="dimension">{user.license}</td>
        <td className="dimension">
          <UserButton user={user.uid} />
        </td>
      </tr>
    </>
  );
};

export default User;
