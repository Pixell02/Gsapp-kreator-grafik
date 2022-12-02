import React from 'react';
import Title from './Title';
import Footer from '../MainFooter';
import ItemContainer from './ItemContainer';
import Block from './Block';
import "./Main.css";
import plusIcon from '../../img/plusIcon.png';
function MainGenerator() {

    return (
        <div className='main-content'>
            <div className="ml-5">
            <Title  title = "Wygeneruj grafikę"/>
            {/* <Block  title = "wybierz grafikę" img = {plusIcon} /> */}
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