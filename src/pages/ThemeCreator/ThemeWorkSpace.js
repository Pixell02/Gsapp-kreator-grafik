import React from "react";
import WorkSpaceNavbar from "../posterCreator/components/Navbar";
import Canvas from "../posterCreator/components/Canvas";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef } from "react";
import { useState } from "react";
import EditPanel from "../posterCreator/components/EditPanel";
import { BackgroundContext, BackgroundProvider } from "../posterCreator/Context/BackgroundContext";
import { GlobalPropertiesProvider } from "../posterCreator/Context/GlobalProperitesContext";
import ThemeBackgroundWindow from "./components/ThemeBackgroundWindow";
import { ManyBackgroundsProvider } from "../posterCreator/Context/ManyBackgroundsContext";
import SaveThemeModal from "./components/SaveThemeModal";

export default function ThemeWorkSpace({ coords, defaultBackGround, id }) {
  const fabricRef = useRef();
  const [background, setBackground] = useState(defaultBackGround ? defaultBackGround.src : null);
  const [globalProperties, setGlobalProperties] = useState({ coords } ? coords : {});
  const [image, setImage] = useState()
  const [color, setColor] = useState()
  const [isOpen, setIsOpen] = useState(true);
  
  
  return (
    <BackgroundContext.Provider value={{ background, setBackground, image, setImage, color, setColor }}>
      <GlobalPropertiesProvider>
        <ManyBackgroundsProvider>
          {!isOpen && <SaveThemeModal isOpen={isOpen} setIsOpen={() => setIsOpen(true)} />}
        <ThemeBackgroundWindow fabricRef={fabricRef} backgrounds={background}  />
    <div className="add-creator-container d-flex h-100">
      <div className="add-preview-container d-flex flex-column h-100 w-100">
        <div className="w-100 d-flex z-index-1000">
          <WorkSpaceNavbar />
        </div>
        {background && (
          <TransformWrapper minScale={0.1} initialScale={1} panning={{ disabled: true }} centerOnInit>
            <TransformComponent>
              <div className="w-100 h-100">
                <div className="add-preview-container d-flex flex-column h-100 w-100 align-items-center justify-content-center">
                  <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                    <Canvas fabricRef={fabricRef} />
                  </div>
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>

      <div className="add-workspace-container">
        <EditPanel fabricRef={fabricRef} setIsOpen={() => setIsOpen(false)} />
      </div>
        </div>
        </ManyBackgroundsProvider>
      </GlobalPropertiesProvider>
    </BackgroundContext.Provider>
    
  );
}
