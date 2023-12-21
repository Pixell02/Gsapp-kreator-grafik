type capitan = {
  age?: string;
  firstName: string;
  secondName: string;
  number: string;
};

export type squadPreset = {
  capitan: capitan;
  goalkeeper: capitan;
  presetName: string;
};

type Image = {
  type: string;
  src: string;
};

export type Player = {
  id?: string;
  firstName: string;
  secondName: string;
  img: Image[];
  team: string;
  uid: string;
};
