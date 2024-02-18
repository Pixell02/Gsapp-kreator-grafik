export type Team = {
  id?: string;
  firstName: string;
  secondName: string;
  color?: {
    primary: string;
    secondary: string;
  } | null;
  img: string | File;
  sport: string;
  uid: string;
};

export type Opponent = {
  id?: string;
  firstName: string;
  secondName: string;
  team: string;
  img: string | File;
  uid: string;
};

export type PlayerImage = {
  type: string;
  src: string;
};

export type Player = {
  id?: string;
  firstName: string;
  secondName: string;
  img: PlayerImage[] | string;
  age: number | null;
  number: number | null;
  team: string;
  uid: string;
};

export type Trainer = {
  id?: string;
  firstName: string;
  secondName: string;
  team: string;
  uid: string;
  img: string;
};

export type SelectPlayer = {
  id?: string;
  age: string | null;
  firstName: string;
  img: string;
  secondName: string;
  number: string | null;
};

export type SquadPreset = {
  id?: string;
  capitan: SelectPlayer | null;
  goalkeeper: SelectPlayer | null;
  presetName: string;
  squadPlayers?: Player[];
  reservePlayers?: Player[];
  uid: string;
};
