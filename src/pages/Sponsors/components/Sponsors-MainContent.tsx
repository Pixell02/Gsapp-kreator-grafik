import { Dispatch, SetStateAction, useRef, useState } from "react";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import AddSponsorWindow from "./AddSponsorWindow";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../App.css";
import ReturnButton from "../../../components/ReturnButton";
import FilteredBlock, { Item } from "../../../components/main-content-elements/FilteredBlock";
import EditSponsorWindow from "./EditSponsorWindow";
import Portal from "../../../components/Portal";
import useOrderNumber from "../hooks/useOrderNumber";

export type Sponsor = {
  id?: string;
  name: string;
  img: string | File;
  number: number;
  uid: string;
};

function SponsorsMainContent() {
  const { user } = useAuthContext();

  const { documents: sponsors } = useCollection<Sponsor>("Sponsors", ["uid", "==", user.uid]);
  const { sponsorNumbersArray } = useOrderNumber(sponsors as Sponsor[]);
  const [selectedModal, setSelectedModal] = useState(0);
  const [data, setData] = useState<Sponsor | null>(null);

  const modalOptions = [
    {
      id: 1,
      component: (
        <AddSponsorWindow
          sponsorNumbersArray={sponsorNumbersArray}
          defaultNumber={(sponsors?.length || 0) + 1}
          setSelectedModal={setSelectedModal}
        />
      ),
    },
    {
      id: 2,
      component: (
        <EditSponsorWindow
          sponsorNumbersArray={sponsorNumbersArray}
          data={data as Sponsor}
          setSelectedModal={setSelectedModal}
        />
      ),
    },
  ];

  const hideElement = useRef(null);

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
            <FilteredBlock
              key={i}
              setData={setData as Dispatch<SetStateAction<Item>>}
              setSelectedModal={setSelectedModal}
              item={item as Item}
              type={"Sponsors"}
            />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
}

export default SponsorsMainContent;
