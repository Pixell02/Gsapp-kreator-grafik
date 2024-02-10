import { useRef, useState } from "react";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import AddSponsorWindow from "./AddSponsorWindow";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../App.css";
import ReturnButton from "../../../components/ReturnButton";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";
import EditSponsorWindow from "./EditSponsorWindow";
import Portal from "../../../components/Portal";

export type Sponsor = {
  id?: string;
  name: string;
  img: string | File;
  number: number;
  uid: string;
};

function SponsorsMainContent() {
  const { user } = useAuthContext();

  const { documents: sponsors } = useCollection("Sponsors", ["uid", "==", user.uid]);

  const [selectedModal, setSelectedModal] = useState(0);
  const [data, setData] = useState<Sponsor | null>(null);

  const modalOptions = [
    {
      id: 1,
      component: <AddSponsorWindow defaultNumber={(sponsors?.length || 0) + 1} setSelectedModal={setSelectedModal} />,
    },
    {
      id: 2,
      component: <EditSponsorWindow data={data as Sponsor} setSelectedModal={setSelectedModal} />,
    },
  ];

  const hideElement = useRef(null);

  const editClick = (item: Sponsor) => {
    setData(item);
    setSelectedModal(2);
  };

  return (
    <div className="main-content" ref={hideElement}>
      <Portal>{modalOptions.map((item) => selectedModal === item.id && item.component)}</Portal>

      <div className="ml-5">
        <ReturnButton />
        <Title title="Sponsorzy" />
        <button className="btn primary-btn" onClick={() => setSelectedModal(1)}>
          Dodaj sponsora
        </button>
        <ItemContainer>
          {sponsors?.map((item, i) => (
            <FilteredBlock key={i} item={item} type={"Sponsors"} editClick={editClick} />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
}

export default SponsorsMainContent;
