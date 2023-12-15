import React from "react";

export default function Users({ users, radioValue, setRadioValue }) {
  return (
    <ul>
      {users &&
        users.map((user) => (
          <div className="d-flex flex-row w-100 h-50" key={user.id}>
            <div className="d-flex  w-50 align-items-center mt-2 ml-5">
              <img src={user.img} style={{ maxHeight: "50px", maxWidth: "30px" }} alt="error" />
            </div>
            <div className="d-flex  w-100 align-items-center mt-2 ml-5">{user.firstName + " " + user.secondName} </div>
            <div className="d-flex  w-100 align-items-center mt-2 ml-5">{user.email}</div>
            <div className="d-flex w-100 align-items-center">
              <label>
                <input
                  type="radio"
                  value={user.uid}
                  checked={radioValue === user.uid}
                  onChange={(e) => setRadioValue(e.target.value)}
                />
                <span>Wybierz</span>
              </label>
            </div>
          </div>
        ))}
    </ul>
  );
}
