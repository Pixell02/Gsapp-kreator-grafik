import ReactDOM from "react-dom";
import FontModal from "./FontModal";
import { Dispatch, SetStateAction } from "react";

type props = {
  modalIndex: number;
  setModalIndex: Dispatch<SetStateAction<number>>;
};

const Modals = ({ modalIndex, setModalIndex }: props) => {
  const modalsArray = [{ index: 1, component: <FontModal /> }];
  return ReactDOM.createPortal(
    <div className="active-modal">
      <div className="add-window">
        {modalsArray.map((item) => item.index === modalIndex && item.component)}
        <div className="button-container d-flex w-100 justify-content-end mt-5">
          <button className="btn" onClick={() => setModalIndex(0)}>
            Zamknij
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Modals;
