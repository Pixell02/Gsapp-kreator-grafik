import React from "react";
import * as Icon from "react-bootstrap-icons";
import { useLanguageContext } from "../../context/LanguageContext";
import translation from "../leftBar.json";
import { props } from "../../types/translationTypes";
import Crest from "../../img/crest_2.svg";

type translationProps = {
  yourCatalog: props;
  catalog: props;
  yourTeamPanel: props;
  players: props;
  opponents: props;
  buyAccess: props;
  Account: props;
  calendar: props;
};

const useLinkOption = () => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const option = [
    {
      icon: <Icon.PersonRolodex className="icon-element" />,
      text: translate.yourCatalog[language],
      link: `/${language}/yourCatalog`,
    },
    {
      icon: <Icon.CardList className="icon-element" />,
      text: translate.catalog[language],
      link: `/${language}/catalog`,
    },
    {
      icon: <Icon.Calendar className="icon-element" />,
      text: translate.calendar[language],
      link: `/${language}/calendar`,
    },
    {
      icon: <Icon.GridFill className="icon-element" />,
      text: translate.yourTeamPanel[language],
      link: `/${language}/yourTeamPanel`,
    },
    {
      icon: <Icon.People className="icon-element" />,
      text: translate.players[language],
      link: `/${language}/players`,
    },
    {
      icon: <img src={Crest} className="icon-element" />,
      text: translate.opponents[language],
      link: `/${language}/opponents`,
    },
    {
      icon: <Icon.Cash className="icon-element" />,
      text: translate.buyAccess[language],
      link: `/${language}/offer`,
    },
    {
      icon: <Icon.PersonCircle className="icon-element" />,
      text: translate.Account[language],
      link: `/${language}/account`,
    },
  ];

  return option;
};

export default useLinkOption;
