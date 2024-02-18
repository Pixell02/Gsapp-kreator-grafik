import React, { useEffect } from "react";
import { useTeamContext } from "../../../../context/teamContext";
import useTextboxLayer from "../../../../hooks/useTextboxLayer";
import { Textbox } from "../../../../../../types/globalPropertiesTypes";

type Player = {
  format: string;
  number?: string;
  firstName: string;
  secondName: string;
  age: number;
};

const useReserveFabricObject = (fabricRef: React.MutableRefObject<fabric.Canvas>, coords: Textbox) => {
  const { setTextValue } = useTextboxLayer(coords, fabricRef);
  const { selectedReserve, selectedPreset } = useTeamContext();
  useEffect(() => {
    const handleReserveFormat = (selectedReserve: Player[]) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      let text: string = "";
      if (!selectedReserve || selectedReserve.length === 0) return;
      selectedReserve.forEach((reserved) => {
        let reserve = "";
        if (coords.format === "NumDotSurName" || coords.Format === "NumDotSurName") {
          reserve = (reserved.number || "") + "." + reserved.secondName;
        } else if (coords.format === "NumSurName" || coords.Format === "NumSurName") {
          reserve = (reserved.number || "") + "." + reserved.secondName;
        } else if (coords.format === "dotted" || coords.Format === "dotted") {
          reserve = (reserved.number || "") + "." + reserved.firstName[0] + "." + reserved.secondName;
        } else if (coords.format === "oneDot" || coords.Format === "oneDot") {
          reserve = (reserved.number || "") + "." + reserved.firstName[0] + "." + reserved.secondName;
        } else {
          reserve = reserved.secondName;
        }
        if (currentYear - Number(reserved.age) <= 21) {
          reserve += "(m)";
        }
        text = text + " " + reserve + `${coords.Formatter || ","} `;
      });
      setTextValue(text);
    };
    handleReserveFormat(selectedReserve?.length ? selectedReserve : selectedPreset?.reservePlayers);
  }, [selectedReserve, selectedPreset]);

  return { selectedReserve, setTextValue };
};

export default useReserveFabricObject;
