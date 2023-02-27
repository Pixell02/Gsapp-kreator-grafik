import React from "react";
import Title from "../../../components/main-content-elements/Title";
import "../Stats.css";
import UserButton from "./subComponents/UserButton";
export default function Users(props) {
  console.log(props.email);
  return (
    <div className="ml-5 mt-5 users-content-container bg-light">
      <div className="pt-2">
        <Title title="Użytkownicy" />
      </div>
      <table>
        <tr>
          <th className="dimension">id użytkownika</th>
          <th className="dimension">Logo drużyny</th>
          <th className="dimension">Nazwa drużyny</th>
          <th className="dimension">Sport</th>
          <th className="dimension">Typ licencji</th>
          <th className="dimension">Szczegóły</th>
        </tr>
        {props.license &&
          props.license.map((license, i) => (
            <>
              <tr>
                <td className="dimension">
                  {props.email &&
                    props.email
                      .filter((email) => email.uid === license.uid)
                      .map((email) => <>{email.email}</>)}
                  <p style={{ fontSize: "10px" }}>({license.uid})</p>
                </td>
                {props.users &&
                  props.users
                    .filter((user) => user.uid === license.uid)
                    .map((user) => (
                      <>
                        <td className="dimension">
                          <img
                            src={user.img}
                            className="logo-img"
                            alt={user.firstName + " " + user.secondName}
                          />
                        </td>
                        <td className="dimension">
                          {user.firstName + " " + user.secondName}
                        </td>
                        <td className="dimension">{user.sport}</td>
                      </>
                    ))}
                <td className="dimension">{license.license}</td>
                <td className="dimension">
                  <UserButton user={license.uid} />
                </td>
              </tr>
            </>
          ))}
      </table>
    </div>
  );
}
