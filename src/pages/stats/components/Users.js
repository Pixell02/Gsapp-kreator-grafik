import React from "react";
import Title from "../../../components/main-content-elements/Title";
import "../Stats.css";
import User from "./Users/User";
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
        <label>
        <input type="radio" value="id" onChange={() => props.setRadioValue("full-license")} checked={props.radioValue === "full-license"} />
          <span>pełna licencja</span>
        </label>
        <label>
        <input type="radio" value="id" onChange={() => props.setRadioValue("no-license")} checked={props.radioValue === "no-license"} />
          <span>bez licencji</span>
        </label>
        <label>
        <input type="radio" value="id" onChange={() => props.setRadioValue("free-trial")} checked={props.radioValue === "free-trial"} />
          <span>darmowa licencja</span>
        </label>
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
        {(props.radioValue === "firstName" || props.radioValue === "email" || props.radioValue === "id") && (
          <>
          { props.loading && <p>Ładowanie...</p> }
            {!props.loading &&
              props.users &&
              props.users.map((license) => (
                <User license={license} />
              ))
            }
            </>
        )}
        {(props.radioValue === "full-license" || props.radioValue === "free-trial" || props.radioValue === "no-license") && (
          props.allUsers?.filter((user) => props.radioValue === user.license)
            .map((license) => (
            <User license={license} />
          ))
        )}
        
      </table>
    </div>
  );
}
