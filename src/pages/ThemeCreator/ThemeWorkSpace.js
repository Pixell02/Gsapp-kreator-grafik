import React, { useEffect } from "react";
import WorkSpaceNavbar from "../posterCreator/components/Navbar";
import Canvas from "../posterCreator/components/Canvas";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef } from "react";
import { useState } from "react";
import EditPanel from "../posterCreator/components/EditPanel";
import { BackgroundContext, BackgroundProvider } from "../posterCreator/Context/BackgroundContext";
import { GlobalPropertiesContext, GlobalPropertiesProvider } from "../posterCreator/Context/GlobalProperitesContext";
import ThemeBackgroundWindow from "./components/ThemeBackgroundWindow";
import { ManyBackgroundsProvider } from "../posterCreator/Context/ManyBackgroundsContext";
import SaveThemeModal from "./components/SaveThemeModal";
import createDefaultObjects from "../posterCreator/components/hooks/createDefaultObjects";
import UpdateThemeModal from "./components/UpdateThemeModal";

export default function ThemeWorkSpace({ coords, defaultBackGround, id, backgrounds }) {
  const fabricRef = useRef(null);
  const [background, setBackground] = useState(defaultBackGround ? defaultBackGround.src : null);
  const [globalProperties, setGlobalProperties] = useState({ coords } ? coords : {});
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [isOpen, setIsOpen] = useState(true);

  
  useEffect(() => {
    if (fabricRef.current?.backgroundImage) {
      createDefaultObjects(fabricRef, globalProperties, coords)
    };
  },[fabricRef.current])
  return (
    <BackgroundContext.Provider value={{ background, setBackground, image, setImage, color, setColor }}>
      <GlobalPropertiesContext.Provider value={{globalProperties, setGlobalProperties}}>
        <ManyBackgroundsProvider>
          {!isOpen && !id && <SaveThemeModal isOpen={isOpen} setIsOpen={() => setIsOpen(true)} />}
          {!isOpen && id && <UpdateThemeModal isOpen={isOpen} setIsOpen={() => setIsOpen(true)} defaultBackGround={defaultBackGround}/>}
          <ThemeBackgroundWindow fabricRef={fabricRef} backgrounds={backgrounds} />
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
                          <Canvas fabricRef={fabricRef} globalProperties={globalProperties} coords={coords} />
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
      </GlobalPropertiesContext.Provider>
    </BackgroundContext.Provider>
  );
}
