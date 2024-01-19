import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useTextLayer from "../components2/EditPanelComponent/SingleElements/hooks/useTextLayer";
import useImageLayer from "./useImageLayer";
import { useRadioContext } from "../context/radioContext";
import { SingleValue } from "react-select";
import { Image, Text } from "fabric/fabric-impl";
import useFetch from "../../../hooks/useFetch";
import { Opponent } from "../context/CalendarContext";

type options = {
  label: string;
  value: Opponent;
};

const useOpponentFabricObject = (coords: DocumentData, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [selectedOption, setSelectedOption] = useState<options | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Opponent | null>(null);
  const { image } = useFetch(selectedTeam?.img);
  const { setImage, imageObject: crest } = useImageLayer(coords.opponentImage, fabricRef);
  const { setTextValue: setFirstName, textObject: firstName } = useTextLayer(coords.opponentFirstName, fabricRef);
  const { setTextValue: setSecondName, textObject: secondName } = useTextLayer(coords.opponentSecondName, fabricRef);
  const { setTextValue: setFullName, textObject: fullName } = useTextLayer(coords.opponentName, fabricRef);
  const { radioChecked } = useRadioContext();

  const handleChange = (option: SingleValue<options>) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    setSelectedTeam(selectedOption?.value as Opponent);
  }, [selectedOption]);

  useEffect(() => {
    if (selectedTeam && coords.opponentFirstName) {
      setFirstName(selectedTeam.firstName);
    }
    if (selectedTeam && coords.opponentSecondName) {
      setSecondName(selectedTeam.secondName);
    }
    if (selectedTeam && coords.opponentName) {
      setFullName(selectedTeam.firstName + " " + selectedTeam.secondName);
    }
    if (selectedTeam && coords.opponentImage) {
      setImage(image || "");
    }
    fabricRef?.current.renderAll();
  }, [selectedTeam, image]);

  useEffect(() => {
    const updateText = (textType: Text | null, textCoords: DocumentData) => {
      if (textType && textCoords) {
        textType.set({
          top: textCoords.Top,
          left: textCoords.Left,
          fontSize: textCoords.FontSize,
          originX: textCoords.OriginX,
          originY: textCoords.OriginY,
        });
        fabricRef?.current.renderAll();
      }
    };
    const updateImage = (imageType: Image | null, imageCoords: DocumentData) => {
      if (imageType && imageCoords) {
        imageType.set({
          top: imageCoords.Top,
          left: imageCoords.Left,
        });
      }
      fabricRef?.current.renderAll();
    };

    updateText(firstName, radioChecked === "radio1" ? coords.opponentFirstName : coords.yourTeamFirstName);
    updateText(secondName, radioChecked === "radio1" ? coords.opponentSecondName : coords.yourTeamSecondName);
    updateText(fullName, radioChecked === "radio1" ? coords.opponentName : coords.yourTeamName);
    updateImage(crest, radioChecked === "radio1" ? coords.opponentImage : coords.yourTeamLogo);
  }, [coords, crest, fabricRef, firstName, fullName, radioChecked, secondName]);

  return { selectedTeam, handleChange, selectedOption, setSelectedTeam };
};

export default useOpponentFabricObject;
