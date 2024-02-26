import React from "react";
import useSearchTeam from "./hooks/useSearchTeam";

export default function Users({ query, radioValue, setRadioValue }) {
  const [users, loading] = useSearchTeam(query);

  const handleRadioValueChange = (user) => {
    setRadioValue(user);
  };

  return (
    <ul>
      {loading && <div>Loading...</div>}
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
                  checked={radioValue && radioValue.uid === user.uid}
                  onChange={() => handleRadioValueChange(user)}
                />
                <span>Wybierz</span>
              </label>
            </div>
          </div>
        ))}
    </ul>
  );
}
