import LeftBar from "../../components/Left-Bar";
import WorkSpace from "./WorkSpace";
import { MultiPropertiesProvider } from "./Context/MultiPropertiesContext";
import { ImageRefProvider } from "../Creator/context/ImageRefContext";
import { BackgroundProvider } from "./Context/BackgroundContext";

export default function PosterCreator() {
  return (
    <MultiPropertiesProvider>
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
    </MultiPropertiesProvider>
  );
}
