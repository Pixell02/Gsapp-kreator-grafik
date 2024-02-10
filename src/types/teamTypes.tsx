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
