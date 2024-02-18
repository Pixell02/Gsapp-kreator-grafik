import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";
import { useCalendarContext } from "../../../../context/CalendarContext";

const useSquadPlayers = () => {
  const { user } = useAuthContext();
  const [Players, setPlayers] = useState(null);
  const { documents: TeamPlayers } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: LicensedPlayers } = useTeamLicenseCollection("Players");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedReserve, setSelectedReserve] = useState([]);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isPlayersLoaded, setIsPlayersLoaded] = useState(false);
  const [isReserveLoaded, setIsReserveLoaded] = useState(false);
  useEffect(() => {
    if (isPlayersLoaded) return;
    if (calendarData?.selectedPlayers) {
      setSelectedPlayers(calendarData.selectedPlayers);
      setIsPlayersLoaded(true);
    }
  }, [calendarData]);
  useEffect(() => {
    if (isReserveLoaded) return;
    if (calendarData?.selectedReserve) {
      setSelectedReserve(calendarData.selectedReserve);
      setIsReserveLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    setCalendarData({ ...calendarData, selectedPlayers: selectedPlayers });
  }, [selectedPlayers]);
  useEffect(() => {
    setCalendarData({ ...calendarData, selectedReserve: selectedReserve });
  }, [selectedReserve]);
  useEffect(() => {
    if (TeamPlayers?.length > 0) {
      setPlayers([...TeamPlayers]);
    }
    if (LicensedPlayers?.length > 0) {
      setPlayers([...LicensedPlayers]);
    }
  }, [TeamPlayers, LicensedPlayers]);

  const handlePlayerChecked = (player) => {
    const { firstName, secondName, number } = player;
    const isSelected = selectedPlayers.some(
      (selectedPlayer) =>
        selectedPlayer.firstName === firstName &&
        selectedPlayer.secondName === secondName &&
        selectedPlayer.number === number
    );

    if (isSelected) {
      setSelectedPlayers((prevSelectedPlayers) =>
        prevSelectedPlayers.filter(
          (selectedPlayer) =>
            selectedPlayer.firstName !== firstName ||
            selectedPlayer.secondName !== secondName ||
            selectedPlayer.number !== number
        )
      );
    } else {
      if (selectedPlayers.length !== 11) {
        setSelectedPlayers((prevSelectedPlayers) => [...prevSelectedPlayers, { ...player }]);
      }
    }
  };
  const handleReserveChecked = (reserve) => {
    const { firstName, secondName, number } = reserve;
    const isSelected = selectedReserve.some(
      (selectedReserve) =>
        selectedReserve.firstName === firstName &&
        selectedReserve.secondName === secondName &&
        selectedReserve.number === number
    );

    if (isSelected) {
      setSelectedReserve((prev) =>
        prev.filter(
          (selectedReserve) =>
            selectedReserve.firstName !== firstName ||
            selectedReserve.secondName !== secondName ||
            selectedReserve.number !== number
        )
      );
    } else {
      if (selectedReserve.length !== 9) {
        setSelectedReserve((prev) => [...prev, { ...reserve }]);
      }
    }
  };

  return {
    Players,
    selectedPlayers,
    handlePlayerChecked,
    handleReserveChecked,
    selectedReserve,
    setSelectedPlayers,
    setSelectedReserve,
  };
};

export default useSquadPlayers;
