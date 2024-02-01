import { NavDropdown } from "react-bootstrap";
import Modals from "./navbar/Modals";
import { useState } from "react";

export default function WorkSpaceNavbar({ setHelpLinesModal, helpLinesModal }) {
  const [modalIndex, setModalIndex] = useState(0);
  const array = [
    { label: "obszar roboczy", options: [{ name: "do GIFów", onClick: null }] },
    {
      label: "Opcje",
      options: [
        { name: "Dodaj linię pomocniczą", onClick: () => setHelpLinesModal(!helpLinesModal) },
        { name: "Dodaj czcionkę", onClick: () => setModalIndex(1) },
      ],
    },
  ];

  return (
    <div className=" nav-container w-100 bg-light">
      {modalIndex !== 0 && <Modals modalIndex={modalIndex} setModalIndex={setModalIndex} />}
      <div className="collapse navbar-collapse d-flex flex-row w-100">
        <div className="navbar-nav d-flex flex-row ml-5" style={{ marginLeft: "20px" }}>
          {array.map((item, i) => (
            <NavDropdown key={i} className="ml-5" title={item.label}>
              {item?.options?.map((option) => (
                <NavDropdown.Item onClick={option?.onClick}>{option?.name}</NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </div>
      </div>
    </div>
  );
}
