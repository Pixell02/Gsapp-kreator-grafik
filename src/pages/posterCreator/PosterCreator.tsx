import LeftBar from "../../components/Left-Bar";
import WorkSpace from "./WorkSpace";
import { ImageRefProvider } from "../Creator/context/ImageRefContext";
import { BackgroundProvider } from "./Context/BackgroundContext";
import { FontProvider } from "./Context/FontsContext";
import { GlobalPropertiesProvider } from "./Context/GlobalProperitesContext";

export default function PosterCreator() {
  return (
    <GlobalPropertiesProvider>
      <FontProvider>
        <BackgroundProvider>
          <ImageRefProvider>
            <div className="page-container">
              <div className="content-wrap">
                <LeftBar />
                <WorkSpace />
              </div>
            </div>
          </ImageRefProvider>
        </BackgroundProvider>
      </FontProvider>
    </GlobalPropertiesProvider>
  );
}
