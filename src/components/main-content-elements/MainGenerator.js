import React from 'react';
import Title from './Title';
import Footer from '../MainFooter';
import ItemContainer from './ItemContainer';
import AddPosterInGenerator from './addPosterInGenerator';
import "./Main.css";
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