export type capitan = {
  id: string;
  age: string | null;
  firstName: string;
  secondName: string;
  number: string | null;
};

export type squadPreset = {
  id?: string;
  capitan: capitan | null;
  goalkeeper: capitan | null;
  presetName: string;
  squadPlayers?: Player[];
  reservePlayers?: Player[];
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
  img: PlayerImage[];
  age: number | null;
  number: number | null;
  team: string;
  uid: string;
};
