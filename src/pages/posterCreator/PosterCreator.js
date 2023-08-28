import React from "react";
import LeftBar from "../../components/Left-Bar";
import WorkSpace from "./WorkSpace";
import { MultiPropertiesProvider } from "./Context/MultiPropertiesContext";
import { ImageRefProvider } from "../Creator/context/ImageRefContext";

export default function PosterCreator() {
  return (
    <MultiPropertiesProvider>
        <ImageRefProvider>
          <div className="page-container">
            <div className="content-wrap">
              <LeftBar />
              <WorkSpace />
            </div>
          </div>
        </ImageRefProvider>
    </MultiPropertiesProvider>
  );
}
