import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDoc } from "../../../hooks/useDoc";
import { v4 as uuidv4 } from "uuid";
import { ImagesWithFilter, SponsorBlock } from "../../../types/creatorComponentsTypes";
import { Image } from "fabric/fabric-impl";
import { Text, Textbox } from "../../../types/globalPropertiesTypes";

export const GlobalPropertiesContext = createContext<context | null>(null);

export type GlobalProperties = {
  SponsorBlock?: SponsorBlock;
  numberOfMatches?: number;
  playerFirstName?: Text[];
  playerLastName?: Text[];
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
  orientation?: "horizontally" | "vertically";
  Margin?: number;
  opponentPlayerOneGoal?: Textbox;
  AdditionalText?: Textbox[];
  rollAfter?: number;
  MarginAfterRoll?: number;
  uid: string;
  [key: string]:
    | string
    | number
    | Textbox[]
    | Textbox
    | Text
    | Image[]
    | SponsorBlock
    | ImagesWithFilter[]
    | Text[]
    | Image
    | undefined;
};

export type MultiProperties = {
  numberOfMatches: number;
  orientation: "horizontally" | "vertically";
  Margin: number;
  rollAfter: number;
  MarginAfterRoll: number;
};

type context = {
  isMany: boolean;
  setIsMany: Dispatch<SetStateAction<boolean>>;
  properties: MultiProperties;
  setProperties: Dispatch<SetStateAction<MultiProperties>>;
  globalProperties: GlobalProperties;
  setGlobalProperties: Dispatch<SetStateAction<GlobalProperties>>;
};

export function GlobalPropertiesProvider({ children }: PropsWithChildren) {
  const [globalProperties, setGlobalProperties] = useState<GlobalProperties>({ uid: uuidv4().replace(/-/g, "") });
  const [properties, setProperties] = useState<MultiProperties>({
    numberOfMatches: 4,
    orientation: "horizontally",
    Margin: 100,
    rollAfter: 0,
    MarginAfterRoll: 0,
  });
  const { id } = useParams();
  const [isMany, setIsMany] = useState(false);
  const { documents: coords } = useDoc<GlobalProperties>("coords", ["uid", "==", id || ""]);

  useEffect(() => {
    if (!coords) return;
    setGlobalProperties(coords as GlobalProperties);
    setProperties({
      numberOfMatches: coords.numberOfMatches,
      orientation: coords.orientation,
      Margin: coords.Margin,
      rollAfter: coords.rollAfter,
      MarginAfterRoll: coords.MarginAfterRoll,
    } as MultiProperties);
  }, [coords]);

  return (
    <GlobalPropertiesContext.Provider
      value={{ globalProperties, setGlobalProperties, isMany, setIsMany, properties, setProperties }}
    >
      {children}
    </GlobalPropertiesContext.Provider>
  );
}

export const useGlobalPropertiesContext = () => {
  const context = useContext(GlobalPropertiesContext);
  if (!context) {
    throw Error("globalProperties ;");
  }

  return context;
};
