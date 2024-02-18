import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useTextLayer from "../components2/EditPanelComponent/SingleElements/hooks/useTextLayer";
import useImageLayer from "./useImageLayer";
import { useRadioContext } from "../context/radioContext";
import { SingleValue } from "react-select";
import { Image, Text } from "fabric/fabric-impl";
import useFetch from "../../../hooks/useFetch";
import { Opponent } from "../../../types/teamTypes";
import { Coords } from "../../../types/creatorComponentsTypes";
import { Image as FabricImage, Text as FabricText } from "../../../types/globalPropertiesTypes";

type options = {
  label: string;
  value: Opponent;
};

const useOpponentFabricObject = (coords: Coords, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [selectedOption, setSelectedOption] = useState<options | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Opponent | null>(null);
  const { image } = useFetch(selectedTeam?.img as string);
  const { setImage, imageObject: crest } = useImageLayer(coords.opponentImage as FabricImage, fabricRef);
  const { setTextValue: setFirstName, textObject: firstName } = useTextLayer(
    coords.opponentFirstName as FabricText,
    fabricRef
  );
  const { setTextValue: setSecondName, textObject: secondName } = useTextLayer(
    coords.opponentSecondName as FabricText,
    fabricRef
  );
  const { setTextValue: setFullName, textObject: fullName } = useTextLayer(
    coords.opponentName as FabricText,
    fabricRef
  );
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
    const updateText = (textType: Text | null, textCoords: FabricText | undefined) => {
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
    const updateImage = (imageType: Image | null, imageCoords: FabricImage | undefined) => {
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
