import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const useInitScale = (dataURL) => {

  const [initScale, setInitScale] = useState(null);
  useEffect(() => {
    if (dataURL) {
      const image = new Image();
      image.src = dataURL;
      image.onload = () => {
        if (image.width > 2000 || image.height > 2000) {
          setInitScale(0.5);
        } else if (image.width > 1000 || image.height > 1000) {
          setInitScale(0.75);
        } else if (image.width < 1000 || image.height < 1000) {
          setInitScale(1);
        }
      };
    }
  }, [dataURL]);

  return {initScale}
}

export default useInitScale
