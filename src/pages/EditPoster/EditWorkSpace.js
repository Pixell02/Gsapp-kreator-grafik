
// import React, { useRef, useState } from "react";
// import Canvas from "./components/Canvas";
// import EditPanel from "./components/EditPanel";
// import WorkSpaceNavbar from "./components/Navbar";
// import SaveModal from "./components/SaveModal";
// import { BackgroundContext } from "./Context/BackgroundContext";
// import { GlobalPropertiesContext } from "./Context/GlobalProperitesContext";
// import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import "./WorkSpace.css";
// import { useCollection } from "../../hooks/useCollection";
// export default function EditWorkSpace() {
  
//   const [background, setBackground] = useState(null);
//   const [image, setImage] = useState(null);
//   const [globalProperties, setGlobalProperties] = useState({});
//   const [isOpen, setIsOpen] = useState(true);
//   const fabricRef = useRef(null);

//   return (
//     <BackgroundContext.Provider value={{ background, setBackground, image, setImage }}>
//       <GlobalPropertiesContext.Provider value={{ globalProperties, setGlobalProperties }}>
//         <SaveModal isOpen={isOpen} setIsOpen={() => setIsOpen(true)} />
//         <div className="add-creator-container d-flex h-100">
          
//           <div className="add-preview-container d-flex flex-column h-100 w-100">
//             <div className="w-100 d-flex z-index-1000">
//               <WorkSpaceNavbar />
//             </div>
//             {background && (            
//             <TransformWrapper minScale={0.1} initialScale={1} panning={{disabled: true}} centerOnInit>
//               <TransformComponent>
//             <div className="w-100 h-100">
            
//                 <div className="add-preview-container d-flex flex-column h-100 w-100 align-items-center justify-content-center">
//                   <div className="d-flex h-100 w-100 align-items-center justify-content-center">
//                     <Canvas fabricRef={fabricRef} />
//                   </div>
//                 </div>
//           </div>
//            </TransformComponent>
//               </TransformWrapper>
//             )}
//         </div>
        
//           <div className="add-workspace-container">
//             <EditPanel fabricRef={fabricRef} setIsOpen={() => setIsOpen(false)} />
//           </div>
//         </div>
//       </GlobalPropertiesContext.Provider>
//     </BackgroundContext.Provider>
//   );
// }
