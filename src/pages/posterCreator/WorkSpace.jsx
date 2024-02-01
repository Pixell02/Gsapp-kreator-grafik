import { useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ThemeBackgroundWindow from "./components/ThemeBackgroundWindow";

import { GlobalPropertiesProvider } from "./Context/GlobalProperitesContext";
import "./WorkSpace.css";
import Canvas from "./components/Canvas";
import EditPanel from "./components/EditPanel";
import HelpLinesModal from "./components/HelpLinesModal";
import WorkSpaceNavbar from "./components/Navbar";
import Modal from "./components/Modal";

export default function WorkSpace() {
  const [isOpen, setIsOpen] = useState(false);
  const fabricRef = useRef(null);
  const [helpLinesModal, setHelpLinesModal] = useState(false);
  return (
    <GlobalPropertiesProvider>
      <>
        {helpLinesModal && <HelpLinesModal helpLinesModal={helpLinesModal} setHelpLinesModal={setHelpLinesModal} />}
        {isOpen && <Modal setIsOpen={setIsOpen} />}
        <div className="add-creator-container d-flex h-100">
          <ThemeBackgroundWindow fabricRef={fabricRef} />
          <div className="add-preview-container d-flex flex-column h-100 w-100">
            <div className="w-100 d-flex z-index-1000">
              <WorkSpaceNavbar setHelpLinesModal={setHelpLinesModal} helpLinesModal={helpLinesModal} />
            </div>
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
          </div>
          <div className="add-workspace-container">
            <EditPanel fabricRef={fabricRef} setIsOpen={() => setIsOpen(true)} />
          </div>
        </div>
      </>
    </GlobalPropertiesProvider>
  );
}
