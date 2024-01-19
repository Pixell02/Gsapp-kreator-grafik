import "../../../components/main-content-elements/Block.css";
import useCatalog from "../hooks/useCatalog";
import ThemeContainer from "../../../components/ThemeContainer";
import useSortCatalog from "../hooks/useSortCatalog";
import PosterLink from "./PosterLink";

function CatalogBlock({ setSelectedPoster }) {
  const { data: catalog, posters } = useCatalog();
  const { isOpen, handleCategory } = useSortCatalog(catalog);

  return (
    <>
      {isOpen?.map((category, i) => (
        <ThemeContainer key={i} i={i} category={category} handleCategory={handleCategory}>
          {posters
            ?.filter((poster) => poster.themeId === category.id)
            .map((poster, i) => (
              <PosterLink key={i} poster={poster} setSelectedPoster={setSelectedPoster} />
            ))}
        </ThemeContainer>
      ))}
    </>
  );
}

export default CatalogBlock;
