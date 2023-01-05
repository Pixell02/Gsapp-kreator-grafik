import React from 'react';


function BuyFormContainer({price}) {

    return (
        <div className='form-container'>
            <div className='logo-container'>
                <span className='logo'>LOGO</span>
            </div>
            <div className='price-container'>
              <h1>{50*price}zł</h1>
            </div>
            <div className='form'>
                <input type='text' className='name' placeholder='Imię' />
                <input type='text' className='surName' placeholder='Nazwisko' />
                <input type='text' className='adress' placeholder='Adres' />
                <input type='text' className='post-code' placeholder='Kod pocztowy' />
                <input type='text' className='city' placeholder='Miasto' />
                <button className='buy-btn btn btn-primary'>Kup</button>
            </div>
        </div>
    );
}

export default BuyFormContainer;