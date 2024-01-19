import { useEffect, useState } from "react";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";

const usePlayers = (playersImage) => {
  const [playerOptions, setPlayerOptions] = useState([]);
  const { user } = useAuthContext();
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: LicensedPlayers } = useTeamLicenseCollection("Players");

  useEffect(() => {
    const options = [];
    Players?.map((player) => {
      if (playersImage) {
        if (typeof player.img === "string") {
          options.push({
            label: player.firstName + " " + player.secondName,
            value: { ...player },
          });
        } else {
          player.img?.map((item) => {
            options.push({
              label:
                player.firstName +
                " " +
                player.secondName +
                (item.type === "celebration" && item.src ? " (cieszynka)" : ""),
              value: { ...player, img: item.src },
            });
          });
        }
      } else {
        options.push({
          label: player.firstName + " " + player.secondName,
          value: { ...player },
        });
      }
    });
    LicensedPlayers?.forEach((player) => {
      options.push({
        label: player.firstName + " " + player.secondName,
        value: { ...player },
      });
    });
    setPlayerOptions(options);
  }, [Players, LicensedPlayers]);

  return playerOptions;
};

export default usePlayers;
