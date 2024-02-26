import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemeData } from "../Modals/ThemeAddModal";

type props = {
  handleValueChange: (value: ChangeEvent<HTMLInputElement>) => void;
  setThemeData: Dispatch<SetStateAction<ThemeData>>;
};

const PlanButton = ({ handleValueChange, setThemeData }: props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setThemeData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { date, ...rest } = prev;
      return rest;
    });
  }, [isChecked]);

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        <span>Zaplanuj</span>
      </label>
      {isChecked && (
        <div>
          <input type="date" className="date" onChange={handleValueChange} />
        </div>
      )}
    </div>
  );
};

export default PlanButton;
