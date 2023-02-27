import React from "react";
import LicenseStats from "./LicenseStats";
import "../../../App.css";
import UsersPosters from "./UsersPosters";
import Orders from "./Orders";
import Users from "./Users";
import { useCollection } from "../../../hooks/useCollection";
import FavoriteTheme from "./FavoriteTheme";
import UsersCountry from "./UsersCountry";
export default function AdministratorPanel() {
  const { documents: license } = useCollection("user");
  const { documents: users } = useCollection("Teams");
  const { documents: history } = useCollection("history");
  return (
    <div className="main-content">
      <div className="ml-5 mt-5">
        <p>Tutaj jeżeli będzie za dużo rzeczy to będą zakładki</p>
        <div className="d-flex flex-row h-100 upper-container">
          <LicenseStats license={license} />
          <FavoriteTheme />
          <UsersCountry />
        </div>
        <Orders history={history} user={users} />
        <UsersPosters />
        <Users users={users} license={license} />
      </div>
    </div>
  );
}
