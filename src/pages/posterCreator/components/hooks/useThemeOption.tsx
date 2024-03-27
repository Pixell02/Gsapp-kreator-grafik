import {
  ActiveObjectCoords,
  BlendColorFilter,
  Filters,
  ImagesWithFilter,
} from "../../../../types/creatorComponentsTypes";
import { Text, Textbox, ThemeOption } from "../../../../types/globalPropertiesTypes";
import { useBackgroundContext } from "../../Context/BackgroundContext";
import { GlobalProperties } from "../../Context/GlobalProperitesContext";

const useThemeOption = () => {
  const { color } = useBackgroundContext();

  const setThemeOption = (prevState: GlobalProperties, coords: ActiveObjectCoords) => {
    const { className } = coords;
    return (
      color && {
        ...coords,
        themeOption: [
          ...((prevState[className as string] as Text)?.themeOption || []).filter(
            (option: ThemeOption) => option.label !== color
          ),
          {
            label: color,
            Fill: coords.Fill,
          },
        ],
      }
    );
  };
  const setUniversalThemeOption = (prevState: Text[] | Textbox[], coords: ActiveObjectCoords) => {
    const index = prevState?.findIndex((option) => option.className === coords.className);

    if (index === -1) {
      return {
        ...coords,
        themeOption: [
          {
            label: color,
            Fill: coords.Fill,
          },
        ],
      };
    } else {
      return {
        ...coords,
        themeOption: [
          ...(prevState[index].themeOption || []).filter((option) => option.label !== color),
          {
            label: color,
            Fill: coords.Fill,
          },
        ],
      };
    }
  };

  const setImageThemeOption = (prevState: ImagesWithFilter[], coords: ActiveObjectCoords) => {
    const index = prevState?.findIndex((option) => option.className === coords.className);

    if (index === -1) {
      return {
        ...coords,
        ...(Object.keys(coords.filters as Filters).length > 0 && {
          filters: coords.filters && {
            ...coords.filters,
            ...((coords.filters as Filters).blendColor && {
              blendColor: ((coords.filters as Filters).blendColor as BlendColorFilter) && {
                themeOption: [
                  {
                    label: color,
                    color: (coords.filters as Filters)?.blendColor?.color,
                  },
                ],
              },
            }),
          },
        }),
      };
    } else {
      return {
        ...coords,
        ...(Object.keys(coords.filters as Filters).length > 0 && {
          filters: coords.filters && {
            ...(coords.filters as Filters),
            ...((coords.filters as Filters).blendColor && {
              blendColor: (coords.filters as Filters).blendColor && {
                ...(coords.filters as Filters).blendColor,
                themeOption: [
                  ...((prevState[index]?.filters?.blendColor as BlendColorFilter)?.themeOption || []).filter(
                    (option: ThemeOption) => option.label !== color
                  ),
                  {
                    label: color,
                    color: (coords.filters as Filters).blendColor?.color,
                  },
                ],
              },
            }),
          },
        }),
      };
    }
  };

  return { setThemeOption, setUniversalThemeOption, setImageThemeOption };
};

export default useThemeOption;
