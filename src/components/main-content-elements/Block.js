import React from 'react';
import './Block.css';

function Block(props) {
    return (
        <div className='item-window'>
            <div className='name-content'>
                <span className='name-content'>{props.name}</span>
            </div>
            <div className='image-content'>
                <img src={props.img} alt={props.img} />
            </div>
        </div>
    );
}

export default Block;