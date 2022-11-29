import React from 'react';
import './Buttons.css';

function Buttons(props) {

    return (
        <div className='buttons-container'>
            <button className='btn btn-primary'>{props.name}</button>
        </div>
    );
}

export default Buttons;