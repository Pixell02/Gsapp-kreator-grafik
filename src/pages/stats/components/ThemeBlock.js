import React, { useEffect } from "react";
import "./themeBlock.css";
import Toggle from "react-toggle";
import { useState } from "react";
import { Switch } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";
import { Link } from "react-router-dom";


export default function ThemeBlock({ themes, posters }) {
  const [isCheckedArray, setIsCheckedArray] = useState([]);
  
  useEffect(() => {
    const newIsCheckedArray = themes.map((theme) => {
      return theme && theme.public ? theme.public : false;
    });

    setIsCheckedArray(newIsCheckedArray);
  }, [themes]);

  const handleToggle = (theme) => {
    const docRef = doc(db, "catalog", theme.id);
    const updatedPublicValue = !theme.public;

    updateDoc(docRef, {
      public: updatedPublicValue,
    }).then(() => {
      const updatedThemes = themes.map((item) => {
        if (item.id === theme.id) {
          return {
            ...item,
            public: updatedPublicValue,
          };
        }
        return item;
      });
      setIsCheckedArray(updatedThemes);
    });
  };

  const sortedThemes = themes.sort((a, b) => {
    const getNumberFromTheme = (theme) => {
      const match = theme.theme.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };
    const numberA = getNumberFromTheme(a);
    const numberB = getNumberFromTheme(b);
    return numberA - numberB;
  });
  
  return (
    <>
      {sortedThemes &&
        sortedThemes.map((theme, i) => (
          <div className="theme-container mt-3 d-flex align-items-center">
            <div className="d-flex w-100 mx-3 theme-content">
              <div className="theme-name">{theme.theme}</div>
              <div className="d-flex w-100 justify-content-end mt-3 mx-2">
                {theme.public ? <span>Publiczny</span> : <span>Prywatny</span>}{" "}
                <Switch checked={theme.public} onChange={() => handleToggle(theme)} />
              </div>
            </div>
            <div className="d-flex w-100 poster-content">
              <div className="block-item">
                {posters &&
                  posters
                    .filter((poster) => poster.themeId === theme.id)
                    .map((poster) => (
                      <Link to={`/creator/${poster.id}`} className="link-container">
                        <FilteredBlock item={poster} />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
