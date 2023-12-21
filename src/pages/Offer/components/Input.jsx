import React from "react";

export default function Input({title, name, handleDataChange, value}) {
  
  return (
    <div className="label-content">
      <div className="inner-label-containers">
        <label>{title}</label>
        <span style={{ color: "red" }}>*</span>
      </div>
      <input
        key={name}
        type="text"
        name={name}
        placeholder={title}
        onChange={handleDataChange}
        className="fullName"
        value={value}
        required
      />
    </div>
  );
}
