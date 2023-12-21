import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import SaveThemeModal from "../components/SaveThemeModal";
import SaveModal from "./SaveModal";
import UpdateModal from "./UpdateModal";
import UpdateThemeModal from "../components/UpdateThemeModal";

type ModalProps = {
  setIsOpen: (value: boolean) => void;
};

type OptionType = {
  label: string;
  value: string;
};

const Modal: React.FC<ModalProps> = ({ setIsOpen }: ModalProps) => {
  const { id } = useParams();
  const options: OptionType[] = [
    { label: "motyw", value: "theme" },
    { label: "grafika indywidualna", value: "individual" },
  ];
  const path = window.location.pathname.split("/")[3];
  const [type, setType] = useState<OptionType | null>(null);

  return (
    <div className="active-modal">
      <div className="modal-window rounded">
        <div className="p-3 d-flex flex-column h-100 w-100">
          {!id ? (
            <>
              <label>Typ</label>
              <Select options={options} value={type} onChange={(option) => setType(option as OptionType)} />
              {type?.value === "theme" && <SaveThemeModal setIsOpen={setIsOpen} />}
              {type?.value === "individual" && <SaveModal setIsOpen={setIsOpen} />}
            </>
          ) : (
            <>{path !== "theme" ? <UpdateModal setIsOpen={setIsOpen} /> : <UpdateThemeModal setIsOpen={setIsOpen} />}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
