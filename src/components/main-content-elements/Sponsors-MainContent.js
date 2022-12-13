import {useState} from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import ItemContainer from "./ItemContainer";
import SponsorBlock from "./SponsorBlock";
import AddSponsorWindow from "./AddSponsorWindow";
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

function SponsorsMainContent() {

  const { user } = useAuthContext()

  const {documents: Sponsors} = useCollection(
    'Sponsors',
    ['uid', '==', user.uid]
    )
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="main-content">
          <AddSponsorWindow open={openModal} onClose={() => setOpenModal(false)} />
          <div className="ml-5">
            <Title title = "Sponsorzy" />
            <button className="btn primary-btn" onClick={() => setOpenModal(true)}>Dodaj sponosora</button>
            <ItemContainer element = {Sponsors && <SponsorBlock sponsors = {Sponsors} />} />
          </div>
          <MainFooter />
        </div>
    );
}

export default SponsorsMainContent;