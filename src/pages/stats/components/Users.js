import React from "react";
import Title from "../../../components/main-content-elements/Title";
import "../Stats.css";
import UserButton from "./subComponents/UserButton";
export default function Users(props) {
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
        {props.users && props.users.map((user) =>(
          <tr>
            <td className="dimension">{user.uid}</td>
            <td className="dimension"><img src={user.img} className="logo-img" alt={user.firstName + " " + user.secondName} /></td>
            <td className="dimension">{user.firstName + " " + user.secondName}</td>
            <td className="dimension">{user.sport}</td>
            <td className="dimension">
            {props.license && props.license.filter((license) => license.uid === user.uid)
            .map((license) => (<>{license.license}</>))}
            </td>
            <td className="dimension"><UserButton user = {user.uid} /></td>
          </tr>
        ))}
      </table>
    </div>
  );
}
