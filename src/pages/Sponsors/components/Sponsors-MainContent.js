import {useState} from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import SponsorBlock from "./SponsorBlock";
import ItemBlock from "../../../components/main-content-elements/ItemBlock";
import AddSponsorWindow from "./AddSponsorWindow";
import { useCollection } from '../../../hooks/useCollection';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useParams } from "react-router-dom";
import "../../../App.css";

function SponsorsMainContent() {
  const { id } = useParams()

  const { user } = useAuthContext()

  const {documents: Sponsors} = useCollection(
    'Sponsors',
    ['uid', '==', id]
    )
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="main-content">
          <AddSponsorWindow open={openModal} onClose={() => setOpenModal(false)} />
          <div className="ml-5">
            <Title title = "Sponsorzy" />
            <button className="btn primary-btn" onClick={() => setOpenModal(true)}>Dodaj sponosora</button>
            <ItemContainer element = {Sponsors && <ItemBlock items = {Sponsors} />} />
          </div>
          <MainFooter />
        </div>
    );
}

export default SponsorsMainContent;