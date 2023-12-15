import React from "react";
import LeftBar from "../../components/Left-Bar";
import ThemeWorkSpace from "./ThemeWorkSpace";
import { MultiPropertiesProvider } from "../posterCreator/Context/MultiPropertiesContext";
import { ImageRefProvider } from "../Creator/context/ImageRefContext";

export default function ThemeCreator() {
  return (
    <MultiPropertiesProvider>
      <ImageRefProvider>
        <div className="page-container">
          <div className="content-wrap">
            <LeftBar />
            <ThemeWorkSpace />
          </div>
        </div>
      </ImageRefProvider>
    </MultiPropertiesProvider>
  );
}
