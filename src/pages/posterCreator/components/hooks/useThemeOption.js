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
        themeOption:[
        ...(prevState[index].themeOption || []).filter((option) => option.label !== color),
          {
            label: color,
            Fill: coords.Fill,
          },
        ]
      }
    }
  };

  return { setThemeOption, setUniversalThemeOption };
};

export default useThemeOption;
