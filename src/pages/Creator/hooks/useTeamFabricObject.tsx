import React, { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { fabric } from "fabric";
import { DocumentData } from "firebase/firestore";
import { useRadioContext } from "../context/radioContext";
import useTextLayer from "../components2/EditPanelComponent/SingleElements/hooks/useTextLayer";
import useFetch from "../../../hooks/useFetch";
import useImageLayer from "./useImageLayer";
import { Image, Text } from "fabric/fabric-impl";
import { useCalendarContext } from "../context/CalendarContext";

type SelectedTeam = {
  firstName: string;
  secondName: string;
  img: string;
  team: string;
  uid: string;
};

type options = {
  label: string;
  value: SelectedTeam;
  src: string;
};

const useTeamFabricObject = (coords: DocumentData, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam | null>(null);
  const { calendarData } = useCalendarContext();
  const { image } = useFetch(calendarData?.selectedTeam?.img || selectedTeam?.img);
  const { setImage, imageObject: crest } = useImageLayer(coords.yourTeamLogo, fabricRef);
  const { setTextValue: setFirstName, textObject: firstName } = useTextLayer(coords.yourTeamFirstName, fabricRef);
  const { setTextValue: setSecondName, textObject: secondName } = useTextLayer(coords.yourTeamSecondName, fabricRef);
  const { setTextValue: setFullName, textObject: fullName } = useTextLayer(coords.yourTeamName, fabricRef);
  const { radioChecked } = useRadioContext();
  const handleChange = (option: SingleValue<options>) => {
    setSelectedTeam(option?.value as SelectedTeam);
  };
  useEffect(() => {
    if (calendarData?.selectedTeam) {
      setSelectedTeam(calendarData.selectedTeam);
    }
  }, [calendarData]);

  useEffect(() => {
    if (!fabricRef?.current._objects) return;
    if (selectedTeam && coords.yourTeamFirstName) {
      setFirstName(selectedTeam.firstName);
    }
    if (selectedTeam && coords.yourTeamSecondName) {
      setSecondName(selectedTeam.secondName);
    }
    if (selectedTeam && coords.yourTeamName) {
      setFullName(selectedTeam.firstName + " " + selectedTeam.secondName);
    }
    if (selectedTeam && coords.yourTeamLogo) {
      setImage(image || "");
    }
  }, [fabricRef, selectedTeam, image]);

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
    if (!fabricRef?.current._objects) return;
    console.log(Object.keys(coords));
    updateText(firstName, radioChecked === "radio1" ? coords.yourTeamFirstName : coords.opponentFirstName);
    updateText(secondName, radioChecked === "radio1" ? coords.yourTeamSecondName : coords.opponentSecondName);
    updateText(fullName, radioChecked === "radio1" ? coords.yourTeamName : coords.opponentName);
    updateImage(crest, radioChecked === "radio1" ? coords.yourTeamLogo : coords.opponentImage);
  }, [coords, crest, fabricRef, firstName, fullName, radioChecked, secondName]);

  return { selectedTeam, handleChange };
};
export default useTeamFabricObject;
