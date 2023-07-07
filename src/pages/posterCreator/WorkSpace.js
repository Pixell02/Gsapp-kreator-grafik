import React, { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import EditPanel from "./components/EditPanel";
import WorkSpaceNavbar from "./components/Navbar";
import SaveModal from "./components/SaveModal";
import { BackgroundContext } from "./Context/BackgroundContext";
import { GlobalPropertiesContext } from "./Context/GlobalProperitesContext";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./WorkSpace.css";
import createDefaultObjects from "./components/hooks/createDefaultObjects";
import UpdateModal from "./components/UpdateModal";
import { ManyBackgroundsContext } from "./Context/ManyBackgroundsContext";
import HelpLinesModal from "./components/HelpLinesModal";
import useGuides from "./components/hooks/useGuides";
import ThemeBackgroundWindow from "../ThemeCreator/components/ThemeBackgroundWindow";
import GuideLines from "./components/GuideLines";

export default function WorkSpace({ coords, defaultBackGround, id, backgrounds }) {
  
  const [image, setImage] = useState(defaultBackGround ? defaultBackGround : null);
  const [globalProperties, setGlobalProperties] = useState({ coords } ? coords : {});
  const [color, setColor] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const fabricRef = useRef(null);
  const [manyBackgrounds, setManyBackgrounds] = useState([]);
  const {lines} = useGuides();
  const [helpLinesModal, setHelpLinesModal] = useState(false);
  useEffect(() => {
    if (fabricRef.current?.backgroundImage) {
      createDefaultObjects(fabricRef, globalProperties);
    }
  }, [fabricRef.current]);

 

  
  return (
    <BackgroundContext.Provider value={{image, setImage, color, setColor }}>
      <GlobalPropertiesContext.Provider value={{ globalProperties, setGlobalProperties }}>
        <ManyBackgroundsContext.Provider value={{ manyBackgrounds, setManyBackgrounds }}>
          
          {helpLinesModal ? (
            <HelpLinesModal helpLinesModal={helpLinesModal} setHelpLinesModal={setHelpLinesModal} />
          ) : null}
          {!id && <SaveModal isOpen={isOpen} setIsOpen={() => setIsOpen(true)} />}
          {id && (
            <UpdateModal
              backgrounds={backgrounds}
              defaultBackGround={defaultBackGround}
              isOpen={isOpen}
              setIsOpen={() => setIsOpen(true)}
            />
          )}
          <div className="add-creator-container d-flex h-100">
            <ThemeBackgroundWindow backgrounds={backgrounds} fabricRef={fabricRef} />
            <div className="add-preview-container d-flex flex-column h-100 w-100">
              <div className="w-100 d-flex z-index-1000">
                <WorkSpaceNavbar setHelpLinesModal={setHelpLinesModal} helpLinesModal={helpLinesModal} />
              </div>
              
              {image && (
                <TransformWrapper minScale={0.1} initialScale={1} panning={{ disabled: true }} centerOnInit>
                  <TransformComponent>
                    <div className="w-100 h-100">
                      {/* <GuideLines /> */}
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
        </ManyBackgroundsContext.Provider>
      </GlobalPropertiesContext.Provider>
    </BackgroundContext.Provider>
  );
}
