import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { Player } from "../../../types/playerAndSquadTypes";

const usePlayers = () => {
  const { user } = useAuthContext();
  const { documents: players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: LicensedPlayers } = useTeamLicenseCollection("Players");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[] | null>(null);
  const [licensedPlayers, setLicensedPlayers] = useState<Player[] | null>(null);

  useEffect(() => {
    if (!players?.length) return;
    const filteredPlayers = players.map(
      (player) =>
        ({
          ...player,
          img: Array.isArray(player.img) && player.img.length > 0 ? player.img[0].src : player.img,
        } as Player)
    );

    setFilteredPlayers(filteredPlayers);
    if (!LicensedPlayers?.length) return;
    const filteredLicensedPlayers = LicensedPlayers.map(
      (player: Player) =>
        ({
          ...player,
          img: Array.isArray(player.img) && player.img.length > 0 ? player.img[0].src : player.img,
        } as Player)
    );
    setLicensedPlayers(filteredLicensedPlayers);
  }, [players, LicensedPlayers]);

  return { filteredPlayers, licensedPlayers, players, LicensedPlayers };
};

export default usePlayers;
