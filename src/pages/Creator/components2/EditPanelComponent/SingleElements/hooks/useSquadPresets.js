import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";
import showReserve from "../playerOption/showReserve";
import squadPlayer from "../playerOption/squadPlayer";
import useThemeContext from "../../../../hooks/useThemeContext";

const useSquadPresets = (fabricRef, coords) => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const { user } = useAuthContext();
  const { themeColor } = useThemeContext();
  const { documents: Presets } = useCollection("squadPreset", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: LicensedPreset } = useTeamLicenseCollection("squadPreset");
  const [PresetOptions, setPresetOptions] = useState(null);

  useEffect(() => {
    if (Presets?.length > 0) {
      const options = Presets.map((item) => ({
        label: item.presetName,
        value: item,
      }));
      setPresetOptions([...options]);
    }
    if (LicensedPreset?.length > 0) {
      const options = LicensedPreset.map((item) => ({
        label: item.presetName,
        value: item,
      }));
      setPresetOptions([...options]);
    }
  }, [Presets, LicensedPreset]);

  useEffect(() => {
    if (fabricRef.current?._objects && selectedPreset) {
      coords.playerOne &&
        squadPlayer(
          fabricRef,
          selectedPreset.squadPlayers,
          coords,
          themeColor,
          selectedPreset.goalkeeper,
          selectedPreset.capitan
        );
      coords.reserveOne &&
        showReserve(
          fabricRef,
          selectedPreset.reservePlayers,
          coords,
          themeColor
        );
    }
  }, [selectedPreset, themeColor, coords, fabricRef]);

  return { PresetOptions, setSelectedPreset };
};

export default useSquadPresets;
