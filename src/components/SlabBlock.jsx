import React, { useRef } from 'react';
import './slabBlock.css';
import OptionButton from './OptionButton';

const SlabBlock = ({ item, type, editClick }) => {
  const hideElement = useRef(null);

  return (
    <div
      ref={hideElement}
      className="slab-container">
      <div className="name-container">
        <span>{item.place || item.presetName}</span>
      </div>
      <OptionButton
        item={item}
        hideElement={hideElement}
        editClick={editClick}
        type={type}
      />
    </div>
  );
};

export default SlabBlock;
