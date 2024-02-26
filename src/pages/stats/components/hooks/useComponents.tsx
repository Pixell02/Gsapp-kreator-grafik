import React from "react";
import Themes from "../AdministratorPanel/Themes";
import ToDo from "../AdministratorPanel/ToDo";
import Teams from "../AdministratorPanel/Teams";
import Mailing from "../AdministratorPanel/Mailing";
import Users from "../AdministratorPanel/Users";
import LicenseStats from "../AdministratorPanel/LicenseStats";
import FavoriteTheme from "../AdministratorPanel/FavoriteTheme";
import UsersCountry from "../AdministratorPanel/UsersCountry";
import Orders from "../AdministratorPanel/Orders";
import PromoCode from "../AdministratorPanel/PromoCode";
import UsersPosters from "../AdministratorPanel/UsersPosters";

const useComponents = () => {
  const components: { [key: string]: JSX.Element } = {
    stats: (
      <>
        <div className="d-flex flex-row  upper-container">
          <LicenseStats />
          <FavoriteTheme />
          <UsersCountry />
        </div>
        <Orders />
      </>
    ),
    users: (
      <>
        <PromoCode />
        <UsersPosters />
        <Users />
      </>
    ),
    themes: <Themes />,
    toDo: <ToDo />,
    teams: <Teams />,
    mailing: <Mailing />,
  };

  const options = [
    {
      name: "użykownicy",
      value: "users",
    },
    {
      name: "Motywy",
      value: "themes",
    },
    {
      name: "statystyki",
      value: "stats",
    },
    {
      name: "do zrobienia",
      value: "toDo",
    },
    {
      name: "kluby",
      value: "teams",
    },
    { name: "mailing", value: "mailing" },
  ];

  return { components, options };
};

export default useComponents;
