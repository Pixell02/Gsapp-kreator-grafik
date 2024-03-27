import React, { Dispatch, SetStateAction, useState } from "react";
import useCatalog from "../../Catalog/hooks/useCatalog";
import useSortCatalog from "../../Catalog/hooks/useSortCatalog";
import ThemeContainer from "../../../components/ThemeContainer";
import PosterBlock from "./PosterBlock";
import { DocumentData } from "firebase/firestore";
import ThemeTypeIcon from "../../stats/components/AdministratorPanel/Themes/ThemeTypeIcon";

type setStateProps = {
  setSelectedPoster: Dispatch<SetStateAction<DocumentData | null>>;
};

const Catalog = ({ setSelectedPoster }: setStateProps) => {
  const [type, setType] = useState<"normal" | "story">("normal");
  const { data: catalog, posters } = useCatalog(type);

  const { isOpen } = useSortCatalog(catalog);
  return (
    <div>
      <ThemeTypeIcon selectedType={type} setSelectedType={setType} />
      {isOpen?.map((category, i) => (
        <ThemeContainer key={i} category={category}>
          {posters
            ?.filter((item) => item.themeId === category.id)
            .map((item, i: number) => (
              <PosterBlock key={i} poster={item} setSelectedPoster={setSelectedPoster} />
            ))}
        </ThemeContainer>
      ))}
    </div>
  );
};

export default Catalog;
