import { useRef, useState } from 'react';
import Title from '../../../components/main-content-elements/Title';
import ItemContainer from '../../../components/main-content-elements/ItemContainer';
import AddSponsorWindow from './AddSponsorWindow';
import { useCollection } from '../../../hooks/useCollection';
import { useAuthContext } from '../../../hooks/useAuthContext';
import '../../../App.css';
import ReturnButton from '../../../components/ReturnButton';
import FilteredBlock from '../../../components/main-content-elements/FilteredBlock';

function SponsorsMainContent() {
  const { user } = useAuthContext();

  const { documents: sponsors } = useCollection('Sponsors', ['uid', '==', user.uid]);
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState(null);
  console.log(data);

  const hideElement = useRef(null);

  const editClick = item => {
    setData(item);
  };

  return (
    <div
      className="main-content"
      ref={hideElement}>
      {openModal && (
        <AddSponsorWindow
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      <div className="ml-5">
        <ReturnButton />
        <Title title="Sponsorzy" />
        <button
          className="btn primary-btn"
          onClick={() => setOpenModal(true)}>
          Dodaj sponsora
        </button>
        <ItemContainer>
          {sponsors?.map((item, i) => (
            <FilteredBlock
              key={i}
              item={item}
              type={'Sponsors'}
              editClick={editClick}
            />
          ))}
        </ItemContainer>
      </div>
    </div>
  );
}

export default SponsorsMainContent;
