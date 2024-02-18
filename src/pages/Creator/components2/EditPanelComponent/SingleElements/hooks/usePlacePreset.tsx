import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";
import useTextLayer from "./useTextLayer";
import { useCalendarContext } from "../../../../context/CalendarContext";
import { Place } from "../../../../../Opponents/components/PlaceContent";
import { Text } from "../../../../../../types/globalPropertiesTypes";

type Option = {
  label: string;
  value: string;
};

const usePlacePreset = (coords: Text, fabricRef?: React.MutableRefObject<fabric.Canvas | null>) => {
  const { user } = useAuthContext();
  const { documents: PlacePreset } = useCollection<Place>("placePreset", ["uid", "==", user.uid]);
  const { documents: LicensedPlacePreset } = useTeamLicenseCollection<Place>("placePreset");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const { textValue, setTextValue } = useTextLayer(coords, fabricRef);
  const [options, setOptions] = useState<Option[] | null>(null);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    if (calendarData?.selectedPlacePreset) {
      setSelectedPlace(calendarData.selectedPlacePreset);
      setIsLoaded(true);
    }
    if (calendarData?.typePlace) {
      setTextValue(calendarData.typePlace as string);
    }
  }, [calendarData]);

  useEffect(() => {
    setCalendarData({ ...calendarData, selectedPlacePreset: selectedPlace || textValue });
  }, [selectedPlace, textValue]);

  useEffect(() => {
    if (PlacePreset && PlacePreset.length > 0) {
      const option = PlacePreset?.map((item) => ({
        label: item.place,
        value: item.place,
      }));
      setOptions([...option]);
    }
    if (LicensedPlacePreset && LicensedPlacePreset?.length > 0) {
      const option = LicensedPlacePreset?.map((item: { place: string }) => ({
        label: item.place,
        value: item.place,
      }));
      setOptions([...option]);
    }
  }, [LicensedPlacePreset, PlacePreset]);

  useEffect(() => {
    if (!selectedPlace) return;
    setTextValue(selectedPlace);
  }, [selectedPlace, setTextValue]);

  return { setSelectedPlace, options, textValue, setTextValue };
};

export default usePlacePreset;
