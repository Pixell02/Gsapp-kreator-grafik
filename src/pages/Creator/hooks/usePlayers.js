import { useEffect, useState } from "react";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";

const usePlayers = (Players) => {
  const [playerOptions, setPlayerOptions] = useState([]);

  const { documents: LicensedPlayers } = useTeamLicenseCollection("Players");

  useEffect(() => {
    if (Players) {
      const options = Players.map((player) => ({
        label: player.number + "." + player.firstName + "." + player.secondName,
        value: player,
      }));
      setPlayerOptions([...options]);
    }
    if (LicensedPlayers) {
      const options = LicensedPlayers?.map((item) => ({
        label: item.number + "." + item.firstName + "." + item.secondName,
        value: item,
      }));
      setPlayerOptions((prev) => [prev, ...options]);
    }
  }, [Players, LicensedPlayers]);

  return playerOptions;
};

export default usePlayers;
