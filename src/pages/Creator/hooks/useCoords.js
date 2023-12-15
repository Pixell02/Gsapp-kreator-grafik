import { useEffect } from "react";
import { useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useParams } from "react-router-dom";


const useCoords = () => {
  const { poster } = useParams();
  const { documents: coordinates } = useCollection("coords", ["uid", "==", poster]);
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    if (coordinates)
      if (coordinates.length > 0) {
        setCoords(coordinates[0]);
      }
  }, [coordinates]);

  return {coords}
}

export default useCoords
