import { DocumentData } from "firebase/firestore";
import React from "react";

type props = {
  coords: DocumentData;
};

const MultiElements = ({ coords }: props) => {
  console.log(coords);
  return <div></div>;
};

export default MultiElements;
