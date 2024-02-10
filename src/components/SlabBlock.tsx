import React, { Dispatch, SetStateAction, useRef } from "react";
import "./slabBlock.css";
import OptionButton from "./OptionButton";
import { Place } from "../pages/Opponents/components/PlaceContent";
import { squadPreset } from "../types/playerAndSquadTypes";

type Props<T> = {
  item: T;
  type: string;
  setData: Dispatch<SetStateAction<T>>;
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

const SlabBlock = <T extends Place | squadPreset>({ item, type, setData, setSelectedModal }: Props<T>) => {
  const hideElement = useRef(null);

  return (
    <div ref={hideElement} className="slab-container">
      <div className="name-container">
        <span>{(item as Place)?.place || (item as squadPreset).presetName}</span>
      </div>
      <OptionButton
        setData={setData}
        item={item}
        hideElement={hideElement}
        type={type}
        setSelectedModal={setSelectedModal}
      />
    </div>
  );
};

export default SlabBlock;
