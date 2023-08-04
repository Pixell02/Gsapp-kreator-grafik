import React from "react";
import LeftBar from "../../components/Left-Bar";
import WorkSpace from "./WorkSpace";
import { MultiPropertiesProvider } from "./Context/MultiPropertiesContext";

export default function PosterCreator() {
  return (
    <MultiPropertiesProvider>
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <WorkSpace />
      </div>
    </div>
    </MultiPropertiesProvider>
  );
}
