import "./themeBlock.css";
import ThemeContainer from "../../../../../components/ThemeContainer";
import PosterLink from "../../../../Catalog/components/PosterLink";

export default function ThemeBlock({ themes, posters }) {
  const sortedThemes = themes.sort((a, b) => {
    const getNumberFromTheme = (theme) => {
      const match = theme.theme.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };
    const numberA = getNumberFromTheme(a);
    const numberB = getNumberFromTheme(b);
    return numberA - numberB;
  });

  return (
    <>
      {sortedThemes?.map((theme) => (
        <ThemeContainer isEditable={true} category={theme}>
          {posters
            ?.filter((poster) => poster.themeId === theme.id)
            .map((poster, i) => (
              <PosterLink isEditable={true} key={i} poster={poster} />
            ))}
        </ThemeContainer>
      ))}
    </>
  );
}
