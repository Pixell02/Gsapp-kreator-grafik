import React from "react";

export default function UserInformation({user, userEmail, userCreatedAt}) {
  return (
    <>
      <label>Id konta</label>
      <div className="userId account-data-container">
        <span className="account-data">{user.uid} </span>
      </div>
      {userEmail && (
        <>
          <label>E-mail</label>
          <div className="userEmail account-data-container">
            <span className="account-data">{userEmail}</span>
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
