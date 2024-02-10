import React, { Dispatch, SetStateAction, useRef } from "react";
import "./ItemBlock.css";

import OptionButton from "../OptionButton";
import { PlayerImage } from "../../types/playerAndSquadTypes";

export type Item = {
  id: string;
  firstName: string;
  secondName?: string;
  name?: string;
  img?: string | PlayerImage[];
  src?: string;
};

type Props<T extends Item> = {
  item: T;
  type: string;
  setData: Dispatch<SetStateAction<T>>;
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

export default function FilteredBlock<T extends Item>({ item, type, setData, setSelectedModal }: Props<T>) {
  const hideElement = useRef(null);
  return (
    <>
      <div key={item.id} ref={hideElement} className="item-window">
        <div className="name-content">
          <span className="name-content">
            {item.firstName ? (
              <>
                {item.firstName + " "}
                {item.secondName || null}
              </>
            ) : (
              item.name
            )}
          </span>
          <OptionButton
            item={item}
            hideElement={hideElement}
            type={type}
            setData={setData}
            setSelectedModal={setSelectedModal}
          />
        </div>
        <div className="image-content">
          {item.img !== null && item.img !== "" && !Array.isArray(item.img) && (
            <img src={item.img || item.src} alt={item.firstName + " " + item.secondName} />
          )}
          {Array.isArray(item.img) && item.img[0].src !== "" && (
            <img src={item.img[0].src} alt={item.firstName + " " + item.secondName} />
          )}
        </div>
      </div>
    </>
  );
}
