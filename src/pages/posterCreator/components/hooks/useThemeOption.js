import useBackgroundContext from "./useBackgroundContext";

const useThemeOption = () => {
  const { color } = useBackgroundContext();

  const setThemeOption = (prevState, coords) => {
    return (
      color && {
        ...coords,
        themeOption: [
          ...(prevState[coords.className]?.themeOption || []).filter((option) => option.label !== color),
          {
            label: color,
            Fill: coords.Fill,
          },
        ],
      }
    );
  };
  const setUniversalThemeOption = (prevState, coords) => {
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

  const setImageThemeOption = (prevState, coords) => {
    const index = prevState?.findIndex((option) => option.className === coords.className);

    if (index === -1) {
      return {
        ...coords,
        ...(Object.keys(coords.filters).length > 0 && {
          filters: coords.filters && {
            ...coords.filters,
            blendColor: coords.filters.blendColor && {
              themeOption: [
                {
                  label: color, // Use the provided color parameter
                  color: coords.filters?.blendColor?.color,
                },
              ],
            },
          },
        }),
      };
    } else {
      return {
        ...coords,
        ...(Object.keys(coords.filters).length > 0 && {
          filters: coords.filters && {
            ...coords.filters,
            blendColor: coords.filters.blendColor && {
              ...coords.filters.blendColor,
              themeOption: [
                ...(prevState[index]?.filters?.blendColor?.themeOption || []).filter(
                  (option) => option.label !== color
                ),
                {
                  label: color, // Use the provided color parameter
                  color: coords.filters?.blendColor?.color,
                },
              ],
            },
          },
        }),
      };
    }
  };

  return { setThemeOption, setUniversalThemeOption, setImageThemeOption };
};

export default useThemeOption;
