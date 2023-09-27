import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";
import useTextLayer from "./useTextLayer";

const usePlacePreset = (fabricRef, coords, themeOption, name) => {
  const { user } = useAuthContext();
  const { documents: PlacePreset } = useCollection("placePreset", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: LicensedPlacePreset } =
    useTeamLicenseCollection("placePreset");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { setTextValue } = useTextLayer(fabricRef, coords, themeOption, name);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (PlacePreset?.length > 0) {
      const option = PlacePreset?.map((item) => ({
        label: item.place,
        value: item.place,
      }));
      setOptions((prev) => [...option]);
    }
    if (LicensedPlacePreset?.length > 0) {
      const option = LicensedPlacePreset?.map((item) => ({
        label: item.place,
        value: item.place,
      }));
      setOptions((prev) => [...option]);
    }
  }, [LicensedPlacePreset, PlacePreset]);

  useEffect(() => {
    setTextValue(selectedPlace);
  }, [selectedPlace]);

  return { setSelectedPlace, options };
};

export default usePlacePreset;
