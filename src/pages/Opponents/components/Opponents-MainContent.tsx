import ReturnButton from "../../../components/ReturnButton";
import "./opponents.css";
import OpponentContent from "./OpponentContent";
import PlaceContent from "./PlaceContent";

function OpponentsMainContent() {
  return (
    <div className="main-content">
      <ReturnButton />
      <div className="ml-5">
        <OpponentContent />
        <PlaceContent />
      </div>
    </div>
  );
}

export default OpponentsMainContent;
