import React from "react";

type props = {
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string | number }[];
  id: string;
};

const Select = ({ name, value, onChange, options, id }: props) => {
  return (
    <>
      <span>{name}</span>
      <select id={id} className="form-control" value={value} onChange={onChange}>
        <option value={""}>Wybierz</option>
        {options?.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
