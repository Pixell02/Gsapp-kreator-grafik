import React from "react";
import "./themeBlock.css";
import Toggle from "react-toggle";
import { useState } from "react";
import { Switch } from "antd";

export default function ThemeBlock({ themes }) {
  const [isChecked, setIsChecked] = useState(themes && themes[0] ? themes[0].public : []);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {themes &&
        themes.map((theme, i) => (
          <div className="theme-container d-flex align-items-center">
            <div className="d-flex w-100 mx-3 theme-content">
              <div className="theme-name">{theme.theme}</div>
              <div className="d-flex w-100 justify-content-end">
                {isChecked ? <span>Publiczny</span> : <span>Prywatny</span>}{" "}
                <Switch checked={isChecked} onChange={handleToggle} />
              </div>
            </div>
            <div className="d-flex w-100 poster-content"></div>
          </div>
        ))}
    </>
  );
}
