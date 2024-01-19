import { useEffect, useState } from "react";
import useFetch from "../../../../../../../../hooks/useFetch";
import useTeamOption from "./useTeamOption";
import useMultiplyTextLayer from "./useMultiplyTextLayer";
import useMultiplyImageLayer from "./useMultiplyImageLayer";
import useProperties from "./useProperties";

const useSelectTeams = (coords, i, fabricRef) => {
  const teamOption = useTeamOption();
  const { properties } = useProperties(coords);
  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { image: hostLogo } = useFetch(selectedHost?.value);
  const { image: guestLogo } = useFetch(selectedGuest?.value);
  const { setTextValue: setHostName } = useMultiplyTextLayer(coords.yourTeamNameOne, i, properties, fabricRef);
  const { setImage: setHostLogo } = useMultiplyImageLayer(coords.yourTeamLogoOne, i, properties, fabricRef);
  const { setTextValue: setGuestName } = useMultiplyTextLayer(coords.yourOpponentNameOne, i, properties, fabricRef);
  const { setImage: setGuestLogo } = useMultiplyImageLayer(coords.opponentImageOne, i, properties, fabricRef);
  const { setTextValue: setConnectedTeam } = useMultiplyTextLayer(coords.connectedTeams, i, properties, fabricRef);
  useEffect(() => {
    if (!selectedHost) return;
    if (coords.yourTeamNameOne) {
      setHostName(selectedHost.label);
    }
  }, [selectedHost]);
  useEffect(() => {
    if (coords.yourTeamLogoOne) {
      setHostLogo(hostLogo || "");
    }
  }, [hostLogo]);

  useEffect(() => {
    if (!selectedGuest) return;
    if (coords.yourOpponentNameOne) {
      setGuestName(selectedGuest.label);
    }
  }, [selectedGuest]);

  useEffect(() => {
    if (coords.opponentImageOne) {
      setGuestLogo(guestLogo || "");
    }
  }, [guestLogo]);

  useEffect(() => {
    if (coords.connectedTeams && (selectedHost || selectedGuest)) {
      const label = selectedHost ? selectedHost.label : "";
      const guestLabel = selectedGuest ? " - " + selectedGuest.label : "";
      setConnectedTeam(label + guestLabel);
    }
  }, [selectedHost, selectedGuest]);

  return { teamOption, setSelectedHost, setSelectedGuest, selectedGuest, selectedHost };
};

export default useSelectTeams;
