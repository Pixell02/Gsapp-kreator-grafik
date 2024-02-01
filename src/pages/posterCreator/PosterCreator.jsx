import LeftBar from "../../components/Left-Bar";
import WorkSpace from "./WorkSpace";
import { MultiPropertiesProvider } from "./Context/MultiPropertiesContext";
import { ImageRefProvider } from "../Creator/context/ImageRefContext";
import { BackgroundProvider } from "./Context/BackgroundContext";
import { FontProvider } from "./Context/FontsContext";

export default function PosterCreator() {
  return (
    <MultiPropertiesProvider>
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
    </MultiPropertiesProvider>
  );
}
