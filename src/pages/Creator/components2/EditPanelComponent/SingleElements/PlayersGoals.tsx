import usePlayers from "../../../hooks/usePlayers";
import { DocumentData } from "firebase/firestore";
import usePlayerGoals, { GoalProps } from "../../../hooks/usePlayerGoals";
import HostGoal from "./HostGoal";
import { SingleValue } from "react-select";
import GuestGoal from "./GuestGoal";

type componentProps = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: DocumentData;
};
type playerProps = {
  firstName: string;
  number: string;
  secondName: string;
};
type options = {
  label: string;
  value: playerProps | undefined;
};

type stringProps = {
  time: string;
  player: string;
};

export default function PlayersGoals({ fabricRef, coords }: componentProps) {
  const playerOptions = usePlayers();
  const { selectedPlayers: hostPlayers, setSelectedPlayers: setHostPlayers } = usePlayerGoals(
    coords.yourPlayerOneGoal,
    fabricRef
  );
  const { selectedPlayers: guestPlayers, setSelectedPlayers: setGuestPlayers } = usePlayerGoals(
    coords.opponentPlayerOneGoal,
    fabricRef
  );

  const handleIncrease = (type: string) => {
    const newGoal = type === "host" ? [...hostPlayers] : [...guestPlayers];
    newGoal.push({ player: "", time: "" });
    if (type === "host") setHostPlayers(newGoal);
    else setGuestPlayers(newGoal);
  };

  const handleSelectChange = (option: SingleValue<options>, i: number) => {
    const newPlayer: GoalProps[] = [...hostPlayers];
    newPlayer[i].player = option?.value as playerProps;
    setHostPlayers(newPlayer);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, type: string) => {
    const { value } = e.target;
    const newGoal = type === "host" ? [...hostPlayers] : [...guestPlayers];
    newGoal[i].time = value;
    if (type === "host") setHostPlayers(newGoal);
    else setGuestPlayers(newGoal);
  };
  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    const newGoal = [...guestPlayers];
    newGoal[i].player = value;
    setGuestPlayers(newGoal);
  };

  return (
    <div>
      {hostPlayers.map((player, i) => (
        <HostGoal
          handleValueChange={handleValueChange}
          handleSelectChange={handleSelectChange}
          player={player}
          playerOptions={playerOptions}
          key={i}
          i={i}
        />
      ))}
      <button className="btn w-100 mt-5" onClick={() => handleIncrease("host")}>
        Dodaj
      </button>
      {guestPlayers.map((player, i) => (
        <GuestGoal
          key={i}
          player={player as stringProps}
          i={i}
          handlePlayerChange={handlePlayerChange}
          handleValueChange={handleValueChange}
        />
      ))}
      <button className="btn w-100 mt-5" onClick={() => handleIncrease("guest")}>
        Dodaj
      </button>
    </div>
  );
}
