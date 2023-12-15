import Title from '../../../components/main-content-elements/Title';
import Catalog from './CatalogBlock';
import translate from '../locales/catalog.json';
import '../../../components/main-content-elements/Main.css';
import { useContext } from 'react';
import ReturnButton from '../../../components/ReturnButton';
import { TeamContext } from '../../../context/TeamContext';
import Select from 'react-select';
import { useLanguageContext } from '../../../context/LanguageContext';

function MainCatalog() {
  const { language } = useLanguageContext();
  const { sportOptions, setSelectedSportKeys, selectedSportKeys } = useContext(TeamContext);

  return (
    <div className="main-content">
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.title[language]} />
        {sportOptions?.length > 1 && (
          <Select
            options={sportOptions}
            defaultValue={selectedSportKeys}
            onChange={(option) => setSelectedSportKeys(option.value)}
          />
        )}

        <div className="item-container">
          <Catalog />
        </div>
      </div>
    </div>
  );
}

export default MainCatalog;
