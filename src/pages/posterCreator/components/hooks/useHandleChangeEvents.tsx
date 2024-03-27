/* eslint-disable @typescript-eslint/ban-types */
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ActiveObjectCoords, FabricReference } from "../../../../types/creatorComponentsTypes";
import useFormatOption from "./useFormatOption";
import { Object } from "fabric/fabric-impl";

const useHandleChangeEvents = (
  fabricRef: FabricReference,
  coords: ActiveObjectCoords | null,
  setCoords: Dispatch<SetStateAction<ActiveObjectCoords | null>>
) => {
  const { squadOptions, defaultSquad, defaultReserve, reserveOptions } = useFormatOption();

  const updateActiveObjectCoords = (name: string, value: number | string) => {
    const canvas = fabricRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (name !== "Width" && name !== "Height" && name !== "angle") {
          fabricRef.current?._objects?.forEach((object) => {
            if (object.className === activeObject.className) {
              object.set((name.charAt(0).toLowerCase() + name.slice(1)) as keyof Object, value);
            }
          });
        } else {
          if (name === "Width") {
            activeObject.set("scaleX", Number(value) / Number(activeObject.width));
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "scaleX", Number(value) / Number(activeObject.width));
            }
          } else if (name === "Height") {
            activeObject.set("scaleY", Number(value) / Number(activeObject.width));
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "scaleY", Number(value) / Number(activeObject.width));
            }
          } else if (name === "angle") {
            activeObject.set("angle", Number(value));
            if (activeObject.id) {
              handleMultiplyObjectUpdate(activeObject, "angle", value);
            }
          }
        }
        canvas.renderAll();
      }
    }
  };

  const handleMultiplyObjectUpdate = (activeObject: Object, key: keyof Object, value: string | number) => {
    const objects = fabricRef.current.getObjects();
    objects.forEach((object) => {
      if (object.id === activeObject.id) {
        object.set(key, value);
        setCoords({ ...coords, [key]: value } as ActiveObjectCoords);
      }
    });
  };

  const updatePlayerNameFormat = (value: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (value === "dotted") {
      activeObject.set("text", "I.Nazwisko");
    } else if (value === "NumSurName") {
      activeObject.set("text", "Imie Nazwisko");
    } else {
      activeObject.set("text", "Nazwisko");
    }
    activeObject.set("Format", value);
    setCoords({ ...coords, Format: value } as ActiveObjectCoords);
    canvas.renderAll();
  };
  const updateSquadFormat = (value: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const text = squadOptions[value] || defaultSquad;
    activeObject.set("text", text);
    activeObject.set("Format", value);
    canvas.renderAll();
    setCoords({ ...coords, Format: value } as ActiveObjectCoords);
  };

  const updateReserveFormat = (value: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const text = reserveOptions[value] || defaultReserve;
    activeObject.set("text", text);
    activeObject.set("Format", value);
    canvas.renderAll();
    setCoords({ ...coords, Format: value } as ActiveObjectCoords);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateActiveObjectCoords(name, value);

    setCoords({
      ...coords,
      [name]: value,
    } as ActiveObjectCoords);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "fontFamily") {
      updateActiveObjectCoords(name, value);
    } else if (name === "Format") {
      if (coords?.className === "playerOne") {
        updateSquadFormat(value);
      } else if (coords?.className === "reserveOne") {
        updateReserveFormat(value);
      } else if (coords?.className === "player") {
        updatePlayerNameFormat(value);
      }
    } else {
      updateActiveObjectCoords(name, value);
    }
    setCoords({ ...coords, [name]: value } as ActiveObjectCoords);
  };

  return {
    updateActiveObjectCoords,
    handleInputChange,
    handleSelectChange,
  };
};

export default useHandleChangeEvents;
