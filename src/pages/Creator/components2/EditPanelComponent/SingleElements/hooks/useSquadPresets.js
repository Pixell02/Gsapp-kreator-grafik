import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";
import showReserve from "../playerOption/showReserve";
import squadPlayer from "../playerOption/squadPlayer";

const useSquadPresets = (fabricRef, coords, themeOption) => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const { user } = useAuthContext();
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
      setPresetOptions((prev) => [...options]);
    }
    if (LicensedPreset?.length > 0) {
      const options = LicensedPreset.map((item) => ({
        label: item.presetName,
        value: item,
      }));
      setPresetOptions((prev) => [...options]);
    }
  }, [Presets, LicensedPreset]);

  useEffect(() => {
    if (fabricRef.current?._objects && selectedPreset) {
      coords.playerOne &&
        squadPlayer(
          fabricRef,
          selectedPreset.squadPlayers,
          coords,
          themeOption,
          selectedPreset.goalkeeper,
          selectedPreset.capitan
        );
      coords.reserveOne &&
        showReserve(
          fabricRef,
          selectedPreset.reservePlayers,
          coords,
          themeOption
        );
    }
  }, [selectedPreset]);

  return { PresetOptions, setSelectedPreset };
};

export default useSquadPresets;
