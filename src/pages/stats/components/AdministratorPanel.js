import React, { useState, useEffect } from "react";
import LicenseStats from "./LicenseStats";
import "../Stats.css";
import UsersPosters from "./UsersPosters";
import Orders from "./Orders";
import Users from "./Users";
import FavoriteTheme from "./FavoriteTheme";
import UsersCountry from "./UsersCountry";
import Themes from "./Themes";
import { useSearch } from "../../../hooks/useLimit";
import PromoCode from "./PromoCode";
import Logs from "./Logs";
import ToDo from "./ToDo";

export default function AdministratorPanel() {
  const [activeBar, setActiveBar] = useState("users");
  const [radioValue, setRadioValue] = useState("full-license");
  const [search, setSearch] = useState("");
  const { documents: users, loading, allUsers } = useSearch("Teams", radioValue, search === "" ? null : search);

  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    if (users) {
      const filteredData = users.filter((user, index, self) => {
        return index === self.findIndex((u) => u.uid === user.uid);
      });
      setDataFiltered(filteredData);
    }
  }, [users]);

  return (
    <div className="main-content">
      <div className="ml-5 mt-5">
        <ul className="d-flex flex-row navbar-container">
          <li
            className={activeBar === "users" ? "trapezoid-active" : "trapezoid"}
            onClick={() => {
              setActiveBar("users");
            }}
          >
            <span>użytkownicy</span>
          </li>
          <li
            className={activeBar === "themes" ? "trapezoid-active" : "trapezoid"}
            onClick={() => {
              setActiveBar("themes");
            }}
          >
            <span>Motywy</span>
          </li>
          <li
            className={activeBar === "stats" ? "trapezoid-active" : "trapezoid"}
            onClick={() => {
              setActiveBar("stats");
            }}
          >
            <span>Statystyki</span>
          </li>
          <li className={activeBar === "logs" ? "trapezoid-active" : "trapezoid"}
            onClick={() => {
            setActiveBar("logs")
          }}
          >
            <span>Logi</span>
          </li>
          <li className={activeBar === "toDo" ? "trapezoid-active" : "trapezoid"}
            onClick={() => {
            setActiveBar("toDo")
          }}
          >
            <span style={{fontSize: "10px"}}>do zrobienia</span>
          </li>
        </ul>
        <hr />

        {activeBar === "stats" && (
          <>
            <div className="d-flex flex-row  upper-container">
              <LicenseStats />
              <FavoriteTheme />
              <UsersCountry />
            </div>
            <Orders />
          </>
        )}
        {activeBar === "users" && (
          <>
            <PromoCode />
            <UsersPosters />
            <Users
              allUsers={allUsers}
              users={dataFiltered}
              loading={loading}
              search={search}
              setSearch={setSearch}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
            />
          </>
        )}
        {activeBar === "themes" && <Themes />}
        {activeBar === "logs" && <Logs />}
        {activeBar === "toDo" && <ToDo />}
      </div>
    </div>
  );
}
