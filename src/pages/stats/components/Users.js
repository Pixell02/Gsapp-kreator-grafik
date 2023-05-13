import React from "react";
import Title from "../../../components/main-content-elements/Title";
import "../Stats.css";
import UserButton from "./subComponents/UserButton";
export default function Users(props) {
 
  return (
    
    <div className="ml-5 mt-5 users-content-container bg-light">
      <div className="pt-2 d-flex flex-row align-items-center">
        <Title title="Użytkownicy" />
        <input
          type="text"
          placeholder="Szukaj"
          className="w-25"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
        />
        <label>
          <input type="radio" value="firstName" onChange={() => props.setRadioValue("firstName")} checked={props.radioValue === "firstName"} />
          <span>pierwsza część nazwy drużyny</span>
        </label>
        <label>
          <input type="radio" value="email" onChange={() => props.setRadioValue("email")} checked={props.radioValue === "email"} />
          <span>email</span>
        </label>
        <label>
          <input type="radio" value="id" onChange={() => props.setRadioValue("id")} checked={props.radioValue === "id"} />
          <span>id</span>
        </label>
        <span style={{fontSize: "10px"
        }}>Działa na wszystkich, jak jakiś email od razu nie wyskakuje, to musisz wpisać więcej, bo nie każdy od razu łapie</span>
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
        { 
          props.users &&
          props.users.map((license) => (
            <>
              <tr>
                <td className="dimension">
                  {license.email}
                  <p style={{ fontSize: "10px" }}>({license.uid})</p>
                </td>
                <>
                  <td className="dimension">
                    <img src={license.img} className="logo-img" alt={license.firstName + " " + license.secondName} />
                  </td>
                  <td className="dimension">{license.firstName + " " + license.secondName}</td>
                  <td className="dimension">{license.sport}</td>
                </>

                <td className="dimension">{license.license}</td>
                <td className="dimension">
                  <UserButton user={license.uid} />
                </td>
              </tr>
            </>
          ))
        }
      </table>
    </div>
  );
}
