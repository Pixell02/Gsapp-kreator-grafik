import "../../../components/main-content-elements/Block.css";
import useCatalog from "../hooks/useCatalog";
import ThemeContainer from "../../../components/ThemeContainer";
import useSortCatalog from "../hooks/useSortCatalog";
import PosterBlock from "../../Calendar/components/PosterBlock";

function CatalogBlock({ setSelectedPoster }) {
  const { data: catalog, posters } = useCatalog();
  const { isOpen, handleCategory } = useSortCatalog(catalog);

  return (
    <div className="catalog-container">
      {isOpen?.map((category, i) => (
        <ThemeContainer key={i} i={i} category={category} handleCategory={handleCategory}>
          {posters
            ?.filter((poster) => poster.themeId === category.id)
            .map((poster, i) => (
              <PosterBlock key={i} poster={poster} setSelectedPoster={setSelectedPoster} />
            ))}
        </ThemeContainer>
      ))}
    </div>
  );
}

export default CatalogBlock;
