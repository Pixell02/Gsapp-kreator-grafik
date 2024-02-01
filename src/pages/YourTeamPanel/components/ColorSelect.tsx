import React from "react";
import useColorOption from "./useColorOption";

type TeamColor = {
  primary: string;
  secondary: string;
};

type TeamData = {
  firstName: string;
  secondName: string;
  img: string;
  sport: string;
  color?: TeamColor;
  uid: string;
};

type Props = {
  teamData: TeamData;
  setTeamData: React.Dispatch<React.SetStateAction<TeamData>>;
};

const ColorSelect: React.FC<Props> = ({ teamData, setTeamData }) => {
  const options = useColorOption();

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTeamData(
      (prev) =>
        ({
          ...prev,
          color: {
            ...prev.color,
            primary: value,
          },
        } as TeamData)
    );
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTeamData(
      (prevData) =>
        ({
          ...prevData,
          color: {
            ...prevData.color,
            secondary: value,
          },
        } as TeamData)
    );
  };

  return (
    <div className="d-flex mt-2 w-100">
      <div className="w-50">
        <label>kolor 1</label>
        <select
          name="primaryColor"
          className="form-control"
          value={teamData?.color?.primary || ""}
          onChange={handlePrimaryChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="w-50">
        <label>kolor 2</label>
        <select
          name="secondaryColor"
          className="form-control"
          value={teamData?.color?.secondary || ""}
          onChange={handleSecondaryChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ColorSelect;
