import React from 'react';
import Title from './Title';
import Buttons from './Buttons';
import Footer from '../MainFooter';
import ItemContainer from './ItemContainer';
import Block from './Block';
import "./Main.css";
import mecz from "../../img/mecz.png";
import bilet from "../../img/bilet.png";
import wynik from "../../img/wynik.png";
import ZdjwTle from "../../img/Zdjęcie w tle.png";
function MainGenerator() {

    return (
        <div className='main-content'>
            <div className="ml-5">

            <Title  title = "Katalog"/>
            <div className='item-container'>
            <Block name = "mecz" img = {mecz} />
            <Block name = "bilet" img = {bilet} />
            <Block name = "wynik" img = {wynik} />
            <Block name = "Zdjęcie w tle" img = {ZdjwTle} />
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainGenerator;