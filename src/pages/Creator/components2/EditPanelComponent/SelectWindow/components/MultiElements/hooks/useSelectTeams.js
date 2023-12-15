import { useEffect, useState } from "react";
import useFetch from "../../../../../../../../hooks/useFetch";
import useAddMultiplyImageAndText from "./useAddMultiplyImageAndText";
import useTeamOption from "./useTeamOption";

const useSelectTeams = (fabricRef, coords, selectedMatch) => {
  const teamOption = useTeamOption();
  const [properties] = useState({
    Margin: coords.Margin,
    orientation: coords.orientation,
  });

  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { image: hostLogo } = useFetch(selectedHost?.value);
  const { image: guestLogo } = useFetch(selectedGuest?.value);

  const { handleAddImage, handleAddText } = useAddMultiplyImageAndText(
    fabricRef,
    selectedMatch,
    properties
  );

  useEffect(() => {
    if (coords.yourTeamLogoOne && selectedHost)
      handleAddImage(coords.yourTeamLogoOne, hostLogo);
    if (coords.yourTeamNameOne && selectedHost)
      handleAddText(coords.yourTeamNameOne, selectedHost.label);
  }, [
    selectedHost,
    hostLogo,
    coords.yourTeamLogoOne,
    coords.yourTeamNameOne,
    handleAddImage,
    handleAddText,
  ]);

  useEffect(() => {
    if (coords.yourOpponentNameOne && selectedGuest)
      handleAddText(coords.yourOpponentNameOne, selectedGuest.label);
    if (coords.opponentImageOne && selectedGuest)
      handleAddImage(coords.opponentImageOne, guestLogo);
  }, [
    selectedGuest,
    coords.yourOpponentNameOne,
    coords.opponentImageOne,
    handleAddImage,
    handleAddText,
    guestLogo,
  ]);
  useEffect(() => {
    if (coords.connectedTeams && (selectedHost || selectedGuest)) {
      const label = selectedHost ? selectedHost.label : "";
      const guestLabel = selectedGuest ? " - " + selectedGuest.label : "";
      handleAddText(coords.connectedTeams, label + guestLabel);
    }
  }, [coords.connectedTeams, selectedHost, selectedGuest, handleAddText]);

  return { teamOption, setSelectedHost, setSelectedGuest };
};

export default useSelectTeams;
