import useBackgroundContext from "./useBackgroundContext";

const useThemeOption = () => {
  const { color } = useBackgroundContext();

  const setThemeOption = (coords) => {
    if (color) {
      if (!coords.themeOption) {
        coords.themeOption = [];
      }

      const themeOptionIndex = coords.themeOption.findIndex((option) => option.label === color);

      if (themeOptionIndex !== -1) {
        coords.themeOption[themeOptionIndex].Fill = coords.Fill;
      } else {
        coords.themeOption.push({
          label: color,
          Fill: coords.Fill,
        });
      }
    }
    return coords;
  };

  return setThemeOption;
};

export default useThemeOption;
