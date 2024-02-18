import { Image, Text, Textbox, ThemeOption } from "./globalPropertiesTypes";
import { Player } from "./teamTypes";

type SponsorBlock = {
  Top: number;
  Left: number;
  Height: number;
  Width: number;
  Fill: string;
};

export type Goal = {
  player: string | Player;
  time: string;
};

export type Filters = {
  blendColor?: {
    alpha: number;
    blendMode: string;
    color: string;
    mode: string;
    themeOption: ThemeOption;
  };
};

export type ImagesWithFilter = {
  Top: number;
  Left: number;
  ScaleToWidth: number;
  OriginX: string;
  OriginY: string;
  ScaleToHeight: number;
  Angle: number;
  className: string;
  Height: number;
  Width: number;
  filters: Filters;
};

export type Coords = {
  SponsorBlock?: SponsorBlock;
  numberOfMatches?: number;
  playerFirstName?: Text[];
  playerLastName?: Text[];
  uid?: string;
  player?: Text[];
  playerImage?: Image[];
  yourTeamLogoOne?: Image;
  yourTeamNameOne?: Text;
  yourOpponentNameOne?: Text;
  opponentImageOne?: Image;
  connectedTeams?: Text;
  TextOne?: Text[];
  NumberOne?: Text[];
  connectedResultsOne?: Text;
  yourTeamResultOne?: Text;
  opponentTeamResultOne?: Text;
  yourTeamFirstName?: Text;
  yourTeamSecondName?: Text;
  yourTeamName?: Text;
  yourTeamLogo?: Image;
  opponentFirstName?: Text;
  opponentSecondName?: Text;
  opponentImage?: Image;
  opponentName?: Text;
  yourTeamResult?: Text;
  yourOpponentResult?: Text;
  Images?: ImagesWithFilter[];
  typePlace?: Text;
  TextBox?: Textbox[];
  Text?: Text[];
  playerOne?: Textbox;
  reserveOne?: Textbox;
  yourPlayerOneGoal?: Textbox;
  orientation?: string;
  Margin?: number;
  opponentPlayerOneGoal?: Textbox;
  AdditionalText?: Textbox[];
};
