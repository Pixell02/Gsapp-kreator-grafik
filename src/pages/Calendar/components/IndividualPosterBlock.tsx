import React from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import PosterBlock, { poster } from "./PosterBlock";

type props = {
  setSelectedPoster: (poster: poster) => void;
};

const IndividualPosterBlock = ({ setSelectedPoster }: props) => {
  const { user } = useAuthContext();
  const { documents: posters } = useCollection("yourCatalog", ["uid", "==", user.uid]);

  return (
    <div className="d-flex flex-column">
      {(posters as poster[])?.map((poster, i) => (
        <PosterBlock key={i} poster={poster} setSelectedPoster={setSelectedPoster} />
      ))}
    </div>
  );
};

export default IndividualPosterBlock;
