import React, { useEffect, useState } from "react";

const SponsorCheckbox = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sponsorBlock = document.getElementById("sponsors-container");
    if (sponsorBlock) {
      sponsorBlock.style.display = isVisible ? "inherit" : "none";
    }
  }, [isVisible]);

  const handleCheckboxChange = () => {
    setIsVisible((prevVisible) => !prevVisible);
  };

  return (
    <div>
      <label>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span>Sponsorzy</span>
      </label>
    </div>
  );
};

export default SponsorCheckbox;
