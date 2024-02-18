import React, { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { fabric } from "fabric";
import { useRadioContext } from "../context/radioContext";
import useTextLayer from "../components2/EditPanelComponent/SingleElements/hooks/useTextLayer";
import useFetch from "../../../hooks/useFetch";
import useImageLayer from "./useImageLayer";
import { Image, Text } from "fabric/fabric-impl";
import { useCalendarContext } from "../context/CalendarContext";
import { Team } from "../../../types/teamTypes";
import { Coords } from "../../../types/creatorComponentsTypes";
import { Image as FabricImage, Text as FabricText } from "../../../types/globalPropertiesTypes";

type options = {
  label: string;
  value: Team;
  src: string;
};

const useTeamFabricObject = (coords: Coords, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { calendarData } = useCalendarContext();
  const { image } = useFetch((calendarData?.selectedTeam?.img as string) || (selectedTeam?.img as string));
  const { setImage, imageObject: crest } = useImageLayer(coords.yourTeamLogo as FabricImage, fabricRef);
  const { setTextValue: setFirstName, textObject: firstName } = useTextLayer(
    coords.yourTeamFirstName as FabricText,
    fabricRef
  );
  const { setTextValue: setSecondName, textObject: secondName } = useTextLayer(
    coords.yourTeamSecondName as FabricText,
    fabricRef
  );
  const { setTextValue: setFullName, textObject: fullName } = useTextLayer(
    coords.yourTeamName as FabricText,
    fabricRef
  );
  const { radioChecked } = useRadioContext();
  const handleChange = (option: SingleValue<options>) => {
    setSelectedTeam(option?.value as Team);
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
    if (!fabricRef?.current._objects) return;

    updateText(firstName, radioChecked === "radio1" ? coords.yourTeamFirstName : coords.opponentFirstName);
    updateText(secondName, radioChecked === "radio1" ? coords.yourTeamSecondName : coords.opponentSecondName);
    updateText(fullName, radioChecked === "radio1" ? coords.yourTeamName : coords.opponentName);
    updateImage(crest, radioChecked === "radio1" ? coords.yourTeamLogo : coords.opponentImage);
  }, [coords, crest, fabricRef, firstName, fullName, radioChecked, secondName]);

  return { selectedTeam, handleChange };
};
export default useTeamFabricObject;
