import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useFetch from "../../../hooks/useFetch";
import useImageLayer from "./useImageLayer";
import useTextLayer, { textCoordsProps } from "../components2/EditPanelComponent/SingleElements/hooks/useTextLayer";
import { useCalendarContext } from "../context/CalendarContext";

type Player = {
  firstName: string;
  secondName: string;
  img: string;
};

type ImageProps = {
  Top: number;
  Left: number;
  Angle?: number;
  ScaleToWidth: number;
  ScaleToHeight: number;
};

const usePlayerFabricObject = (
  playerCoords: DocumentData,
  playerImageCoords: DocumentData,
  i: number,
  fabricRef: React.MutableRefObject<fabric.Canvas>
) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { textObject: playerName } = useTextLayer(playerCoords as textCoordsProps, fabricRef);
  const { image: playerImg } = useFetch(selectedPlayer?.img);
  const { setImage, imageObject } = useImageLayer(playerImageCoords as ImageProps, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isLoaded) return;
    if (calendarData?.player) {
      setSelectedPlayer(calendarData.player[i]);
      setIsLoaded(true);
    }
  }, [calendarData]);
  useEffect(() => {
    if (!selectedPlayer) return;
    if (!calendarData?.player) return setCalendarData({ ...calendarData, player: [] });
    const newPlayer = calendarData.player;
    newPlayer[i] = { ...selectedPlayer };
    setCalendarData({ ...calendarData, player: newPlayer });
  }, [selectedPlayer]);

  useEffect(() => {
    if (!playerImg) return;
    else {
      setImage(playerImg);
      if (!imageObject) return;
      imageObject.set("originY", playerImageCoords.originY || "center");
      fabricRef.current.renderAll();
    }
  }, [selectedPlayer, playerImg]);

  useEffect(() => {
    if (!playerName) return;
    const handleFormatName = (selectedPlayer: Player) => {
      let formatPlayer: string = "";
      if (playerCoords.format === "dotted") {
        formatPlayer = selectedPlayer.firstName[0] + "." + selectedPlayer.secondName;
      } else if (playerCoords.format === "nameSurName") {
        formatPlayer = selectedPlayer.firstName + " " + selectedPlayer.secondName;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formatPlayer = selectedPlayer.secondName;
      }
      playerName.set("text", formatPlayer);
      fabricRef.current.renderAll();
    };
    if (!selectedPlayer) return;
    handleFormatName(selectedPlayer);
  }, [selectedPlayer, playerName]);

  return { setSelectedPlayer, playerName, imageObject };
};

export default usePlayerFabricObject;
