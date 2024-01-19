import LeftBar from "../../components/Left-Bar";
import WorkSpace from "./WorkSpace";
import { CalendarProvider } from "./context/CalendarContext";
import { ImageRefProvider } from "./context/ImageRefContext";
import { ThemeProvider } from "./context/ThemeContext";
function Creator() {
  return (
    <ImageRefProvider>
      <CalendarProvider>
        <ThemeProvider>
          <div className="page-container">
            <div className="content-wrap">
              <LeftBar />
              <WorkSpace />
            </div>
          </div>
        </ThemeProvider>
      </CalendarProvider>
    </ImageRefProvider>
  );
}

export default Creator;
