import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";
import { useTeamContext } from "../../../../context/teamContext";
import { SquadPreset } from "../../../../../../types/teamTypes";

type OptionPreset = {
  label: string;
  value: SquadPreset;
};

const useSquadPresets = () => {
  const { setSelectedPreset } = useTeamContext();
  const { user } = useAuthContext();
  const { documents: Presets } = useCollection<SquadPreset>("squadPreset", ["uid", "==", user.uid]);
  const { documents: LicensedPreset } = useTeamLicenseCollection<SquadPreset>("squadPreset");
  const [PresetOptions, setPresetOptions] = useState<OptionPreset[] | null>(null);

  useEffect(() => {
    if (Presets && Presets?.length > 0) {
      const options = Presets.map((item) => ({
        label: item.presetName,
        value: item,
      }));
      setPresetOptions([...options]);
    }
    if (LicensedPreset && LicensedPreset?.length > 0) {
      const options = LicensedPreset.map((item) => ({
        label: item.presetName,
        value: item,
      }));
      setPresetOptions([...options]);
    }
  }, [Presets, LicensedPreset]);

  return { PresetOptions, setSelectedPreset };
};

export default useSquadPresets;
