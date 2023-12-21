import React from "react";
import useCatalog from "../../Catalog/hooks/useCatalog";
import useSortCatalog from "../../Catalog/hooks/useSortCatalog";
import ThemeContainer from "../../../components/ThemeContainer";
import { poster } from "../../../components/PosterItem";
import PosterLink from "../../Catalog/components/PosterLink";

const Catalog = () => {
  const { data: catalog, posters } = useCatalog();
  const { isOpen } = useSortCatalog(catalog);
  return (
    <div>
      {isOpen?.map((category, i) => (
        <ThemeContainer key={i} category={category}>
          {posters?.map((item: poster, i: number) => (
            <PosterLink key={i} poster={item} />
          ))}
        </ThemeContainer>
      ))}
    </div>
  );
};

export default Catalog;
