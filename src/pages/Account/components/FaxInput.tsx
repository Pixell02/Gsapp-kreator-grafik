import React from "react";

type InputProps = {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: string | ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
};

const FaxInput = ({ title, handleChange, ...args }: InputProps) => {
  return (
    <div className="label-content">
      <div className="label-name">
        <label>{title}</label>
        <span style={{ color: "red" }}>*</span>
      </div>
      <input type="text" {...args} onChange={handleChange} required />
    </div>
  );
};

export default FaxInput;
