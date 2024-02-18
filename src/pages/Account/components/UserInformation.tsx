import React from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useUserInformation from "../../../hooks/useUserInformation";

export default function UserInformation() {
  const { user } = useAuthContext();
  const { userCreatedAt } = useUserInformation(user.uid);
  return (
    <>
      <label>Id konta</label>
      <div className="userId account-data-container">
        <span className="account-data">{user.uid} </span>
      </div>
      {user.email && (
        <>
          <label>E-mail</label>
          <div className="userEmail account-data-container">
            <span className="account-data">{user.email}</span>
          </div>
        </>
      )}
      <label>Data utworzenia konta</label>
      <div className="userId account-data-container">
        <span className="account-data">{userCreatedAt} </span>
      </div>
    </>
  );
}
