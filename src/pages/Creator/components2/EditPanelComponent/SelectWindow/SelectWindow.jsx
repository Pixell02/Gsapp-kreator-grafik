import StartingPlayers from './components/StartingPlayers';
import ReservePlayers from './components/ReservePlayers';
import MultiElements from './components/MultiElements';

const SelectWindow = ({ isModalOpen, setIsModalOpen, fabricRef, coords, setSelectedMatch, selectedMatch }) => {
  const handleClick = () => {
    setIsModalOpen({ id: null, open: false });
    setSelectedMatch(null);
  };

  return (
    <div>
      {coords?.playerOne && (
        <StartingPlayers
          fabricRef={fabricRef}
          coords={coords}
          isModalOpen={isModalOpen}
        />
      )}
      {coords?.reserveOne && (
        <ReservePlayers
          fabricRef={fabricRef}
          coords={coords}
          isModalOpen={isModalOpen}
        />
      )}
      {isModalOpen.id === 3 && (
        <MultiElements
          fabricRef={fabricRef}
          coords={coords}
          selectedMatch={selectedMatch}
        />
      )}
      <button
        className="w-100 btn mt-5"
        onClick={() => handleClick()}>
        Zamknij
      </button>
    </div>
  );
};

export default SelectWindow;
