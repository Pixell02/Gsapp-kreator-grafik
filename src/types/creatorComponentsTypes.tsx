import {
  IBlendColorFilter,
  IBrightnessFilter,
  IContrastFilter,
  IGrayscaleFilter,
  ISaturationFilter,
} from "fabric/fabric-impl";
import { Languages } from "../pages/YourTeamPanel/components/useColorOption";
import { Image, Text, Textbox } from "./globalPropertiesTypes";
import { Player } from "./teamTypes";
import { LegacyRef, MutableRefObject } from "react";

export type FabricReference = MutableRefObject<fabric.Canvas>;

export type MutableFabricRef = MutableRefObject<LegacyRef<HTMLCanvasElement>>;

export type FabricRef = FabricReference | MutableFabricRef;

export type SponsorBlock = {
  Top: number;
  Left: number;
  Height: number;
  Width: number;
  Fill: string;
  type: string;
};
export type Catalog = {
  id: string;
  public: boolean;
  sport: string;
  theme: string;
  type: "normal" | "story";
};

export type Goal = {
  player: string | Player;
  time: string;
};

export type BrightnessFilter = {
  brightness: number;
};
export type ContrastFilter = {
  contrast: number;
};
export type SaturationFilter = {
  saturation: number;
};

type BlendThemeOption = {
  color: string;
  label: string;
};

export type BlendColorFilter = {
  [key: string]: unknown;
  alpha: number;
  blendMode: string;
  color: string;
  mode: string;
  themeOption: BlendThemeOption[];
};

export type FilterParameters =
  | BrightnessFilter
  | ContrastFilter
  | SaturationFilter
  | BlendColorFilter
  | IGrayscaleFilter;

export type Filters = {
  [key: string]:
    | BrightnessFilter
    | IBrightnessFilter
    | ContrastFilter
    | IContrastFilter
    | SaturationFilter
    | ISaturationFilter
    | IGrayscaleFilter
    | BlendColorFilter
    | IBlendColorFilter
    | string
    | undefined;
  brightness?: BrightnessFilter | IBrightnessFilter;
  contrast?: ContrastFilter | IContrastFilter;
  saturation?: SaturationFilter | ISaturationFilter;
  grayScale?: IGrayscaleFilter;
  blendColor?: BlendColorFilter | IBlendColorFilter;
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

export type ActiveObjectCoords = {
  Top?: number;
  Left?: number;
  [key: string]: string | Languages | number | undefined | Filters[] | Filters;
  text?: Languages;
  className?: string;
  Angle?: number;
  Width?: number;
  Height?: number;
  ScaleToWidth?: number;
  ScaleToHeight?: number;
  FontSize?: number;
  FontFamily?: string;
  CharSpacing?: number;
  Fill?: string;
  OriginX?: string;
  OriginY?: string;
  type?: string;
  TextAlign?: string;
  Format?: string;
  FontStyle?: string;
  LineHeight?: number;
  Formatter?: string;
  filters?: Filters[] | Filters;
};
