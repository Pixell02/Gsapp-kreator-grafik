import { Goal } from "./creatorComponentsTypes";
import { Opponent, Player, SquadPreset, Team } from "./teamTypes";

export type ThemeOption = {
  label: string;
  value: string;
};

export type Text = {
  [key: string]: string | number | undefined | ThemeOption;
  Top: number;
  Left: number;
  FontSize: number;
  className: string;
  value: string;
  Fill: string;
  OriginX: string;
  OriginY: string;
  FontFamily: string;
  Angle?: number;
  CharSpacing?: number;
  ScaleToWidth: number;
  themeOption: ThemeOption;
  FontStyle: "" | "normal" | "italic" | "oblique" | undefined;
};

export type Textbox = {
  Top: number;
  Left: number;
  FontSize: number;
  className: string;
  Height: number;
  LineHeight: number;
  TextAlign: string;
  Fill: string;
  OriginX: string;
  OriginY: string;
  FontFamily: string;
  Angle?: number;
  CharSpacing?: number;
  ScaleToWidth: number;
  themeOption: ThemeOption;
  format?: string;
  Format?: string;
  Formatter?: string;
  value: string;
  FontStyle: "" | "normal" | "italic" | "oblique" | undefined;
};

export type Image = {
  Top: number;
  Left: number;
  className: string;
  Angle: number;
  Width: number;
  Height: number;
  ScaleToWidth: number;
  ScaleToHeight: number;
  originX: string;
  originY: string;
  type: string;
  filters: [];
};

type TextValue = {
  className: string;
  value: string;
};

export type CalendarData = {
  player?: Player[];
  squadPreset?: SquadPreset;
  hostResult?: string[];
  guestResult?: string[];
  yourResult?: string;
  opponentResult?: string;
  typePlace?: string;
  selectedGuest?: Player[];
  selectedHost?: Player[];
  NumberOne?: Text[];
  Textbox?: Textbox[];
  Text?: TextValue[];
  selectedPreset?: SquadPreset;
  TextOne?: Text[];
  radioChecked?: string;
  selectedTheme?: string;
  selectedTeam?: Team;
  selectedOpponent?: Opponent;
  selectedPlacePreset?: string;
  selectedPlayers?: Player[];
  selectedReserve?: Player[];
  teamGoals?: Goal[];
  opponentGoals?: Goal[];
  capitan?: Player;
  goalKeeper?: Player;
};
