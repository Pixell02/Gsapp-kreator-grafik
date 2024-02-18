import React, { Dispatch, SetStateAction } from "react";
import useCatalog from "../../Catalog/hooks/useCatalog";
import useSortCatalog from "../../Catalog/hooks/useSortCatalog";
import ThemeContainer from "../../../components/ThemeContainer";
import { poster } from "../../../components/PosterItem";
import PosterBlock from "./PosterBlock";
import { DocumentData } from "firebase/firestore";

type setStateProps = {
  setSelectedPoster: Dispatch<SetStateAction<DocumentData | null>>;
};

const Catalog = ({ setSelectedPoster }: setStateProps) => {
  const { data: catalog, posters } = useCatalog();

  const { isOpen } = useSortCatalog(catalog);
  return (
    <div>
      {isOpen?.map((category, i) => (
        <ThemeContainer key={i} category={category}>
          {posters
            ?.filter((item: poster) => item.themeId === category.id)
            .map((item: poster, i: number) => (
              <PosterBlock key={i} poster={item} setSelectedPoster={setSelectedPoster} />
            ))}
        </ThemeContainer>
      ))}
    </div>
  );
};

export default Catalog;
