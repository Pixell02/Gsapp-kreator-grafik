import React, { useRef } from "react";

import "./ItemBlock.css";

import { useLocation } from "react-router-dom";
import OptionButton from "../OptionButton";
export default function FilteredBlock({ item, editClick, type }) {
  const hideElement = useRef(null);
  const location = useLocation();
  const goodLocation = location.pathname.split("/")[2];
  return (
    <>
      <div key={item.id} ref={hideElement} className="item-window">
        <div className="name-content">
          <span key={item.id} className="name-content">
            {item.firstName ? (
              <>
                {item.firstName + " "}
                {item.secondName ? item.secondName : null}
              </>
            ) : (
              item.name
            )}
          </span>
          <OptionButton item={item} hideElement={hideElement} editClick={editClick} type={type || goodLocation} />
        </div>
        <div className="image-content">
          {item.img !== null && item.img !== "" && (
            <img
              src={item.img ? item.img : item.src && item.src ? item.src : null}
              alt={item.firstName + " " + item.secondName}
            />
          )}
        </div>
      </div>
    </>
  );
}
