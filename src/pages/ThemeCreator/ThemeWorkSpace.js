import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { BackgroundContext } from "../posterCreator/Context/BackgroundContext";
import { GlobalPropertiesContext } from "../posterCreator/Context/GlobalProperitesContext";
import { ManyBackgroundsProvider } from "../posterCreator/Context/ManyBackgroundsContext";
import Canvas from "../posterCreator/components/Canvas";
import EditPanel from "../posterCreator/components/EditPanel";
import WorkSpaceNavbar from "../posterCreator/components/Navbar";
import createDefaultObjects from "../posterCreator/components/hooks/createDefaultObjects";
import { useMultiPropertiesContext } from "../posterCreator/components/hooks/useMultiPropertiesContext";
import SaveThemeModal from "./components/SaveThemeModal";
import ThemeBackgroundWindow from "./components/ThemeBackgroundWindow";
import UpdateThemeModal from "./components/UpdateThemeModal";

export default function ThemeWorkSpace({ coords, defaultBackGround, id, backgrounds }) {
  const fabricRef = useRef(null);
  const [globalProperties, setGlobalProperties] = useState(coords ? coords : {});
  const [image, setImage] = useState(defaultBackGround ? defaultBackGround : null);
  const [color, setColor] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const { setIsMany, setProperties } = useMultiPropertiesContext();

  useEffect(() => {
    if (fabricRef.current?._objects) {
      if (globalProperties?.orientation) {
        setProperties((prev) => ({
          ...prev,
          orientation: globalProperties.orientation,
          Margin: globalProperties.Margin,
          numberOfMatches: globalProperties.numberOfMatches,
        }));
      }
      createDefaultObjects(fabricRef, globalProperties, setIsMany);
    }
  }, [fabricRef.current?._objects]);
  return (
    <BackgroundContext.Provider value={{ image, setImage, color, setColor }}>
      <GlobalPropertiesContext.Provider value={{ globalProperties, setGlobalProperties }}>
        <ManyBackgroundsProvider>
          {!isOpen && !id && <SaveThemeModal isOpen={isOpen} backgrounds={backgrounds} setIsOpen={() => setIsOpen(true)} />}
          {!isOpen && id && (
            <UpdateThemeModal
              isOpen={isOpen}
              setIsOpen={() => setIsOpen(true)}
              backgrounds={backgrounds}
              defaultBackGround={defaultBackGround}
            />
          )}
          <ThemeBackgroundWindow fabricRef={fabricRef} backgrounds={backgrounds} />
          <div className="add-creator-container d-flex h-100">
            <div className="add-preview-container d-flex flex-column h-100 w-100">
              <div className="w-100 d-flex z-index-1000">
                <WorkSpaceNavbar />
              </div>
              {image && (
                <TransformWrapper minScale={0.1} initialScale={1} panning={{ disabled: true }} centerOnInit>
                  <TransformComponent>
                    <div className="w-100 h-100">
                      <div className="add-preview-container d-flex flex-column h-100 w-100 align-items-center justify-content-center">
                        <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                          <Canvas
                            fabricRef={fabricRef}
                            globalProperties={globalProperties}
                            defaultBackGround={defaultBackGround}
                            coords={coords}
                          />
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
