import React, { Dispatch, SetStateAction, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import SlabBlock from "../../../components/SlabBlock";
import { useCollection } from "../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Portal from "../../../components/Portal";
import AddPlaceWindow from "./AddPlaceWindow";
import EditPlaceWindow from "./EditPlaceWindow";

export type Place = {
  id: string;
  place: string;
  uid: string;
};
export type Preset = { presetName: string; id: string };

const PlaceContent = () => {
  const { user } = useAuthContext();
  const { documents: PlacePresets } = useCollection("placePreset", ["uid", "==", user.uid]);
  const { documents: LicensePlacePreset } = useTeamLicenseCollection("placePreset");
  const [selectedModal, setSelectedModal] = useState(0);
  const [data, setData] = useState<Place | null>(null);

  const modalOptions: { id: number; component: JSX.Element }[] = [
    { id: 1, component: <AddPlaceWindow setSelectedModal={setSelectedModal} /> },
    { id: 2, component: <EditPlaceWindow data={data as Place} setSelectedModal={setSelectedModal} /> },
  ];

  return (
    <>
      <Portal>{modalOptions.map((item) => item.id === selectedModal && item.component)}</Portal>
      <button className="btn" onClick={() => setSelectedModal(1)}>
        Dodaj miejsce
      </button>
      <ItemContainer>
        {(PlacePresets as Place[])?.map((item, i) => (
          <SlabBlock
            key={i}
            item={item}
            setSelectedModal={setSelectedModal}
            type={"placePreset"}
            setData={setData as Dispatch<SetStateAction<Place>>}
          />
        ))}
        {(LicensePlacePreset as Place[])?.map((item, i: number) => (
          <SlabBlock
            key={i}
            item={item}
            setSelectedModal={setSelectedModal}
            type={"placePreset"}
            setData={setData as Dispatch<SetStateAction<Place>>}
          />
        ))}
      </ItemContainer>
    </>
  );
};

export default PlaceContent;
