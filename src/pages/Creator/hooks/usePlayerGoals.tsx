import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { Textbox } from "fabric/fabric-impl";
import useTextboxLayer from "./useTextboxLayer";
import { Textbox as FabricTextbox } from "../../../types/globalPropertiesTypes";
import { Goal } from "../../../types/creatorComponentsTypes";

const usePlayerGoals = (coords: FabricTextbox, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Goal[]>([{ player: "", time: "" }]);
  const { textboxObject } = useTextboxLayer(coords, fabricRef);

  useEffect(() => {
    if (!textboxObject) return;

    const handleFormatText = (players: Goal[]) => {
      let text: string = "";
      players.forEach((player) => {
        if (typeof player.player === "object") {
          text += (player.time ? player.time + "' " : "") + player.player.secondName + "\n";
        } else {
          text += (player.time ? player.time + "' " : "") + player.player + "\n";
        }
      });
      textboxObject.set("text", text);
      fabricRef?.current.renderAll();
    };
    const handleFontSizeChange = (showPlayer: Textbox) => {
      showPlayer.set("fontSize", coords.FontSize);
      if (showPlayer.height && showPlayer.height >= coords.Height) {
        showPlayer.scaleToHeight(coords.Height);
      }
      let maxWidth = 0;

      showPlayer._textLines.forEach((_, i) => {
        const width = showPlayer.getLineWidth(i);
        maxWidth = Math.max(maxWidth, width);
      });
      while (maxWidth > coords.ScaleToWidth - 20) {
        const fontSize = showPlayer.get("fontSize");
        if (!fontSize) return;
        showPlayer.set("fontSize", fontSize - 1);

        maxWidth = 0;
        showPlayer._textLines.forEach((_, i) => {
          const width = showPlayer.getLineWidth(i);
          maxWidth = Math.max(maxWidth, width);
        });
      }

      fabricRef?.current.renderAll();
    };

    handleFormatText(selectedPlayers);
    handleFontSizeChange(textboxObject);
  }, [selectedPlayers, textboxObject, fabricRef]);

  return { selectedPlayers, setSelectedPlayers };
};

export default usePlayerGoals;
