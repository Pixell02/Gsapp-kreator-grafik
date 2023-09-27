import { useEffect, useState } from "react";

const useFetch = (link) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (link) {
      const handleFetch = async (link) => {
        await fetch(link)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              setImage(reader.result);
            };
          })
          .catch((error) => {
            console.error(error);
            setImage(null);
          });
      };
      handleFetch(link);
    }
  }, [link]);

  return { image };
};

export default useFetch;
