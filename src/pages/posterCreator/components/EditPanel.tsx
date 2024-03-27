import "../WorkSpace.css";
import { useAddBackground } from "./hooks/useAddBackground";
import Layers from "./Layers";
import Properties from "./Properties";
import MultiProperties from "./MultiProperties";
import { useGlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { FabricRef, FabricReference } from "../../../types/creatorComponentsTypes";

type props = {
  fabricRef: FabricRef;
  setIsOpen: () => void;
};

export default function EditPanel({ fabricRef, setIsOpen }: props) {
  const { handleAddBackground, onButtonClick, fileInputRef } = useAddBackground();

  const { isMany } = useGlobalPropertiesContext();
  return (
    <div className=" mt-3 h-100 w-100 z-index-100">
      <div className="w-100 d-flex justify-content-around">
        <button onClick={onButtonClick} className="btn ml-5">
          Dodaj tło
        </button>
        <button onClick={setIsOpen} className="btn ">
          Zapisz
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image"
          onChange={handleAddBackground}
        />
      </div>
      <div className="add-properties-container ml-5 pt-2">
        <p>Właściwości</p>
        <Properties fabricRef={fabricRef as FabricReference} />
      </div>
      {isMany && (
        <div className="ml-5 mt-5">
          <p>Właściwości wielo meczowe</p>
          <MultiProperties fabricRef={fabricRef as FabricReference} />
        </div>
      )}

      <div className="add-layers-container ml-5 mt-5">
        <p>Warstwy</p>
        <Layers fabricRef={fabricRef as FabricReference} />
      </div>
    </div>
  );
}
