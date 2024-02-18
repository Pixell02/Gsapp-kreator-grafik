import React, { useEffect, useState } from "react";
import { useTeamContext } from "../../../../context/teamContext";
import useTextboxLayer from "../../../../hooks/useTextboxLayer";
import { useCalendarContext } from "../../../../context/CalendarContext";
import { Player } from "../../../../../../types/teamTypes";
import { Textbox } from "../../../../../../types/globalPropertiesTypes";

const useSquadFabricObject = (fabricRef: React.MutableRefObject<fabric.Canvas>, coords: Textbox) => {
  const { setTextValue } = useTextboxLayer(coords, fabricRef);
  const { selectedPlayers, selectedPreset } = useTeamContext();
  const { calendarData } = useCalendarContext();
  const [capitan, setCapitan] = useState<Player | null>(null);
  const [goalKeeper, setGoalKeeper] = useState<Player | null>(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  useEffect(() => {
    if (!selectedPreset) return;
    if (selectedPreset.capitan) {
      setCapitan(selectedPreset.capitan);
    }
    if (selectedPreset.goalKeeper) {
      setGoalKeeper(selectedPreset.goalKeeper);
    }
  }, [selectedPreset]);

  useEffect(() => {
    if (calendarData?.capitan) {
      setCapitan(calendarData.capitan);
    }
    if (calendarData?.goalKeeper) {
      setGoalKeeper(calendarData.goalKeeper);
    }
  }, [calendarData]);

  useEffect(() => {
    const handleFormatPlayers = (selectedPlayers: Player[]) => {
      let text: string = "";
      if (!selectedPlayers || selectedPlayers.length === 0) return;
      selectedPlayers.forEach((player) => {
        let formatPlayer: string | null = "";
        if (coords.format === "NumDotSurName" || coords.Format === "NumDotSurName") {
          formatPlayer = (player.number ? player.number + "." : "") + player.secondName;
        } else if (coords.format === "NumSurName" || coords.Format === "NumSurName") {
          formatPlayer = (player.number ? player.number : "") + " " + player.secondName;
        } else if (coords.format === "dotted" || coords.Format === "dotted") {
          formatPlayer = (player.number ? player.number + "." : "") + player.firstName[0] + "." + player.secondName;
        } else if (coords.format === "oneDot" || coords.Format === "oneDot") {
          formatPlayer = (player.number ? player.number : "") + " " + player.firstName[0] + "." + player.secondName;
        } else {
          formatPlayer = player.secondName;
        }
        if (player.age && currentYear - player.age <= 21) {
          formatPlayer += " (m)";
        }
        if (
          (goalKeeper?.number || "") + " " + goalKeeper?.firstName + " " + goalKeeper?.secondName ===
          (player.number || "") + " " + player.firstName + " " + player.secondName
        ) {
          formatPlayer += " (gk)";
        }
        if (
          (capitan?.number || "") + " " + capitan?.firstName + " " + capitan?.secondName ===
          (player.number || "") + " " + player.firstName + " " + player.secondName
        ) {
          formatPlayer += " (c)";
        }
        text = text + " " + formatPlayer + "\n";
      });
      setTextValue(text);
      fabricRef?.current.renderAll();
    };
    handleFormatPlayers(selectedPlayers?.length > 0 ? selectedPlayers : selectedPreset?.squadPlayers);
  }, [selectedPlayers, selectedPreset, capitan, goalKeeper]);

  return { selectedPlayers, setCapitan, setGoalKeeper };
};

export default useSquadFabricObject;
