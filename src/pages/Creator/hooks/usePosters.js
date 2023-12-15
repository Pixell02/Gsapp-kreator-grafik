import { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import useThemeOption from './useThemeOption';
import useThemeContext from './useThemeContext';

const usePosters = (poster) => {
  const themeOptions = useThemeOption(poster);
  const { themeColor, setThemeColor } = useThemeContext();

  const { image: dataURL } = useFetch(themeColor?.value?.src);
  const { image: additionalLayer } = useFetch(themeColor?.value?.additionalLayer);

  useEffect(() => {
    themeOptions?.length > 0 && setThemeColor(themeOptions[0]);
  }, [themeOptions, setThemeColor]);

  return {
    dataURL,
    themeOptions,
    additionalLayer,
  };
};

export default usePosters;
