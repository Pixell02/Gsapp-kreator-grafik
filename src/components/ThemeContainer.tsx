import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

type props = {
  children: React.ReactNode;
  category: DocumentData;
};

const ThemeContainer = ({ children, category }: props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mg-container">
      <div className="nav-container" onClick={() => setExpanded(!expanded)}>
        <div className={expanded ? "nav-window" : "nav-window-dark"}>
          <div className="category-icon-container">
            <Icon.ChevronCompactDown
              className={expanded ? "extend-icon-open" : "extend-icon-close"}
              style={{ marginLeft: "20px" }}
            />
          </div>
          <span>{category.theme} </span>
          <div className="empty-container"></div>
        </div>
      </div>

      <div className={expanded ? "poster-container-close" : "poster-container-open"}>{children}</div>
    </div>
  );
};

export default ThemeContainer;
