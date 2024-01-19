import StartingPlayers from "./components/StartingPlayers";
import ReservePlayers from "./components/ReservePlayers";
import MultiElements from "./components/MultiElements";
import { DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

type Modal = {
  id: number | null;
  open: boolean;
};

type componentProps = {
  isModalOpen: Modal;
  setIsModalOpen: Dispatch<SetStateAction<Modal>>;
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: DocumentData;
  setSelectedMatch: (value: number | null) => void;
  selectedMatch: number | null;
};

const SelectWindow = ({
  isModalOpen,
  setIsModalOpen,
  fabricRef,
  coords,
  setSelectedMatch,
  selectedMatch,
}: componentProps) => {
  const handleClick = () => {
    setIsModalOpen({ id: null, open: false });
    setSelectedMatch(null);
  };
  const componentsArray = Array.from({ length: coords.numberOfMatches }, (_, i) => i + 1);
  return (
    <div>
      {coords?.playerOne && <StartingPlayers fabricRef={fabricRef} coords={coords} isModalOpen={isModalOpen} />}
      {coords?.reserveOne && <ReservePlayers fabricRef={fabricRef} coords={coords} isModalOpen={isModalOpen} />}
      {componentsArray.map((i) => (
        <div key={i} className={isModalOpen.id === 3 && selectedMatch === i ? "" : "d-none"}>
          <MultiElements fabricRef={fabricRef} i={i} coords={coords} selectedMatch={selectedMatch} />
        </div>
      ))}

      <button className="w-100 btn mt-5" onClick={() => handleClick()}>
        Zamknij
      </button>
    </div>
  );
};

export default SelectWindow;
