import React from 'react';
import MainFooter from '../MainFooter';
import ItemContainer from './ItemContainer';
import Block from './Block';
import Buttons from './Buttons';
import Title from './Title';

function PlayerMainContent(props) {

    return (
      <div className="main-content">
        <div className="ml-5">
          <Title title = "Zawodnicy" />
          <Buttons name = "Dodaj zawodnika" />
          <ItemContainer element = {<Block />} />
        </div>
        <MainFooter />
      </div>
    );
}

export default PlayerMainContent;