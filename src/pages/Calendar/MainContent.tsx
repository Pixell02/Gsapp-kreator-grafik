import ReturnButton from "../../components/ReturnButton";
import ItemContainer from "../../components/main-content-elements/ItemContainer";
import translation from "../../components/leftBar.json";
import { useLanguageContext } from "../../context/LanguageContext";
import { props } from "../../types/translationTypes";
import Title from "../../components/main-content-elements/Title";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useDate from "./hooks/useDate";
import { useState } from "react";
import EventModal from "./components/EventModal";
import { CalendarProvider } from "../Creator/context/CalendarContext";
import useSearchDocsByQuery from "../../hooks/useSearchDocsByQuery";
import PosterLink from "../Catalog/components/PosterLink";
import { poster } from "./components/PosterBlock";

type translationProps = {
  calendar: props;
};

const MainContent = () => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const { date, onChange, momentDate } = useDate();
  const { documents: graphics } = useSearchDocsByQuery<poster>("calendarPoster", "date", "==", momentDate as string);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="main-content">
      {isOpen && (
        <CalendarProvider>
          <EventModal setIsOpen={setIsOpen} date={momentDate} />
        </CalendarProvider>
      )}
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.calendar[language]} />
        <button onClick={() => setIsOpen(true)} className="btn mb-4">
          Zaplanuj
        </button>
        <ItemContainer>
          <Calendar onChange={onChange} value={date} />
          {graphics?.map((item) => (
            <PosterLink poster={item} />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
};

export default MainContent;
