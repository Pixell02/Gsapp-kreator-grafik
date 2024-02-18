import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useTeamContext } from "../../Creator/context/teamContext";
import { SelectPlayer, SquadPreset } from "../../../types/teamTypes";

const useSquadPreset = (data?: SquadPreset) => {
  const { user } = useAuthContext();
  const [squadPreset, setSquadPreset] = useState<SquadPreset>({
    presetName: data?.presetName || "skład",
    capitan: data?.capitan || null,
    goalkeeper: data?.goalkeeper || null,
    squadPlayers: data?.squadPlayers || [],
    reservePlayers: data?.reservePlayers || [],
    uid: user.uid,
  });
  const { selectedPlayers, setSelectedPlayers, selectedReserve, setSelectedReserve } = useTeamContext();
  const [playerSelect, setPlayerSelect] = useState<{ label: string; value: string }[]>([]);
  const [capitanId, setCapitanId] = useState<string>("");
  const [goalkeeperId, setGoalkeeperId] = useState<string>("");

  useEffect(() => {
    if (!data) return;
    setSelectedPlayers(data.squadPlayers);
    setSelectedReserve(data.reservePlayers);
    setCapitanId(data?.capitan?.id as string);
    setGoalkeeperId(data?.goalkeeper?.id as string);
  }, [data]);

  useEffect(() => {
    const option = (selectedPlayers as SelectPlayer[])?.map((player) => ({
      label: player.number || "" + " " + player.firstName + " " + player.secondName,
      value: player.id as string,
    }));
    setPlayerSelect(option);
    setSquadPreset((prev) => ({ ...prev, squadPlayers: selectedPlayers }));
  }, [selectedPlayers]);

  useEffect(() => {
    setSquadPreset((prev) => ({ ...prev, reservePlayers: selectedReserve }));
  }, [selectedReserve]);

  const handleSelectedValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = e.target;
    const player = (selectedPlayers as SelectPlayer[]).find((player) => value === player.id);

    setSquadPreset((prev) => ({ ...prev, [id]: { ...player } }));
    if (id === "capitan") {
      setCapitanId(value);
    } else if (id === "goalkeeper") {
      setGoalkeeperId(value);
    }
  };

  const handleValueChange = (value: string, className: string) => {
    setSquadPreset((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  return {
    squadPreset,
    setSquadPreset,
    handleValueChange,
    playerSelect,
    capitanId,
    goalkeeperId,
    handleSelectedValueChange,
    setSelectedPlayers,
    setSelectedReserve,
  };
};

export default useSquadPreset;
