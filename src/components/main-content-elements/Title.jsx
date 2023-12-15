import React from 'react';
import "./Title.css"

function Title (props) {

    return (
        <div className='title-container'>
            <h4>{props.title}</h4>
        </div>
    );
}


export default Title;