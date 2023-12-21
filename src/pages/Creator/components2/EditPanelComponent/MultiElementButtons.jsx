import React from 'react'

const MultiElementButtons = ({ coords, setIsModalOpen, setSelectedMatch }) => {
  
  const handleButtonClick = (buttonNumber) => {
    setIsModalOpen({ id: 3, open: true });
    setSelectedMatch(buttonNumber);
  };

  const generateButtons = () => {
    const buttons = [];
    for (let i = 1; i <= coords.numberOfMatches; i++) {
      buttons.push(
        <button className='btn my-2' key={i} onClick={() => handleButtonClick(i)}>
          Mecz {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className='d-flex flex-column'>
      {generateButtons()}
    </div>
  )
}

export default MultiElementButtons
