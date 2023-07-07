import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useCollection } from "../../hooks/useCollection";
import LeftBar from "../../components/Left-Bar";
import ThemeWorkSpace from "../ThemeCreator/ThemeWorkSpace";

export default function EditTheme() {
  const params = useParams();
  const [defaultBackground, setDefaultBackGround] = useState({});
  const { documents: defaultTheme } = useCollection("piecesOfPoster", ["uid", "==", params.id]);
  const { documents: poster } = useCollection("piecesOfPoster",["uuid", "==", params.id])
  const { documents: coords } = useCollection("coords", ["uid", "==", params.id]);

  useEffect(() => {
    if (defaultTheme) {
      setDefaultBackGround(defaultTheme[0])
    }
  }, [defaultTheme])
   
  return (
    <div className="page-container">
  <div className='content-wrap'>
    <LeftBar />
    {defaultBackground && coords && (
      <ThemeWorkSpace
        id={params.id}
        backgrounds={poster}
        defaultBackGround={defaultBackground ? defaultBackground : null}
        coords={coords ? coords[0] : null} />
    )}
    
  </div>
</div>)
}
