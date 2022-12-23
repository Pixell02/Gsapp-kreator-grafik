import React from 'react';
import Title from '../../../components/main-content-elements/Title';
import Footer from '../../../components/MainFooter';
import ItemContainer from '../../../components/main-content-elements/ItemContainer';
import AddPosterInGenerator from './addPosterInGenerator';
import "../../../components/main-content-elements/Main.css";
function MainGenerator() {

    return (
        <div className='main-content'>
            <div className="ml-5">
            <Title  title = "Wygeneruj grafikę"/>
            <AddPosterInGenerator />
            <Title title = "Ulubione" />
            <ItemContainer />
            <Title title = "Propozycje" />
            <ItemContainer />
            </div>
            <Footer />
        </div>
    );
}

export default MainGenerator;