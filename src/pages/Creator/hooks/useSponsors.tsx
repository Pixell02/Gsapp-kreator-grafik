import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

type Image = {
  height: number;
  img: string;
};

const useSponsors = (sponsors: DocumentData[], coords: DocumentData) => {
  const [sponsorsArray, setSponsorsArray] = useState<DocumentData[] | null>(null);
  const [sponsorHeight, setSponsorHeight] = useState(0);
  const { handleFetch } = useFetch();
  useEffect(() => {
    if (!sponsors || !coords) return;

    const adjustImageSizes = async () => {
      const array: Image[] = [];
      let totalArea = 0;
      let scalingFactor = 1;

      const rectangleField = coords.Width * coords.Height;

      const promises: Promise<void>[] = sponsors.map((item) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.src = item.img;
          image.onload = async () => {
            const imageHeight = image.height;
            const imageArea = image.width * imageHeight;
            const dataURL = await handleFetch(item.img);
            array[parseInt(item.number)] = { ...item, height: imageHeight, img: dataURL };
            totalArea += imageArea;
            resolve();
          };
        });
      });

      await Promise.all(promises);

      if (totalArea > rectangleField) {
        scalingFactor = Math.sqrt(rectangleField / totalArea);
      }
      let minHeight = Number.MAX_VALUE;
      let maxHeight = Number.MIN_VALUE;
      let totalHeight = 0;
      array.forEach((item) => {
        item.height *= scalingFactor;
        minHeight = Math.min(minHeight, item.height);
        maxHeight = Math.max(maxHeight, item.height);
        totalHeight += item.height;
      });
      const averageHeight = totalHeight / array.length;
      setSponsorHeight(averageHeight);
      setSponsorsArray(array);
    };

    adjustImageSizes();
  }, [sponsors, coords]);

  return { sponsorsArray, sponsorHeight };
};

export default useSponsors;
